import React from "react";
import { Link } from "react-router-dom";
import { scroll_to_top } from "../Pages/Home";

class Explore_more_btn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, action, to } = this.props;

    return (
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-8 mt-2">
          <div class="text-center">
            <Link
              to={to}
              onClick={(e) => {
                action && action(e);
                scroll_to_top();
              }}
              class="btn btn-md theme-bg-light theme-cl"
            >
              {`Explore More ${title}`}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Explore_more_btn;
