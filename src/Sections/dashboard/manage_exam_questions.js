import React from "react";
import { get_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import School_exam from "./school_exam";

class Manage_exam_questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let schools = await get_request("schools/all");
    this.setState({ schools });
  };

  render() {
    let { schools } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage exam questions" />

        <div className="row">
          {schools ? (
            schools.length ? (
              schools.map((school) => (
                <School_exam school={school} key={school._id} />
              ))
            ) : (
              <Listempty text="No schools yet" />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_exam_questions;
