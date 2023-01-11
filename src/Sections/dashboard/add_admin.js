import React from "react";
import { email_regex } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Add_admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  register_admin = async (e) => {
    e.preventDefault();

    let { firstname, lastname, email, password, confirm_password } = this.state;
    if (password !== confirm_password) return;
    if (!firstname || !lastname) return;
    if (!email_regex.test(email)) return;

    let new_admin = {
      firstname,
      lastname,
      email,
      password,
    };

    (await post_request("create_admin", new_admin)) && this.reset_state();
  };

  reset_state = () =>
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
    });

  render() {
    let { firstname, lastname, confirm_password, email, password } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage admins" />

        <div className="clearfix"></div>
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                <form>
                  <div className="crs_log_wrap">
                    <div className="crs_log__thumb">
                      <img
                        src="../Assets/img/loginbg4.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="crs_log__caption">
                      <div className="rcs_log_123">
                        <div className="rcs_ico">
                          <i className="fas fa-user"></i>
                        </div>
                      </div>

                      <div className="rcs_log_124">
                        <div className="Lpo09">
                          <h4>Register Admin</h4>
                        </div>
                        <div className="form-group row mb-0">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label>First Name</label>
                              <input
                                type="text"
                                onChange={({ target }) =>
                                  this.setState({ firstname: target.value })
                                }
                                value={firstname}
                                className="form-control"
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label>Last Name</label>
                              <input
                                type="text"
                                onChange={({ target }) =>
                                  this.setState({ lastname: target.value })
                                }
                                value={lastname}
                                className="form-control"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            onChange={({ target }) =>
                              this.setState({ email: target.value })
                            }
                            value={email}
                            className="form-control"
                            placeholder="you@mail.com"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            onChange={({ target }) =>
                              this.setState({ password: target.value })
                            }
                            value={password}
                            className="form-control"
                            placeholder="*******"
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            onChange={({ target }) =>
                              this.setState({ confirm_password: target.value })
                            }
                            value={confirm_password}
                            className="form-control"
                            placeholder="*******"
                          />
                        </div>
                        <div className="form-group">
                          <button
                            onClick={this.register_admin}
                            type="button"
                            className="btn full-width btn-md theme-bg text-white"
                          >
                            Register Admin
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Add_admin;
