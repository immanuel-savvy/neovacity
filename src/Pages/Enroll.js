import React from "react";
import { email_regex, next_quarter } from "../Assets/js/utils/functions";
import Featured_course from "../Components/course";
import Breadcrumb from "../Components/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { scroll_to_top } from "./Home";
import { PaystackConsumer } from "react-paystack";
import Loadindicator from "../Components/loadindicator";
import { post_request } from "../Assets/js/utils/services";
import { Logged_user } from "../Contexts";
import { Link } from "react-router-dom";

class Enroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let course = window.sessionStorage.getItem("enroll");
    if (!course) window.history.go(-1);

    try {
      course = JSON.parse(course);
    } catch (e) {
      window.history.go(-1);
    }

    this.proceed_to_payment?.click();
    this.setState({ course });
    scroll_to_top();

    this.set_user_details();

    let admission_id = window.sessionStorage.getItem("ad_id");
    admission_id &&
      this.setState({
        admission_exam_id: admission_id,
        disable_admission_field: true,
      });
  };

  can_enroll = async () => {
    let { email, disable_admission_field, _id, course, admission_exam_id } =
      this.state;

    let payload = {
      email,
      student: _id,
      course: course._id,
    };

    let response = await post_request("student_already_enrolled", payload);
    if (!response && response.enrolled)
      return { enrolled: "You are already enrolled for this course." };

    if (!disable_admission_field) {
      let check_admission_id = await post_request("find_admission_exam", {
        admission_id: admission_exam_id,
        school: course.schools[0],
        checking: true,
      });
      if (!check_admission_id.exam || check_admission_id.used)
        return {
          invalid_admission_id: check_admission_id.used || "Invalid Exam ID",
        };
    }

    return response;
  };

  set_user_details = () => {
    let user = window.sessionStorage.getItem("loggeduser");
    if (!user) return;
    user = JSON.parse(user);
    let { firstname, lastname, email, _id } = user;
    this.setState({ firstname, lastname, email, _id });
  };

  _is_set = () => {
    let { email, firstname, lastname, phone } = this.state;

    return email_regex.test(email) && firstname && lastname && phone;
  };

  payment_successful = () => {
    let { email, firstname, lastname, phone, course } = this.state;

    let payload = {
      email,
      firstname,
      lastname,
      phone,
      course: course._id,
      student: this.user?._id,
      set: next_quarter().str,
    };

    post_request("register_course", payload).then((res) => {
      if (!this.user) {
        window.sessionStorage.setItem("loggeduser", JSON.stringify(res.user));
        this.set_loggeduser(res.user);
      }

      window.sessionStorage.removeItem("ad_id");
      window.history.go(-1);
    });
  };

  cancel = () => {};

  exchange_rate = 700;

  render() {
    let { navs } = this.props;
    let {
      email,
      firstname,
      admission_exam_id,
      lastname,
      phone,
      cant_enroll,
      course,
      disable_admission_field,
    } = this.state;

    if (!course) return <Loadindicator contained />;

    let payment_props = {
      email,
      amount: course.price * this.exchange_rate * 100,
      metadata: {
        name: firstname && lastname && `${firstname} ${lastname}`,
        phone,
      },
      publicKey: "pk_test_bb18a2e51d82edaf36aa443679756267d6fef396",
      text: "Proceed to Payment",
      onSuccess: this.payment_successful,
      onClose: this.cancel,
    };

    return (
      <Logged_user.Consumer>
        {({ loggeduser, set_loggeduser }) => {
          this.user = loggeduser;
          this.set_loggeduser = set_loggeduser;

          return (
            <div id="main-wrapper">
              <Header navs={navs} page="enroll" />
              <div className="clearfix"></div>
              <Breadcrumb page_title="Online Registration" page_text="Enroll" />

              <section>
                <div className="container">
                  <div className="row justify-content-between">
                    <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12">
                      <form>
                        <div className="row">
                          <h5>Step 1: Application Form</h5>
                          <br />
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label>Admission Exam ID</label>
                              <input
                                className="form-control"
                                type="text"
                                autoFocus
                                placeholder="XYZABC"
                                disabled={disable_admission_field}
                                onChange={({ target }) =>
                                  this.setState({
                                    admission_exam_id: target.value,
                                  })
                                }
                                value={admission_exam_id}
                              />
                            </div>
                          </div>
                          <br />
                          <span className="h4 mt-3 text-center"> -- OR --</span>

                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <Link
                              to="/admission"
                              className={`mt-5 btn full-width text-light theme-bg short_description-white`}
                            >
                              Take Admission Examination
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12">
                      <form>
                        <div className="row">
                          <h5>Step 2: Enrollment</h5>
                          <br />
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label>Firstname</label>
                              <input
                                className="form-control"
                                type="text"
                                autoFocus
                                disabled={!admission_exam_id}
                                placeholder="Firstname"
                                onChange={({ target }) =>
                                  this.setState({ firstname: target.value })
                                }
                                value={firstname}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label>Lastname*</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Lastname"
                                disabled={!admission_exam_id}
                                onChange={({ target }) =>
                                  this.setState({ lastname: target.value })
                                }
                                value={lastname}
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group smalls">
                              <label>Email*</label>
                              <input
                                type="email"
                                className="form-control"
                                disabled={!admission_exam_id}
                                onChange={({ target }) =>
                                  this.setState({
                                    email: target.value,
                                    cant_enroll: false,
                                  })
                                }
                                value={email}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group smalls">
                              <label>Phone Number*</label>
                              <input
                                type="number"
                                className="form-control"
                                disabled={!admission_exam_id}
                                onChange={({ target }) =>
                                  this.setState({ phone: target.value })
                                }
                                value={phone}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="form-group smalls">
                        {cant_enroll ? (
                          <div class="alert alert-primary" role="alert">
                            <strong>Cannot Proceed</strong>&nbsp; {cant_enroll}
                          </div>
                        ) : this._is_set() ? (
                          <PaystackConsumer {...payment_props}>
                            {({ initializePayment }) => (
                              <button
                                type="button"
                                onClick={() => {
                                  this.can_enroll()
                                    .then((res) => {
                                      res &&
                                      (res.enrolled || res.invalid_admission_id)
                                        ? this.setState({
                                            cant_enroll:
                                              res.enrolled ||
                                              res.invalid_admission_id,
                                          })
                                        : initializePayment(
                                            this.payment_successful,
                                            this.cancel
                                          );
                                    })
                                    .catch((e) => console.log(e));
                                }}
                                className={`btn full-width text-light theme-bg short_description-white`}
                              >
                                Proceed to payment
                              </button>
                            )}
                          </PaystackConsumer>
                        ) : (
                          <button
                            type="button"
                            className={`btn full-width text-light grey short_description-white`}
                          >
                            Proceed to payment
                          </button>
                        )}
                      </div>
                    </div>
                    <Featured_course
                      in_enroll
                      classname="col-xl-4 col-lg-4 col-md-5 col-sm-12 mb-3"
                      course={course}
                    />
                  </div>
                </div>
              </section>
              <Contact_us_today />
              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Enroll;
