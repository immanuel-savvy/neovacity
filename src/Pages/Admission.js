import React from "react";
import { PaystackConsumer } from "react-paystack";
import {
  email_regex,
  generate_random_string,
} from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Breadcrumb from "../Components/breadcrumb";
import Featured_course from "../Components/course";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Neovacity";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Admission_exam from "../Sections/start_admission_exam";
import { scroll_to_top } from "./Home";

class Admission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let course = window.sessionStorage.getItem("enroll");
    if (!course) window.history.go(-1);

    try {
      course = JSON.parse(course);
    } catch (e) {
      window.history.go(-1);
    }

    this.setState({ course });
    scroll_to_top();

    this.set_user_details();
  };

  _is_set = () => {
    let { email, firstname, lastname } = this.state;

    return email_regex.test(email) && firstname && lastname;
  };

  set_user_details = () => {
    let user = window.sessionStorage.getItem("loggeduser");
    if (!user) return;
    user = JSON.parse(user);
    let { firstname, lastname, email, _id } = user;
    this.setState({ firstname, lastname, email, _id });
  };

  payment_successful = () => {
    this.setState({ exam_payment_successful: true });
  };

  can_enroll = async () => {
    let { email, _id, course } = this.state;

    let payload = {
      email,
      student: _id,
      course: course._id,
    };

    let response = await post_request("student_already_enrolled", payload);

    return response;
  };

  proceed_with_enrollment = async (details) => {
    let { course, email, _id } = this.state;
    let admission_id = generate_random_string(6);

    await post_request("admission_exam", {
      ...details,
      student: _id || email,
      admission_id,
      course: course._id,
    });

    emitter.emit("admission_id", { admission_id, course: course._id });
    window.location.go(-1);
  };

  exchange_rate = 700;

  admission_fee = 20;

  render() {
    let {
      course,
      firstname,
      cant_enroll,
      lastname,
      email,
      exam_payment_successful,
    } = this.state;

    if (!course) return <Loadindicator />;

    let payment_props = {
      email,
      amount: this.admission_fee * this.exchange_rate * 100,
      metadata: {
        name: firstname && lastname && `${firstname} ${lastname}`,
      },
      publicKey: "pk_test_bb18a2e51d82edaf36aa443679756267d6fef396",
      text: "Proceed to Payment",
      onSuccess: this.payment_successful,
      onClose: this.cancel,
    };

    return (
      <div id="main-wrapper">
        <Header page="admission" />
        <Breadcrumb page_title="Admission Test" page_text="Admission" />
        <section class="min">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Admission <span class="theme-cl">Exam</span>
                  </h2>
                  <p>Find what suit you best</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row justify-content-between">
              <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12">
                {!exam_payment_successful ? (
                  <Admission_exam
                    course={course}
                    proceed_with_enrollment={this.proceed_with_enrollment}
                    user_details={{ firstname, lastname, email }}
                  />
                ) : (
                  <div>
                    <form>
                      <div className="row">
                        <h5>Provide your details</h5>
                        <br />
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Firstname</label>
                            <input
                              className="form-control"
                              type="text"
                              autoFocus
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
                      </div>
                    </form>

                    <div className="form-group smalls">
                      {cant_enroll ? (
                        <div class="alert alert-primary" role="alert">
                          <strong>Cannot Proceed</strong>&nbsp; You are already
                          enrolled to this course.
                        </div>
                      ) : this._is_set() ? (
                        <PaystackConsumer {...payment_props}>
                          {({ initializePayment }) => (
                            <button
                              type="button"
                              onClick={() => {
                                this.can_enroll()
                                  .then((res) =>
                                    res && res.enrolled
                                      ? this.setState({ cant_enroll: true })
                                      : initializePayment(
                                          this.payment_successful,
                                          this.cancel
                                        )
                                  )
                                  .catch((e) => console.log(e));
                              }}
                              className={`btn full-width text-light theme-bg short_description-white`}
                            >
                              Pay and Proceed to exam
                            </button>
                          )}
                        </PaystackConsumer>
                      ) : (
                        <button
                          type="button"
                          className={`btn full-width text-light grey short_description-white`}
                        >
                          Pay and Proceed to exam
                        </button>
                      )}
                    </div>
                  </div>
                )}
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
  }
}

export default Admission;
