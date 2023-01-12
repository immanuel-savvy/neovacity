import React from "react";
import { Link } from "react-router-dom";
import Video from "../Components/video";
import { domain } from "../Constants/constants";
import { emitter } from "../Neovacity";

class Course_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_short_description = () =>
    this.setState({ show_full: !this.state.show_full });

  handle_enroll = () => {
    let { course, school } = this.props;
    if (!course) course = school;

    window.sessionStorage.setItem("enroll", JSON.stringify(course));
    emitter.emit("push_enroll", course);
  };

  render() {
    let { show_full } = this.state;
    let { course, school, cummulative_price } = this.props;

    if (!course) course = school;

    let {
      image,
      video,
      enrollments,
      duration,
      lectures,
      price,
      short_description,
    } = course;
    price = price || cummulative_price || 0;

    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_3 ovrlio stick_top">
          <Video
            thumbnail_class="pro_img img-fluid w100"
            thumbnail={`${domain}/Images/${image}`}
            url={video}
          />

          <div className="d-flex">
            <div className="ed_view_price pl-4">
              <span>Actual Price</span>

              <h2 className="theme-cl">$ {Number(price).toFixed(2)}</h2>
            </div>
          </div>
          <div
            onClick={this.toggle_short_description}
            className="ed_view_short pl-4 pr-4 pb-2"
          >
            <p>
              {show_full
                ? short_description
                : `${short_description.slice(0, 150)}...`}
            </p>
          </div>

          <div class="ed_view_features half_list pl-4 pr-3">
            <span>Course Features</span>
            <ul>
              <li>
                <i class="fa fa-gem"></i>
                {`${enrollments || 67} Enrollments`}
              </li>
              <li>
                <i class="ti-time"></i>
                {`${duration || 12} Weeks`}
              </li>
              <li>
                <i class="fa fa-users"></i>
                {`${lectures || 13} Lectures`}
              </li>
            </ul>
          </div>

          <div className="ed_view_link">
            <Link to="/enroll" style={{ textDecorationLine: "none" }}>
              <span
                onClick={this.handle_enroll}
                className="btn theme-bg enroll-btn"
              >
                Enroll Now<i className="ti-angle-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Course_sidebar;
