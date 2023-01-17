import React from "react";
import { email_regex, phone_regex } from "../Assets/js/utils/functions";
import Featured_course from "../Components/course";
import Breadcrumb from "../Components/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { scroll_to_top } from "./Home";

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

  _is_set = () => {
    let { email, firstname, lastname, phone } = this.state;

    return email_regex.test(email) && firstname && lastname && phone;
  };

  proceed = async () => {
    let { email, firstname, lastname, phone } = this.state;
    if (!phone_regex.test(phone)) return;
  };

  render() {
    let { navs } = this.props;
    let { email, firstname, lastname, phone, course } = this.state;

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
                  <div class="row">
                    <h5>Enrollment Form</h5>
                    <br />
                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          class="form-control"
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

                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <div class="form-group">
                        <label>Lastname*</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Lastname"
                          onChange={({ target }) =>
                            this.setState({ lastname: target.value })
                          }
                          value={lastname}
                        />
                      </div>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12">
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
                    <div class="col-lg-12 col-md-12 col-sm-12">
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

                  <div className="form-group smalls">
                    <button
                      onClick={this._is_set() && this.proceed}
                      type="button"
                      className={`btn full-width text-light ${
                        this._is_set() ? "theme-bg" : "grey"
                      } short_description-white`}
                    >
                      Proceed to payment
                    </button>
                  </div>
                </form>
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

export default Enroll;
