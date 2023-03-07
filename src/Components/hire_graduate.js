import React from "react";
import {
  commalise_figures,
  email_regex,
  to_title,
} from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Hire_graduate_request_details from "./hire_graduate_request_details";
import Loadindicator from "./loadindicator";

class Hire_graduate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props.request };
  }

  componentDidMount = async () => {
    let { request } = this.props;
    if (!request) {
      let countries = new Array(
        {
          _id: "ng",
          name: "nigeria",
        },
        {
          _id: "us",
          name: "USA",
        },
        {
          _id: "cn",
          name: "Canada",
        },
        {
          _id: "sa",
          name: "South Africa",
        }
      );
      this.setState({ countries });
    }
  };

  is_set = () => {
    let {
      firstname,
      lastname,
      email,
      company_name,
      industry,
      salary_range,
      phone_number,
      country,
      staff_strength,
      desired_role,
    } = this.state;

    return (
      firstname &&
      lastname &&
      email_regex.test(email) &&
      company_name &&
      industry &&
      Number(salary_range) > 0 &&
      phone_number &&
      country &&
      staff_strength &&
      desired_role
    );
  };

  set_country = ({ target }) =>
    this.setState({
      country: this.state.countries.find(
        (country) => country._id === Number(target.value)
      ),
    });

  submit = async (e) => {
    e.preventDefault();

    let {
      firstname,
      lastname,
      email,
      company_name,
      industry,
      salary_range,
      phone_number,
      country,
      staff_strength,
      desired_role,
      resolved,
    } = this.state;

    this.setState({ loading: true });
    let details = {
      firstname,
      lastname,
      email,
      company_name,
      industry,
      salary_range,
      phone_number,
      country,
      staff_strength,
      desired_role,
    };

    let result = await post_request("request_to_hire_graduate", details);

    this.setState({
      request_submitted: result && result._id,
      message:
        result && result._id
          ? null
          : (result && result.message) || "Cannot place request at the moment",
    });
  };

  render() {
    let { toggle, resolve, resolved } = this.props;
    let {
      message,
      email,
      loading,
      company_name,
      industry,
      firstname,
      lastname,
      salary_range,
      phone_number,
      countries,
      desired_role,
      request_submitted,
      staff_strength,
      country,
    } = this.state;

    loading = loading || this.props.loading;

    return (
      <div className="no_scroll">
        <div className="crs_log__thumb ">
          <img
            src={require(`../Assets/img/breadcrumb_bg.png`)}
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="crs_log__caption">
          <div className="rcs_log_123">
            <div className="rcs_ico">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>
        <div
          className="modal-content overli no_scroll"
          id="loginmodal"
          style={{ margin: 20, overflow: "hidden", width: "92%" }}
        >
          <div className="modal-header">
            <h5 className="modal-title">
              {resolve ? "Request to hire a Graduate" : "Hire Our Graduates"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i className="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          {request_submitted ? (
            <Hire_graduate_request_details details={this.state} />
          ) : (
            <div className="modal-body">
              <div className="login-form">
                <form>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Firstname*</label>
                        <input
                          className="form-control"
                          type="text"
                          disabled={!!resolve}
                          placeholder="Your firstname"
                          value={firstname}
                          onChange={({ target }) =>
                            this.setState({ firstname: target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Lastname*</label>
                        <input
                          className="form-control"
                          type="text"
                          disabled={!!resolve}
                          placeholder="Your lastname"
                          value={lastname}
                          onChange={({ target }) =>
                            this.setState({ lastname: target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <span
                      style={
                        resolve ? { cursor: "pointer", paddingLeft: 25 } : null
                      }
                      onClick={
                        resolve ? () => window.open(`mailto://${email}`) : null
                      }
                    >
                      <i className="fas fa-link"></i>
                    </span>
                    <div className="input-with-icon">
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled={!!resolve}
                        onChange={({ target }) =>
                          this.setState({
                            email: target.value,
                            message: "",
                          })
                        }
                        placeholder="Email"
                      />
                      {/* <i className="ti-user"></i> */}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Company Name</label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        disabled={!!resolve}
                        className="form-control"
                        value={company_name}
                        onChange={({ target }) =>
                          this.setState({
                            company_name: target.value,
                            message: "",
                          })
                        }
                        placeholder="Company Name"
                      />
                      {/* <i className="ti-user"></i> */}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Industry</label>
                    <div className="input-with-icon">
                      <input
                        disabled={!!resolve}
                        type="text"
                        className="form-control"
                        value={industry}
                        onChange={({ target }) =>
                          this.setState({
                            industry: target.value,
                            message: "",
                          })
                        }
                        placeholder="Industry"
                      />
                      {/* <i className="ti-user"></i> */}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Annual Salary Range</label>
                    <div className="input-with-icon">
                      <input
                        className="form-control"
                        disabled={!!resolve}
                        value={
                          salary_range
                            ? commalise_figures(Number(salary_range))
                            : ""
                        }
                        onChange={({ target }) =>
                          this.setState({
                            salary_range: target.value.replace(/,/g, ""),
                            message: "",
                          })
                        }
                        placeholder="Annual Salary Range"
                      />
                      {/* <i className="ti-user"></i> */}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-with-icon">
                      <input
                        disabled={!!resolve}
                        type="number"
                        className="form-control"
                        value={phone_number}
                        onChange={({ target }) =>
                          this.setState({
                            phone_number: target.value,
                            message: "",
                          })
                        }
                        placeholder="Phone Number"
                      />
                      {/* <i className="ti-user"></i> */}
                    </div>
                  </div>

                  <div
                    className="col-xl-12 col-lg-12 col-md-12 col-sm-12 form-group"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                  >
                    <label>Country of Residence</label>
                    {resolve ? (
                      <>
                        :<b>{`  ${to_title(country)}`}</b>
                      </>
                    ) : countries ? (
                      countries.length ? (
                        <div className="simple-input">
                          <select
                            id="country"
                            onChange={this.set_country}
                            className="form-control"
                          >
                            <option value="">-- Select your country --</option>
                            {countries.map((country) => (
                              <option key={country._id} value={country._id}>
                                {to_title(country.name.replace(/_/g, " "))}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <Listempty text="Cannot get countries." />
                      )
                    ) : (
                      <Loadindicator smalls />
                    )}
                  </div>

                  <div
                    className="col-xl-12 col-lg-12 col-md-12 col-sm-12 form-group"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                  >
                    <label>Staff Strenght</label>
                    <div className="simple-input">
                      <select
                        id="staff_strength"
                        value={staff_strength}
                        onChange={this.set_staff_strength}
                        disabled={!!resolve}
                        className="form-control"
                      >
                        <option value="">-- Staff Strenght --</option>
                        {new Array(
                          "Less then 10",
                          "10-50",
                          "50-100",
                          "100-500",
                          "500-1000",
                          "1000+"
                        ).map((strength) => (
                          <option key={strength} value={strength}>
                            {strength}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Desired Role to Fill</label>
                    <div className="input-with-icon">
                      <input
                        disabled={!!resolve}
                        className="form-control"
                        value={desired_role}
                        onChange={({ target }) =>
                          this.setState({
                            desired_role: target.value,
                            message: "",
                          })
                        }
                        placeholder="Desired Role"
                      />
                    </div>
                  </div>

                  {message ? <p className="text-danger">{message}</p> : null}

                  <div className="form-group">
                    {loading ? (
                      <Loadindicator />
                    ) : (
                      <button
                        onClick={resolve || this.submit}
                        type="submit"
                        className="btn btn-md full-width theme-bg text-white"
                      >
                        {resolved
                          ? "Resolved!"
                          : resolve
                          ? "Mark as resolved"
                          : "Sumbit"}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Hire_graduate;
