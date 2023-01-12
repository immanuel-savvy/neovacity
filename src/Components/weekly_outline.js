import React from "react";
import Daily_outline from "./daily_outline";

class Weekly_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { week } = this.props;

    return (
      <div class="liop_wraps">
        <div class="liop_wraps_01">
          <h6>Week 01</h6>
          <span>04 Lectures</span>
        </div>
        <div class="liop_wraps_list">
          {week && week.lecture
            ? week.lectures.map((lecture, index) => (
                <Daily_outline outline={lecture} key={index} index={index} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Weekly_outline;
