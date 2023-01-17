import React from "react";
import Daily_outline from "./daily_outline";

class Weekly_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { week, index } = this.props;

    if (!week) return;

    return (
      <div class="liop_wraps">
        <div class="liop_wraps_01">
          <h6>{`Week 0${index + 1}`}</h6>
          <span>{`0${week.lectures.length} Lectures`}</span>
        </div>
        <div class="liop_wraps_list">
          {week && week.lectures
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
