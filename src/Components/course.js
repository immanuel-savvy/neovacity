import React from "react";
import { Link } from "react-router-dom";
import { gen_random_int, to_title } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Handle_image_upload from "../Components/handle_image_upload";
import Preview_image from "../Components/preview_image";
import Video from "../Components/video";
import { domain } from "../Constants/constants";
import { emitter } from "../Neovacity";
import { route_prefix } from "../Sections/nav";
import Update_curriculum from "./forms/update_curriculum";
import Modal from "./modal";

const pricey = (price, percentage_off) => {
  if (!percentage_off) return price;

  return ((100 - percentage_off) / 100) * price;
};

class Featured_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { course } = this.props;

    this.full_desc = (course_id) => {
      if (!this.state.full_desc || course_id === course._id) return;
      this.setState({ full_desc: false });
    };
    emitter.listen("full_desc", this.full_desc);

    if (!course.image_hash && course.image) {
      try {
        let image_hash =
          await new Handle_image_upload().encode_image_to_blurhash(
            `${domain}/Images/${course.image}`
          );

        this.setState({ image_hash });
        await post_request(
          course.courses
            ? "update_master_course_image_hash"
            : "update_course_image_hash",
          {
            course: course._id,
            image_hash,
          }
        );
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  componentWillUnmount = () => {
    emitter.remove_listener("full_desc", this.full_desc);
  };

  toggle_description = () =>
    this.setState({ full_desc: !this.state.full_desc }, () =>
      emitter.emit("full_desc", this.props.course._id)
    );

  play_video = () => this.setState({ play: !this.state.play });

  padd_length = 70;

  handle_course = () => {
    let { course } = this.props;
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);
  };

  handle_enroll = () => {
    let { course } = this.props;
    window.sessionStorage.setItem("enroll", JSON.stringify(course));
    emitter.emit("push_enroll", course);
  };

  update_curriculum = () => this.curriculum?.toggle();

  render() {
    let { progress, image_hash: img_hash, full_desc, play } = this.state;

    let {
      course,
      classname,
      in_enroll,
      adminstrator,
      edit_course,
      delete_course,
    } = this.props;

    if (!course) return null;

    let {
      image,
      image_hash,
      courses,
      tags,
      title,
      short_description,
      video,
      price,
      lectures,
      duration,
      instructor,
      _id,
    } = course;
    if (!title) return null;

    image_hash = image_hash || img_hash;

    if (course?.categories?.length) {
      tags = "";
      course.categories.map((cat) => (tags += `${cat.tags},`));
      tags = tags.slice(0, tags.length - 1);
    }

    if (short_description) {
      short_description = short_description.split("");
      for (let i = short_description.length; i < this.padd_length; i++)
        short_description.push("**");
    }
    if (tags) tags = tags.split(",").filter((tag) => tag);
    if (!duration) duration = 12;

    let is_school = _id.startsWith("school");

    return (
      <div
        className={
          classname || `col-xl-${"4"} col-lg-${"4"} col-md-6 col-sm-12`
        }
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            {play ? (
              <Video url={video} />
            ) : (
              <Link className="crs_detail_link" to="/course">
                <Preview_image
                  image={image}
                  image_hash={image_hash}
                  title={title}
                  onclick={this.handle_course}
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
          <div className="crs_grid_caption">
            {instructor ? (
              <div className="crs_tutor_thumb overl_top">
                <Link to={`/courses?instructor=${instructor._id}`}>
                  <Preview_image
                    image={instructor.image}
                    image_hash={instructor.image_hash}
                    class_name="img-fluid circle"
                    no_preview
                  />
                </Link>
              </div>
            ) : null}
            <div
              className="table-responsive-sm overfolow-hidden"
              style={{ width: "100%" }}
            >
              {courses && courses.length && tags && tags.length ? (
                <div className="mb-4 crs_cates cl_1">
                  <span>{to_title(tags[gen_random_int(tags.length - 1)])}</span>
                </div>
              ) : null}
            </div>

            <div className="crs_title">
              <h4>
                <Link to="/course" className="crs_title_link">
                  <span onClick={this.handle_course}>
                    {to_title(title.trim().replace(/_/g, " "))}
                  </span>
                </Link>
              </h4>
            </div>
            <div onClick={this.toggle_description} className="crs_info_detail">
              {is_school ? null : short_description ? (
                <div style={{ flexWrap: "wrap", display: "flex" }}>
                  {short_description
                    .slice(
                      0,
                      full_desc ? short_description.length : this.padd_length
                    )
                    .map((d, i) =>
                      d === "**" || d === " " ? <span key={i}>&nbsp;</span> : d
                    )}
                  {full_desc ? "" : "..."}
                </div>
              ) : null}

              <ul className="mt-2">
                {duration ? (
                  <li>
                    <i className="fa fa-calendar text-danger mr-2"></i>
                    <span>{`${duration} Weeks`}</span>
                  </li>
                ) : null}
                {lectures ? (
                  <li>
                    <i className="fa fa-video text-success mx-2"></i>
                    <span>{`${lectures} Lectures`}</span>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="preview_crs_info">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "100%" }}
                  aria-valuenow={progress || 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_price">
                  <h2>
                    <span className="currency">$</span>
                    <span className="theme-cl">{pricey(price)}</span>
                  </h2>
                </div>
              </div>

              <div className="crs_fl_last">
                <div className="crs_linkview">
                  <Link
                    to={`${route_prefix}${
                      adminstrator || in_enroll || is_school
                        ? "/course"
                        : "/enroll"
                    }`}
                  >
                    <span
                      onClick={
                        adminstrator ? this.handle_course : this.handle_enroll
                      }
                      className="btn btn_view_detail theme-bg text-light"
                    >
                      {adminstrator || in_enroll || is_school
                        ? "View Course"
                        : "Enroll Now"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {adminstrator ? (
              <div className="crs_fl_last">
                <div className="crs_linkview">
                  <span
                    onClick={this.update_curriculum}
                    className="btn btn_view_detail theme-bg text-light"
                  >
                    {"Update Curriculum"}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <Modal
          // style={{ backgroundColor: "#008000" }}
          title={`Curriculum: ${title}`}
          aria_labelled_by="contained-modal-title-vcenter"
          ref={(curriculum) => (this.curriculum = curriculum)}
        >
          <Update_curriculum
            course={course}
            toggle={() => this.curriculum?.toggle()}
          />
        </Modal>
      </div>
    );
  }
}

export default Featured_course;
export { pricey };
