import React from "react";
import { email_regex, next_quarter } from "../Assets/js/utils/functions";
import Featured_course from "../Components/course";
import Breadcrumb from "../Components/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { scroll_to_top } from "./Home";
import { PaystackButton } from "react-paystack";
import Loadindicator from "../Components/loadindicator";
import { post_request } from "../Assets/js/utils/services";
import { Logged_user } from "../Contexts";

class Enroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let course = window.sessionStorage.getItem("enroll");
    if (!course) window.history.back();

    try {
      course = JSON.parse(course);
    } catch (e) {
      window.history.back();
    }

    this.setState({ course });
    scroll_to_top();
  };

  set_user_details = (user) => {
    let { firstname, lastname, email } = user;
    this.setState({ firstname, lastname, email });
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
      !this.user && this.set_loggeduser(res.user);

      window.history.go(-1);
    });
  };

  cancel = () => {};

  exchange_rate = 700;

  render() {
    let { navs } = this.props;
    let { email, firstname, lastname, phone, course } = this.state;

    if (!course) return <Loadindicator contained />;

    let payment_props = {
      email,
      amount: course.price * this.exchange_rate * 100,
      metadata: {
        name: firstname && lastname && `${firstname} ${lastname}`,
        phone: "2348022693560",
      },
      publicKey: "pk_test_bb18a2e51d82edaf36aa443679756267d6fef396",
      text: "Proceed to Payment",
      onSuccess: this.payment_successful,
      onClose: this.cancel,
    };

    console.log(payment_props);

    return (
      <Logged_user.Consumer>
        {({ loggeduser, set_loggeduser }) => {
          this.user = loggeduser;
          if (this.user && !firstname) this.set_user_details(loggeduser);

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
                          <h5>Enrollment Form</h5>
                          <br />
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label>Name</label>
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
                                  this.setState({ email: target.value })
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
                        {this._is_set() ? (
                          <PaystackButton
                            className="paystack-button"
                            {...payment_props}
                          />
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
