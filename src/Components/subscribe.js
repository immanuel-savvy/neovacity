import React from "react";
import { Link } from "react-router-dom";
import { email_regex } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import { domain } from "../Constants/constants";
import { scroll_to_top } from "../Pages/Home";
import Loadindicator from "./loadindicator";

class Subscribe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_email_subscription = ({ target }) =>
    this.setState({ email: target.value });

  subscribe_newsletter = async () => {
    let { email, subscribing } = this.state;
    if (!email || (email && !email_regex.test(email)) || subscribing) return;

    this.setState({ subscribing: true });

    await post_request("subscribe_newsletter", { email });
    this.setState({ subscribing: false, subscribed: true });

    this.props.toggle();
  };

  render() {
    let { email, subscribed, subscribing } = this.state;

    return (
      <div className="">
        <Link to="/">
          <img
            onClick={scroll_to_top}
            src={`${domain}/Images/giit_africa_logo_white.png`}
            className="img-footer small mb-2"
            alt=""
          />
        </Link>
        <h4 className="extream mb-3 text-light">
          Do you need help with
          <br />
          anything?
        </h4>
        <p className="text-light">
          Receive updates, hot deals, tutorials, discounts sent straight in your
          inbox every month
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
            <div className="alert alert-success mt-2" role="alert">
              Email subscribed to newsletter!
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Subscribe;
