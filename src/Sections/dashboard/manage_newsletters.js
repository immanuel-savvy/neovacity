import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_newsletters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let newsletters = await post_request("newletters");

    this.setState({ newsletters });
  };

  newsletter = (newsletter) => {};

  render() {
    let { newsletters } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="newsletters" />
        <div class="row">
          {newsletters ? (
            newsletters.length ? (
              newsletters.map((letter) => this.newsletter(letter))
            ) : (
              <Listempty text="No newsletters yet." />
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_newsletters;
