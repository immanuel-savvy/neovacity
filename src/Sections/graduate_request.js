import React from "react";
import { commalise_figures } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Hire_graduate from "../Components/hire_graduate";
import Modal from "../Components/modal";

class Graduate_request extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_request_details = () => this.request_details?.toggle();

  resolve = async (e) => {
    e.preventDefault();

    let { request } = this.props;
    this.setState({ resolving: true });

    await post_request(`hire_graduate_resolved/${request._id}`);

    this.setState({ resolved: true, resolving: false });
  };

  render() {
    let { request } = this.props;

    request.resolved = request.resolved || this.state.resolved;

    let { desired_role, firstname, lastname, salary_range, email } = request;

    if (!request.country) request.country = "nigeria";
    if (!request.staff_strength) request.staff_strength = "50-100";

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div class="cates_crs_wrip" onClick={this.toggle_request_details}>
          <div class="crs_trios">
            <div onClick={this.toggle_request_details} class="crs_cate_link">
              <a href="#">More Details</a>
            </div>
          </div>
          <div class="crs_capt_cat">
            <h4>{desired_role}</h4>

            <p>
              {" "}
              <b>Annual Salary:</b> {commalise_figures(Number(salary_range))}
            </p>
          </div>
          <hr />

          <span>User Detail</span>
          <h5>{`${firstname} ${lastname}`}</h5>
          <p style={{ fontStyle: "italic" }}>
            <a target="_blank" href={`mailto://${email}`}>
              {email}
            </a>
          </p>
        </div>

        <Modal
          ref={(request_details) => (this.request_details = request_details)}
        >
          <Hire_graduate
            request={request}
            loading={this.state.resolving}
            resolved={request.resolved}
            resolve={this.resolve}
            toggle={this.toggle_request_details}
          />
        </Modal>
      </div>
    );
  }
}

export default Graduate_request;
