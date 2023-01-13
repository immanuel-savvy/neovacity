import React from "react";
import { Link } from "react-router-dom";
import { email_regex, to_title } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Socials from "../Components/socials";
import { client_domain } from "../Constants/constants";
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
                            <Link to="/">
                              <img
                                onClick={scroll_to_top}
                                src={`${client_domain}/neovacity_africa_logo.png`}
                                className="img-footer small mb-2"
                                alt=""
                              />
                            </Link>
                            <h4 className="extream mb-3">
                              Do you need help with
                              <br />
                              anything?
                            </h4>
                            <p>
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
                                      className="input-group-text theme-bg b-0 text-light"
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
                        <div className="col-lg-6 col-md-7 ml-auto">
                          <div className="row">
                            {
                              <div className="col-lg-8 col-md-8">
                                <div className="footer_widget">
                                  <h4 className="widget_title">Company</h4>
                                  <ul className="footer-menu">
                                    {schools ? (
                                      schools.map((school) => {
                                        return (
                                          <li
                                            onClick={() =>
                                              this.handle_school(school)
                                            }
                                          >
                                            <Link to="/course">
                                              {to_title(
                                                school.title.replace(/_/g, " ")
                                              )}
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
                            }

                            <div className="col-lg-4 col-md-4">
                              <div className="footer_widget">
                                <h4 className="widget_title">Company</h4>
                                <ul className="footer-menu">
                                  <li>
                                    <Link to="/">Home</Link>
                                  </li>
                                  <li>
                                    <Link to="/about">About</Link>
                                  </li>
                                  <li>
                                    <Link to="/blog">Blog</Link>
                                  </li>
                                  <li>
                                    <Link to="/testimonials">Testimonials</Link>
                                  </li>
                                  <li>
                                    <Link to="/contact_us">Contact</Link>
                                  </li>
                                  <li>
                                    <Link to="/login">Login</Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="footer-bottom">
                  <div className="container">
                    <div className="row align-items-center">
                      <div
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="col-lg-12 col-md-12 text-center"
                      >
                        <p className="mb-0">
                          © 2022 Neovacity Africa. All rights reserved.
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
