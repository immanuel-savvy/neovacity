import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { domain, default_admin } from "../../Constants/constants";
import { Logged_admin } from "../../Contexts";

class Admin_card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  log_admin_out = () => {
    window.sessionStorage.removeItem("logged_admin");

    this.logout_admin ? this.logout_admin() : window.location.reload();
  };

  render() {
    let { admin } = this.props;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged, logout_admin }) => {
          if (!admin_logged) admin_logged = admin;

          this.logout_admin = logout_admin;
          let { firstname, lastname, image: _image, _id } = admin_logged;
          return (
            <div className="d-user-avater">
              <img
                src={`${domain}/Images/${_image || "logo_single.png"}`}
                className="img-fluid avater"
                alt=""
              />
              <h4>{to_title(`${firstname} ${lastname}`.trim())}</h4>
              <span>{_id === default_admin ? "Default Admin" : "Admin"}</span>
              <div className="elso_syu89">
                <ul>
                  <li>
                    <a href="#">
                      <i className="ti-pencil"></i>
                    </a>
                  </li>
                  <li onClick={this.log_admin_out}>
                    <a href="#">
                      <i className="ti-close"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Admin_card;
