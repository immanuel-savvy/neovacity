import React from "react";
import Daily_outline from "./daily_outline";

class Weekly_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="liop_wraps">
        <div class="liop_wraps_01">
          <h6>Week 01</h6>
          <span>04 Lectures</span>
        </div>
        <div class="liop_wraps_list">
          <Daily_outline />
          <Daily_outline />
          <Daily_outline />
          <Daily_outline />
        </div>
      </div>
    );
  }
}

export default Weekly_outline;
