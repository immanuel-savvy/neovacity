import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import { emitter } from "../Neovacity";
import Preview_image from "./preview_image";
import Video from "./video";

class School extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_school = () => {
    let { school } = this.props;
    window.sessionStorage.setItem("school", JSON.stringify(school));
    emitter.emit("push_school", school);
  };

  padd_length = 70;

  render() {
    let { full_desc } = this.state;
    let { school, delete_course, edit_course, play } = this.props;
    let { title, video, image, short_description, image_hash, courses } =
      school;

    return (
      <div class="col-lg-4 col-md-4">
        <div className="crs_grid_thumb">
          {play ? (
            <Video url={video} />
          ) : (
            <Link
              className="crs_detail_link"
              to={`school`}
              onclick={this.handle_school}
            >
              <Preview_image
                image={image}
                image_hash={image_hash}
                title={title}
              />
            </Link>
          )}
          {video || edit_course ? (
            <div
              className="crs_video_ico"
              onClick={edit_course || this.play_video}
            >
              <i
                className={`fa fa-${
                  edit_course ? "edit" : `${play ? "pause" : "play"}`
                }`}
              ></i>
            </div>
          ) : null}
          {delete_course ? (
            <div className="crs_locked_ico" onClick={delete_course}>
              <i className={`fa fa-${delete_course ? "trash" : "lock"}`}></i>
            </div>
          ) : null}
        </div>
        <div class="pricing_wrap">
          <div class="prt_head">
            <Link
              style={{ textDecoration: "none" }}
              to={`/school`}
              onClick={this.handle_school}
            >
              <h4>{to_title(title.replace(/_/g, " "))}</h4>
            </Link>
          </div>

          <div style={{ flexWrap: "wrap", display: "flex" }}>
            {short_description.slice(
              0,
              full_desc ? short_description.length : this.padd_length
            )}
          </div>

          <div class="prt_body">
            <ul>
              {courses.map((school) => (
                <li key={school._id}>
                  {to_title(school.title.replace(/_/g, " "))}
                </li>
              ))}
            </ul>
          </div>
          <div class="prt_footer">
            <Link to={`/school`} onClick={this.handle_school}>
              <span class="btn choose_package">Register</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default School;
