import React from "react";
import { domain } from "../Constants/constants";
import { emitter } from "../Neovacity";

class Daily_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { enrolled, outline, date, course } = this.props;

    enrolled &&
      date &&
      emitter.emit("daily_outline", { date, course, outline });
  };

  render() {
    let { outline, date, dow } = this.props;
    if (!outline) return;

    let { topic, resource } = outline;

    return (
      <div class="liop_wraps_single">
        <div class="lki_813">
          <h6>{(dow && dow.slice(0, 3)) || "Day"}</h6>
          <span>
            {date ? `${date.getDate() || "--"}`.padStart(2, "0") : ""}
          </span>
        </div>
        <div class="bhu_486">
          <h5>{topic}</h5>
          {resource ? (
            <a
              style={{ textDecoration: "none" }}
              href={`${domain}/Files/${resource}`}
              download
            >
              <span>Download Resource</span>
            </a>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Daily_outline;
