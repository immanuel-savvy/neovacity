import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import { domain } from "../../Constants/constants";
import { emitter } from "../../Neovacity";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Add_course extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { course } = this.props;
    if (course) {
      if (course.schools && course.schools.length)
        course.schools = Array.from(
          new Set(course.schools.map((m) => m._id || m))
        );
    }

    this.state = {
      current_pill: "basic",
      schools: new Array(),
      requirements: new Array(),
      what_you_will_learn: new Array(),
      ...course,
      learn_index: null,
      requirement_index: null,
    };
  }

  tab_pills = new Array("basic", "pricing", "media", "meta_info", "finish");

  componentDidMount = async () => {
    let schools_options = await get_request("schools/all");

    this.setState({
      schools_options,
    });
  };

  is_set = () => {
    let { short_description, title, price, image } = this.state;
    return !!(
      short_description &&
      title &&
      Number(price) &&
      Number(price) > 0 &&
      image
    );
  };

  render_tab_pills = () => {
    let { current_pill, _id } = this.state;
    let finish = this.is_set();

    return this.tab_pills.map((pill) =>
      !finish && pill === "finish" ? null : (
        <button
          key={pill}
          className={pill === current_pill ? "nav-link active" : "nav-link"}
          id={`v-pills-${pill}-tab`}
          data-toggle="pill"
          data-target={`#v-pills-${pill}`}
          type="button"
          role="tab"
          aria-controls={`v-pills-${pill}`}
          aria-selected={pill === current_pill ? "true" : "false"}
          onClick={() =>
            this.setState(
              { current_pill: pill },
              pill === "finish" ? this.on_finish : null
            )
          }
        >
          {_id && pill === "finish"
            ? "Finish Edit"
            : to_title(pill.replace(/_/g, " "))}
        </button>
      )
    );
  };

  handle_course = () => {
    let { new_course: course } = this.state;
    window.sessionStorage.setItem("course", JSON.stringify(course));
  };

  finish_tab_panel = () => {
    let { uploading_course, new_course } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "finish"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-finish"
        role="tabpanel"
        aria-labelledby="v-pills-finish-tab"
      >
        {!uploading_course ? (
          <div className="succ_wrap">
            <div className="succ_121">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div className="succ_122">
              <h4>Course Successfully Added</h4>
              <p>{new_course?.short_description}</p>
            </div>
            <div className="succ_123">
              <Link to="/course">
                <span
                  onClick={this.handle_course}
                  className="btn theme-bg text-white"
                >
                  View Course
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center my-5">
            <Loadindicator />
          </div>
        )}
        {this.pill_nav("finish")}
      </div>
    );
  };

  pill_nav = (pill) => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <ul className="alios_slide_nav">
          <li>
            <a
              href="#"
              onClick={pill === "basic" ? null : () => this.prev_pill(pill)}
              className={
                pill === "basic" ? "btn btn_slide disabled" : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-left"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={
                pill === "finish" || (pill === "media" && !this.is_set())
                  ? null
                  : () => this.next_pill(pill)
              }
              className={
                pill === "finish" || (pill === "media" && !this.is_set())
                  ? "btn btn_slide disabled"
                  : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  next_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);

    current_pill_index < this.tab_pills.length - 1 &&
      this.setState(
        { current_pill: this.tab_pills[current_pill_index + 1] },
        pill === "media" ? this.on_finish : null
      );
  };

  prev_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);
    current_pill_index &&
      this.setState({ current_pill: this.tab_pills[current_pill_index - 1] });
  };

  add_to_learn = (e) => {
    e.preventDefault();
    let { what_you_will_learn_in_edit, learn_index, what_you_will_learn } =
      this.state;

    if (learn_index !== null) {
      what_you_will_learn[learn_index] = what_you_will_learn_in_edit;
      learn_index = null;
    } else
      what_you_will_learn = new Array(
        ...what_you_will_learn,
        what_you_will_learn_in_edit
      );

    this.setState({
      what_you_will_learn,
      learn_index,
      what_you_will_learn_in_edit: "",
    });
  };

  add_requirement = (e) => {
    e.preventDefault();
    let { requirement_in_edit, requirement_index, requirements } = this.state;

    if (requirement_index !== null) {
      requirements[requirement_index] = requirement_in_edit;
      requirement_index = null;
    } else requirements = new Array(...requirements, requirement_in_edit);

    this.setState({ requirements, requirement_index, requirement_in_edit: "" });
  };

  edit_learn = (index) => {
    let what_you_will_learn_in_edit = this.state.what_you_will_learn[index];
    this.setState({ what_you_will_learn_in_edit, learn_index: index });
  };

  edit_requirement = (index) => {
    let requirement_in_edit = this.state.requirements[index];
    this.setState({ requirement_in_edit, requirement_index: index });
  };

  filter_learn_index = (index) => {
    let { what_you_will_learn } = this.state;
    what_you_will_learn.splice(index, 1);
    this.setState({ what_you_will_learn });
  };

  filter_requirement_index = (index) => {
    let { requirements } = this.state;
    requirements.splice(index, 1);
    this.setState({ requirements });
  };

  meta_info_tab_panel = () => {
    let {
      what_you_will_learn,
      requirements,
      what_you_will_learn_in_edit,
      requirement_in_edit,
      requirement_index,
      learn_index,
      duration,
    } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "meta_info"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-meta_info"
        role="tabpanel"
        aria-labelledby="v-pills-meta_info-tab"
      >
        <div className="form-group smalls">
          <label>Course Duration (weeks)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Type requirement"
            value={duration}
            onChange={({ target }) => this.setState({ duration: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Requirements</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type requirement"
            value={requirement_in_edit}
            onChange={({ target }) =>
              this.setState({ requirement_in_edit: target.value })
            }
          />
          {requirement_in_edit ? (
            <a
              onClick={this.add_requirement}
              href="#"
              class="btn theme-bg text-light mt-2"
            >
              {requirement_index === null ? "Add" : "Update"}
            </a>
          ) : null}
        </div>
        {requirements.length ? (
          <ul class="simple-list p-0">
            {requirements.map((requirement, i) => (
              <li key={i}>
                {requirement}{" "}
                <span
                  className="px-2"
                  onClick={() => this.filter_requirement_index(i)}
                >
                  <i className={`fa fa-trash`}></i>
                </span>
                <span className="px-2" onClick={() => this.edit_requirement(i)}>
                  <i className={`fa fa-edit`}></i>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {requirements.length ? <br /> : null}
        <div className="form-group smalls">
          <label>What you'll learn</label>
          <input
            type="text"
            className="form-control"
            placeholder="What you will learn..."
            value={what_you_will_learn_in_edit}
            onChange={({ target }) =>
              this.setState({ what_you_will_learn_in_edit: target.value })
            }
          />
          {what_you_will_learn_in_edit ? (
            <a
              onClick={this.add_to_learn}
              href="#"
              class="btn theme-bg text-light mt-2"
            >
              {learn_index === null ? "Add" : "Update"}
            </a>
          ) : null}
        </div>

        {what_you_will_learn.length ? (
          <div class="edu_wraper">
            <h4 class="edu_title">What you'll learn</h4>
            <ul class="lists-3 row">
              {what_you_will_learn.map((learn, i) => (
                <li key={i} class="col-xl-4 col-lg-6 col-md-6 m-0">
                  <span>
                    {learn}{" "}
                    <span
                      className="px-2"
                      onClick={() => this.filter_learn_index(i)}
                    >
                      <i className={`fa fa-trash`}></i>
                    </span>
                    <span className="px-2" onClick={() => this.edit_learn(i)}>
                      <i className={`fa fa-edit`}></i>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  };

  basic_tab_panel = () => {
    let { schools_options } = this.state;
    return (
      <div
        className={
          this.state.current_pill === "basic"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-basic"
        role="tabpanel"
        aria-labelledby="v-pills-basic-tab"
      >
        <div className="form-group smalls">
          <label>Course Title*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Course Title"
            onChange={({ target }) => this.setState({ title: target.value })}
            value={this.state.title}
          />
        </div>

        <div className="form-group smalls">
          <label>Short Description*</label>
          <input
            onChange={({ target }) =>
              this.setState({ short_description: target.value })
            }
            value={this.state.short_description}
            type="text"
            className="form-control"
          />
        </div>

        {schools_options && !schools_options.length ? null : (
          <div className="form-group smalls">
            <label>School</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {schools_options ? (
                schools_options.map((school) => this.schools_checkbox(school))
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        )}

        {/* {course_sections && !course_sections.length ? null : (
          <div className="form-group smalls">
            <label>Course Section</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {course_sections ? (
                course_sections.map((section) =>
                  this.course_section_checkbox(section)
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        )} */}

        {this.pill_nav("basic")}
      </div>
    );
  };

  handle_check = (value, state_prop) => {
    let arr = this.state[state_prop];
    if (arr.includes(value)) arr = arr.filter((val) => val !== value);
    else arr.push(value);

    this.setState({ [state_prop]: arr });
  };

  schools_checkbox = ({ title, _id }) => (
    <div className="form-group smalls" key={_id}>
      <input
        id={_id}
        className="checkbox-custom"
        name="school"
        type="checkbox"
        checked={this.state.schools.includes(_id)}
        onChange={() => this.handle_check(_id, "schools")}
      />
      <label for={_id} className="checkbox-custom-label">
        {to_title(title.replace(/_/g, " "))}
      </label>
    </div>
  );

  // course_section_checkbox = ({ title, _id }) => (
  //   <div className="form-group smalls" key={_id}>
  //     <input
  //       id={_id}
  //       className="checkbox-custom"
  //       name="course_sections"
  //       type="checkbox"
  //       checked={this.state.sections.includes(_id)}
  //       onChange={() => this.handle_check(_id, "sections")}
  //     />
  //     <label for={_id} className="checkbox-custom-label">
  //       {to_title(title.replace(/_/g, " "))}
  //     </label>
  //   </div>
  // );

  handle_price = ({ target }) => this.setState({ price: target.value });

  pricing_tab_panel = () => {
    let { price } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "pricing"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-pricing"
        role="tabpanel"
        aria-labelledby="v-pills-pricing-tab"
      >
        <div className="form-group smalls">
          <label>Course Price($) *</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Course Price"
            value={price}
            onChange={this.handle_price}
          />
        </div>

        {this.pill_nav("pricing")}
      </div>
    );
  };

  media_tab_panel = () => {
    let { image, banner_image } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "media"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-media"
        role="tabpanel"
        aria-labelledby="v-pills-media-tab"
      >
        <div className="form-group smalls">
          <label>Video URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://www.youtube.com/watch?v=ExXhmuH-cw8"
            value={this.state.video}
            onChange={({ target }) => this.setState({ video: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Image (1200 x 800)*</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              accept="image/*"
              onChange={this.handle_image}
            />
            <label className="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
          <div>
            {image ? (
              <img
                className="py-3 rounded"
                style={{ maxHeight: 200, maxWidth: 200 }}
                src={
                  image && image.startsWith("data")
                    ? image
                    : `${domain}/Images/${image}`
                }
              />
            ) : null}
          </div>
        </div>

        <div className="form-group smalls">
          <label>Banner Image (1920 x 1200)*</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFileBanner"
              accept="image/*"
              onChange={(e) => this.handle_image(e, "banner_")}
            />
            <label className="custom-file-label" for="customFileBanner">
              Choose file
            </label>
          </div>
          <div>
            {banner_image ? (
              <img
                className="py-3 rounded"
                style={{ maxHeight: 200, maxWidth: 200 }}
                src={
                  banner_image && banner_image.startsWith("data")
                    ? banner_image
                    : `${domain}/Images/${banner_image}`
                }
              />
            ) : null}
          </div>
        </div>

        {this.pill_nav("media")}
      </div>
    );
  };

  set_instructor = ({ target }) => {
    let { instructors } = this.state;

    this.setState({
      instructor: target.value,
      instructor_full: instructors.find(
        (instruct) => instruct._id === target.value
      ),
    });
  };

  on_finish = async () => {
    this.setState({ uploading_course: true });
    let {
      short_description,
      sections,
      schools,
      title,
      price,
      video,
      image,
      requirements,
      what_you_will_learn,
      _id,
      banner_image,
      image_hash,
      banner_image_hash,
      duration,
      instructor_full,
    } = this.state;
    let course = {
      short_description,
      sections,
      schools,
      title,
      price: Number(price),
      video,
      image,
      image_hash,
      banner_image_hash,
      banner_image,
      duration,
    };
    if (what_you_will_learn.length)
      course.what_you_will_learn = what_you_will_learn;
    if (requirements.length) course.requirements = requirements;

    let response;
    if (_id) {
      course._id = _id;
      response = await post_request("update_course", { course });
      course.image = response.image;
      course.banner_image = response.banner_image;
    } else {
      response = await post_request("add_course", { course });
      course.image = response.image;
      course.banner_image = response.banner_image;
      course._id = response._id;
      course.created = response.created;
    }
    if (response?._id) {
      this.setState({ new_course: course });

      emitter.emit(_id ? "course_updated" : "new_course", {
        ...course,
        instructor: instructor_full,
      });
      this.reset_state();
    }
  };

  reset_state = () =>
    this.setState({
      short_description: "",
      image: "",
      video: "",
      price: "",
      title: "",
      uploading_course: false,
      schools: new Array(),
      sections: new Array(),
      certifications: new Array(),
      requirements: new Array(),
      what_you_will_learn: new Array(),
    });

  render() {
    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="add new course" />
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="dashboard_wrap">
              <div className="form_blocs_wrap">
                <form>
                  <div className="row justify-content-between">
                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12">
                      <div
                        className="nav flex-column nav-pills me-3"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        {this.render_tab_pills()}
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12">
                      <div className="tab-content" id="v-pills-tabContent">
                        {this.basic_tab_panel()}
                        {this.pricing_tab_panel()}
                        {this.media_tab_panel()}
                        {this.meta_info_tab_panel()}
                        {this.finish_tab_panel()}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_course;
