import React from "react";
import { Link } from "react-router-dom";
import { email_regex } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { Footer_context } from "../Contexts";
import { emitter } from "../Neovacity";
import { scroll_to_top } from "../Pages/Home";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { total_length: 1 };
  }

  handle_school = (school) => {
    window.sessionStorage.setItem("school", JSON.stringify(school));
    emitter.emit("push_school", school);
    scroll_to_top();
  };

  set_email_subscription = ({ target }) =>
    this.setState({ email: target.value });

  subscribe_newsletter = async () => {
    let { email, subscribing } = this.state;
    if (!email || (email && !email_regex.test(email)) || subscribing) return;

    this.setState({ subscribing: true });

    await post_request("subscribe_newsletter", { email });
    this.setState({ subscribing: false, subscribed: true });
  };

  render() {
    let { lock } = this.props;
    let { subscribing, subscribed, email } = this.state;

    return (
      <Footer_context.Consumer>
        {({ schools }) => {
          return (
            <span>
              {lock ? <div style={{ height: 300 }}></div> : null}
              <footer className="dark-footer skin-dark-footer style-2">
                {lock ? null : (
                  <div className="footer-middle">
                    {/* <Socials /> */}
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-5 col-md-5">
                          <div className="footer_widget">
                            <Link to={`/`}>
                              <img
                                onClick={scroll_to_top}
                                src={require(`../Assets/img/neovacity_white_logo.png`)}
                                className="img-footer small mb-2"
                                alt=""
                              />
                            </Link>
                            <h4 className="extream mb-3 text-accent">
                              Do you need help with
                              <br />
                              anything?
                            </h4>
                            <p style={{ color: "#ccc" }}>
                              Receive updates, hot deals, tutorials, discounts
                              sent straight in your inbox every week
                            </p>
                            <div className="foot-news-last">
                              <div className="input-group">
                                <input
                                  type="text"
                                  value={email}
                                  disabled={!!subscribed}
                                  className="form-control"
                                  placeholder="Email Address"
                                  onChange={this.set_email_subscription}
                                />
                                <div className="input-group-append">
                                  {subscribing ? (
                                    <Loadindicator />
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={this.subscribe_newsletter}
                                      className="input-group-text btn-bg b-0 text-light"
                                    >
                                      Subscribe
                                    </button>
                                  )}
                                </div>
                              </div>
                              {subscribed ? (
                                <p>Email subscribed to newsletter!</p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                          <div className="footer_widget">
                            <h4 className="widget_title text-accent">
                              Schools
                            </h4>
                            <ul className="footer-menu">
                              {schools ? (
                                schools.map((school) => {
                                  return school.view_all ? null : (
                                    <li
                                      onClick={() => this.handle_school(school)}
                                    >
                                      <Link
                                        to={`/school/${school.title.replace(
                                          / /g,
                                          "_"
                                        )}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        {school.title.replace(/_/g, " ")}
                                      </Link>
                                    </li>
                                  );
                                })
                              ) : (
                                <Loadindicator />
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-2 col-md-3">
                          <div className="footer_widget">
                            <h4 className="widget_title text-accent">
                              company
                            </h4>
                            <ul className="footer-menu">
                              <li>
                                <Link
                                  onClick={scroll_to_top}
                                  to={`/corporate_training`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Corporate Training
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={scroll_to_top}
                                  to={`/recruitment`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Recruitment / Hire
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={scroll_to_top}
                                  to={`/partnership`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Partnership
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-2 col-md-3">
                          <div
                            style={{ textDecoration: "none" }}
                            className="footer_widget"
                          >
                            <h4 className="widget_title text-accent">menu</h4>
                            <ul className="footer-menu">
                              <li onClick={scroll_to_top}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/${""}`}
                                >
                                  Home
                                </Link>
                              </li>
                              <li onClick={scroll_to_top}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/${""}about`}
                                >
                                  About
                                </Link>
                              </li>
                              <li onClick={scroll_to_top}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/${""}blog`}
                                >
                                  Blog
                                </Link>
                              </li>
                              <li onClick={scroll_to_top}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/${""}testimonials`}
                                >
                                  Testimonials
                                </Link>
                              </li>
                              <li onClick={scroll_to_top}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/${""}contact_us`}
                                >
                                  Contact
                                </Link>
                              </li>
                              <li onClick={scroll_to_top}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/${""}login`}
                                >
                                  Login
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="footer-bottom"
                  style={{ backgroundColor: "#19338b", color: "#fff" }}
                >
                  <div className="container">
                    <div className="row align-items-center">
                      <div
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="col-lg-12 col-md-12 text-center"
                      >
                        <p className="mb-0">
                          {`© ${
                            "2022" || new Date().getFullYear()
                          } Neovacity Africa. All rights reserved.`}
                        </p>
                        <p className="mb-0">
                          Site managed by{" "}
                          <a
                            href="https://digitaladplanet.com"
                            target="_blank"
                            style={{ color: "#fff" }}
                          >
                            Digital Ad Planet
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  id="back2Top"
                  className="top-scroll"
                  title="Back to top"
                  href="#"
                >
                  <i className="ti-arrow-up"></i>
                </a>
              </footer>
            </span>
          );
        }}
      </Footer_context.Consumer>
    );
  }
}

export default Footer;
