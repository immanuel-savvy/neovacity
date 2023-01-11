import React from "react";
import Loadindicator from "../../Components/loadindicator";

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let notifications = new Array();

    this.setState({ notifications });
  };

  format_time = (timestamp) => {};

  render_notification = ({ title, user, created }) => {
    return (
      <div class="ground ground-list-single">
        <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center bg-light-success">
          <div class="position-absolute text-success h5 mb-0">
            {user?.image ? (
              <img src={user.image} class="rounded" />
            ) : (
              <i class="fas fa-user"></i>
            )}
          </div>
        </div>

        <div class="ground-content">
          <h6>
            <a href="#">{`${user.firstname} ${user.lastname}`}</a>
          </h6>
          <small class="text-fade">{title}</small>
          <span class="small">{this.format_time(created)}</span>
        </div>
      </div>
    );
  };

  render() {
    let { notifications } = this.state;

    if (notifications && !notifications.length) return null;

    return (
      <div class="col-lg-4 col-md-12 col-sm-12">
        <div class="card">
          <div class="card-header">
            <h6>Notifications</h6>
          </div>
          <div class="ground-list ground-hover-list">
            {notifications ? (
              notifications.map((notification) =>
                this.render_notification(notification)
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
