import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Breadcrumb from "../Components/breadcrumb";
import Contact_sidebar from "../Components/contact_sidebar";
import Loadindicator from "../Components/loadindicator";
import Alumni_reviews from "../Sections/alumni_reviews";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { scroll_to_top } from "./Adminstrator";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    scroll_to_top();
  };

  send_message = async () => {
    let { text, name, phone, email, organisation, sending, interest } =
      this.state;
    if (!text || !name || !phone || !email || !organisation || sending) return;
    this.setState({ sending: true });

    let message = { text, name, phone, email, organisation, interest };

    await post_request("new_contact_message", message);

    this.reset_state();
  };

  reset_state = () =>
    this.setState({
      text: "",
      name: "",
      email: "",
      phone: "",
      organisation: "",
      sending: false,
    });

  render() {
    let { navs } = this.props;
    let { text, email, sending, name, phone, organisation } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="contact" />
        <div className="clearfix"></div>
        <Breadcrumb page_text="Contact Us" page_title="Get In Touch" />
        <section>
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12">
                <div className="form-group">
                  <h4>We'd love to hear from you</h4>
                  <span>
                    Send a message and we'll respond as soon as possible{" "}
                  </span>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={({ target }) =>
                          this.setState({ name: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={({ target }) =>
                          this.setState({ email: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Organisation</label>
                      <input
                        value={organisation}
                        onChange={({ target }) =>
                          this.setState({ organisation: target.value })
                        }
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        value={phone}
                        placeholder="e.g +234 801 234 5566"
                        onChange={({ target }) =>
                          this.setState({ phone: target.value })
                        }
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Message *</label>
                      <textarea
                        value={text}
                        style={{ minHeight: 100 }}
                        onChange={({ target }) =>
                          this.setState({ text: target.value })
                        }
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      {sending ? (
                        <Loadindicator />
                      ) : (
                        <button
                          className="btn btn-bg text-white btn-md"
                          type="button"
                          onClick={this.send_message}
                        >
                          Send Message
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Contact_sidebar />
            </div>
          </div>
        </section>
        <Alumni_reviews />
        <Footer />
      </div>
    );
  }
}

export default Contact;
