import React from "react";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Create_newsletters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_subject = ({ target }) => this.setState({ subject: target.value });

  render() {
    let { subject, sections } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="create newsletter" />
        <div class="row">
          <div className="form-group smalls">
            <label>Subject*</label>
            <input
              type="text"
              className="form-control"
              onChange={this.set_subject}
              value={subject}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Create_newsletters;
