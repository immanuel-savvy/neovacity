import React from "react";
import { Link } from "react-router-dom";
import Video from "../Components/video";
import { domain } from "../Constants/constants";
import { emitter } from "../Neovacity";
import Countdown from "./countdown";

class Course_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show_counter: true };
  }

  componentDidMount = () => {
    let { course, enrolled } = this.props;
    if (enrolled) {
      let next_lecture = window.sessionStorage.getItem("next_lecture");
      if (next_lecture) {
        next_lecture = JSON.parse(next_lecture);
        this.setState({
          date: new Date(next_lecture.date),
          outline: next_lecture.outline,
        });
      }
    }
  };

  toggle_short_description = () =>
    this.setState({ show_full: !this.state.show_full });

  handle_enroll = () => {
    let { course, school } = this.props;
    if (!course) course = school;

    window.sessionStorage.setItem("enroll", JSON.stringify(course));
    emitter.emit("push_enroll", course);
  };

  reset_counter = () => {
    this.setState({ show_counter: false }, () =>
      this.setState({ show_counter: true })
    );
  };

  render() {
    let { show_full, show_counter, outline, date } = this.state;
    let { course, school, cummulative_price, enrolled } = this.props;

    if (!course) course = school;

    let {
      image,
      video,
      enrollments,
      duration,
      lectures,
      price,
      short_description,
      _id,
    } = course;
    price = price || cummulative_price || 0;

    let is_school = _id.startsWith("school");

    return (
      <div className="col-lg-3 col-md-12 order-lg-last">
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
                {`90 Days Industrial Attachment / Engagement - Optional`}
              </li>
              <li>
                <i class="ti-time"></i>
                {`Graduation Ceremony - Get Listed on NVA Certified Pro`}
              </li>
            </ul>
          </div>

          {is_school ? (
            <div class="ed_view_features half_list pl-4 pr-3">
              <span>Compulsory Bonus Courses per Semester</span>
              <ul>
                <li>
                  <i class="fa fa-check"></i>
                  {`Financial Literacy & Fitness`}
                </li>
                <li>
                  <i class="fa fa-check"></i>
                  {`Personal Development & Effectiveness`}
                </li>
                <li>
                  <i class="fa fa-check"></i>
                  {`Entrepreneurship: From Idea to Start-up`}
                </li>
                <li>
                  <i class="fa fa-check"></i>
                  {`Global Citizen - Market, Trend and Jobs`}
                </li>
              </ul>
            </div>
          ) : (
            <div class="ed_view_features half_list pl-4 pr-3">
              <span>Course Stats</span>
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
          )}

          <div class="ed_view_features half_list pl-4 pr-3">
            <span>Method of Delivery</span>
            <ul>
              <li>
                <i class="fa fa-gem"></i>
                {`Virtual (live) + Community Connect Centre`}
              </li>
              <li>
                <i class="fa fa-gem"></i>
                {`End-of-Semester Bootcamp`}
              </li>
              <li>
                <i class="fa fa-gem"></i>
                {`Faculty Meetup & Discussion Forum`}
              </li>
            </ul>
          </div>

          <div class="ed_view_features half_list pl-4 pr-3">
            <span>Schedule</span>
            <ul>
              <li>
                <i class="fa fa-gem"></i>
                {`Four (4) Semesters`}
              </li>
              <li>
                <i class="fa fa-gem"></i>
                {`Holiday - A week break after every semesters`}
              </li>
            </ul>
          </div>

          <div class="ed_view_features half_list pl-4 pr-3">
            <span>Awards and Certificate</span>
            <br />
            <small>
              Get awarded NVA Certified iMaster / innovative Pro Diploma
            </small>
            <ul>
              <li>
                <i class="fa fa-plus"></i>
                {`National Innovation Diploma (acredited degree)`}
              </li>
              <li>
                <i class="fa fa-plus"></i>
                {`International Certification Exam Prep`}
              </li>
            </ul>
          </div>

          {date ? (
            <div className="crs_grid_foot center">
              <div className="crs_flex"></div>
              <div className="crs_fl_first">
                <div className="crs_price">
                  <span className="currency">Upcoming Lecture:</span>
                  <br />
                  <br />
                  <h2>
                    <span className="currency">{outline.topic} </span>
                  </h2>
                </div>
              </div>
              <br />
              <div className="crs_fl_last">
                <div className="crs_linkview">
                  <span
                    onClick={this.handle_upcoming_lecture}
                    className="btn btn_view_detail theme-bg text-light"
                  >
                    {show_counter ? <Countdown date={date} /> : null}
                  </span>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    );
  }
}

export default Course_sidebar;
