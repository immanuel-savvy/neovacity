import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import {
  domain,
  get_request,
  post_request,
} from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { default_admin } from "../../Constants/constants";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_admins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let admins = await get_request("get_admins");
    this.setState({ admins });
  };

  remove_admin = async (admin_id) => {
    let response = await post_request(`remove_admin/${admin_id}`);
    if (!response) return;

    let { admins } = this.state;
    admins = admins.filter((admin) => admin._id !== admin_id);
    this.setState({ admins });
  };

  admin = (admin) => {
    let { firstname, lastname, image, _id, email } = admin;
    return (
      <tr key={_id}>
        <td>
          <span style={{ cursor: "default" }} className="btn btn-action">
            <img
              src={`${domain}/Images/${image || "user_image_placeholder.png"}`}
              className="img-fluid avater"
            />
          </span>
        </td>
        <td>
          <h6>{to_title(`${firstname} ${lastname}`)}</h6>
        </td>
        <td>{email}</td>
        <td>
          <a
            className="btn btn-action"
            href="#"
            onClick={
              _id === default_admin
                ? null
                : () =>
                    window.confirm("Remove Admin? ") && this.remove_admin(_id)
            }
          >
            <i
              className={`fas fa-${
                _id === default_admin ? "user-shield" : "trash"
              }`}
            ></i>
          </a>
        </td>
      </tr>
    );
  };

  render() {
    let { admins, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage admins" />

        <table className="table dash_list">
          {admins ? (
            admins.map((admin) => this.admin(admin))
          ) : (
            <Loadindicator contained />
          )}
        </table>
      </div>
    );
  }
}

export default Manage_admins;
