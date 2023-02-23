import React from "react";
import { Link } from "react-router-dom";

class How_it_work extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { how_it_work, active, index } = this.props;
    let { title, explanation, icon, link } = how_it_work;

    return (
      <div
        class={`animate_interval glow delay-${
          index + 1
        } col-lg-4 col-md-4 col-sm-6`}
      >
        <Link to={link} style={{ textDecoration: "none", color: "#000" }}>
          <div class={"wrk_grid" + (active ? " active" : "")}>
            <div class="wrk_grid_ico">
              <i class={`fa ${icon}`}></i>
            </div>
            <div class="wrk_caption">
              <h4>{title}</h4>
              <p>{explanation}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default How_it_work;
