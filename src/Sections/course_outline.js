import React from "react";
import Weekly_outline from "../Components/weekly_outline";

class Course_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="col-lg-8 col-md-12 order-lg-first">
        <Weekly_outline />
        <Weekly_outline />
        <Weekly_outline />
        <Weekly_outline />
      </div>
    );
  }
}

export default Course_outline;
