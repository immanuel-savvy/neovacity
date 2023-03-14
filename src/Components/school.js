import React from "react";
import { Link } from "react-router-dom";
import { emitter } from "../Neovacity";
import { scroll_to_top } from "../Pages/Home";
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
    scroll_to_top();
  };

  toggle_desc = () => this.setState({ show_more: !this.state.show_more });

  padd_length = 140;

  render() {
    let { show_more } = this.state;
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
              to={`school/${title.replace(/ /g, "_")}`}
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
              to={`/school/${title.replace(/ /g, "_")}`}
              onClick={this.handle_school}
            >
              <h4 style={{ textTransform: "none" }}>
                {title.replace(/_/g, " ")}
              </h4>
            </Link>
          </div>

          <div style={{ flexWrap: "wrap", display: "flex" }}>
            {short_description.slice(
              0,
              show_more ? short_description.length : this.padd_length
            )}
            <a
              onClick={this.toggle_desc}
              className="btn text-accent btn-action ml-3"
            >
              {show_more ? "Show less" : "Read more"}
            </a>
          </div>

          <div class="prt_body">
            <ul>
              {courses.slice(0, 2).map((course) => (
                <li key={course._id}>
                  <Link
                    to="/course"
                    className="theme-cl"
                    style={{ textDecoration: "none" }}
                    onClick={
                      (() =>
                        window.sessionStorage.setItem(
                          "course",
                          JSON.stringify(course)
                        ),
                      scroll_to_top())
                    }
                  >
                    {course.title.replace(/_/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div class="prt_footer">
            <Link
              to={`/school/${title.replace(/ /g, "_")}`}
              style={{ textDecoration: "none" }}
              onClick={this.handle_school}
            >
              <span class="btn theme-cl choose_package">Explore courses</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default School;
