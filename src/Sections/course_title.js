import React from "react";
import { Link } from "react-router-dom";
import { gen_random_int } from "../Assets/js/utils/functions";
import Video from "../Components/video";
import { emitter } from "../Neovacity";

class Course_title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_enroll = () => {
    let { course, school } = this.props;
    if (!course) course = school;

    window.sessionStorage.setItem("enroll", JSON.stringify(course));
    emitter.emit("push_enroll", course);
  };

  render() {
    let { course } = this.props;
    let {
      video,
      image,
      image_hash,
      short_description,
      title,
      lectures,
      enrollments,
      duration,
    } = course;

    return (
      <div class="ed_detail_head">
        <div class="container">
          <div class="row align-items-center mb-5">
            <div class="col-lg-3 col-md-12 col-sm-12">
              <div class="authi_125">
                <div class="authi_125_thumb">
                  <Video
                    url={video}
                    thumbnail={image}
                    thumbnail_hash={image_hash}
                  />
                </div>
              </div>
            </div>

            <div class="col-lg-9 col-md-12 col-sm-12">
              <div class="dlkio_452">
                <div class="ed_detail_wrap">
                  <div class="ed_header_caption">
                    <h2 class="ed_title">{title}</h2>
                    <ul>
                      <li>
                        <i class="ti-calendar"></i>
                        {`${duration || 12} weeks`}
                      </li>
                      <li>
                        <i class="ti-control-forward"></i>
                        {`${lectures || 1} Lectures`}
                      </li>
                      <li>
                        <i class="ti-user"></i>
                        {`${
                          enrollments || gen_random_int(1000, 350)
                        } Student Enrolled`}
                      </li>
                    </ul>
                  </div>

                  <div class="ed_header_short">
                    <p>{short_description.slice(0)}</p>
                  </div>
                </div>
                <div class="dlkio_last">
                  <div style={{ visibility: "hidden" }}> </div>
                  <Link to="/enroll" style={{ textDecorationLine: "none" }}>
                    <span
                      onClick={this.handle_enroll}
                      className="btn theme-bg text-light enroll-btn"
                    >
                      Enroll Now<i className="ti-angle-right"></i>
                    </span>
                  </Link>
                  <div class="ed_view_link">
                    <a href="#" class="btn theme-border enroll-btn">
                      Share<i class="fas fa-share"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Course_title;
