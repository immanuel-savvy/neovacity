import React from "react";
import { Link } from "react-router-dom";

class Contact_us_today extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="btn-bg call_action_wrap-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="call_action_wrap">
                <div className="call_action_wrap-head">
                  <h3>Do You Have Questions ?</h3>
                  <span>We'll help you to grow your career and knowledge.</span>
                </div>
                <Link to="/contact_us" className="btn btn-call_action_wrap">
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact_us_today;
