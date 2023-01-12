import React from "react";
import { get_request } from "../../Assets/js/utils/services";

class Update_curriculum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { course } = this.props;

    let curriculum = await get_request(`curriculum/${course._id}`);
    this.setState({ curriculum });
  };

  render() {
    let { curriculum } = this.state;
    return;
  }
}

export default Update_curriculum;
