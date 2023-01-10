import React from "react";
import { client_domain } from "../Constants/constants";

class Loadindicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { height, width, contained } = this.props;

    return (
      <div
        className={
          contained
            ? "d-flex align-items-center justify-content-center my-5"
            : ""
        }
      >
        <img
          src={`${client_domain}/Assets/css/plugins/ajax-loader.gif`}
          style={{ height: height || 64, width: width || 64 }}
        />
      </div>
    );
  }
}

export default Loadindicator;
