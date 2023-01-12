import React from "react";

class Daily_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { outline, index } = this.props;
    let { topic, resource } = outline;

    return (
      <div class="liop_wraps_single">
        <div class="lki_813">
          <h6>Day</h6>
          <span>{`${index}`.padStart(2, "0")}</span>
        </div>
        <div class="bhu_486">
          <h5>{topic}</h5>
          {resource ? (
            <a>
              <span>Download Resource</span>
            </a>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Daily_outline;
