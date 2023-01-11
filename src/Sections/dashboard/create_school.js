import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { domain, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Neovacity";

class Create_school extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = { search_results: new Array(), courses: new Array() };
  }

  fetch_master_courses = async (master_course) => {
    if (!master_course) return;

    let courses = await post_request("get_courses", {
      courses: master_course.courses,
    });
    this.setState({ courses });
  };

  componentDidMount = () => {
    let { master_course } = this.props;

    this.fetch_master_courses(master_course);

    master_course && this.setState({ ...master_course });

    this.master_course_to_update = (master_course) =>
      this.setState({ ...master_course }, () =>
        this.fetch_master_courses(master_course)
      );

    emitter.listen("master_course_to_update", this.master_course_to_update);
  };

  componentWillUnmount = () => {
    emitter.remove_listener(
      "master_course_to_update",
      this.master_course_to_update
    );
  };

  set_title = ({ target }) => this.setState({ title: target.value });

  set_price = ({ target }) => this.setState({ price: target.value });

  set_search_param = ({ target }) =>
    this.setState({ search_param: target.value });

  set_description = ({ target }) =>
    this.setState({ short_description: target.value });

  set_tags = ({ target }) => this.setState({ tags: target.value });

  handle_course = (course_) => {
    let { courses } = this.state;

    if (courses.find((course) => course._id === course_._id))
      courses = courses.filter((course) => course._id !== course_._id);
    else courses.push(course_);

    this.setState({ courses });
  };

  course = (course) => {
    let { title, _id, categories } = course;
    return (
      <tr
        style={{ cursor: "pointer" }}
        onClick={() => this.handle_course(course)}
      >
        <td>
          <a className="btn btn-action">
            <i
              className={`fas fa-${
                this.state.courses.find((course_) => course_._id === _id)
                  ? "check"
                  : "square"
              }`}
            ></i>
          </a>
        </td>
        <td>
          <h6>{to_title(title)}</h6>
        </td>
        <td>
          <div className="dhs_tags">
            {categories &&
              categories[0] &&
              to_title(categories[0].tags.split(",")[0])}
          </div>
        </td>
      </tr>
    );
  };

  search = async (e) => {
    e.preventDefault();
    let { search_param } = this.state;

    if (!search_param) return null;
    this.setState({ search_results: "" });

    let search_results = await post_request("search_courses", { search_param });
    this.setState({ search_results });
  };

  sumbit = async () => {
    let {
      title,
      courses,
      price,
      short_description,
      _id,
      image,
      tags,
      image_hash,
      created,
    } = this.state;

    let new_master_course = {
      title,
      tags,
      image,
      image_hash,
      price: Number(price),
      short_description,
      courses: courses.map((c) => c._id),
    };

    if (!_id) {
      let response = await post_request(
        "create_master_course",
        new_master_course
      );
      new_master_course._id = response._id;
      new_master_course.created = response.created;

      emitter.emit("new_master_course", new_master_course);
    } else {
      new_master_course._id = _id;
      new_master_course.courses = courses;
      new_master_course.created = created;
      if (new_master_course.image)
        if (new_master_course.image.startsWith("http"))
          new_master_course.image = this.props.master_course.image;

      await post_request("update_master_course", new_master_course);
      emitter.emit("master_course_updated", new_master_course);
    }

    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let {
      title,
      short_description,
      price,
      image,
      search_results,
      courses,
      search_param,
      _id,
      tags,
      image_loading,
    } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Master Course</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times-circle"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form className="forms_block">
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
                      Choose image
                    </label>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    {image_loading ? (
                      <Loadindicator contained />
                    ) : image ? (
                      <img
                        className="py-3"
                        style={{
                          maxHeight: 200,
                          maxWidth: 200,
                          resize: "both",
                        }}
                        src={
                          image.startsWith("data")
                            ? this.state.image
                            : `${domain}/Images/${image}`
                        }
                      />
                    ) : null}
                  </div>
                </div>
                <div className="form-group smalls">
                  <label>Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_title}
                    value={title}
                  />
                </div>

                <div className="form-group smalls">
                  <label>Tags*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_tags}
                    value={tags}
                  />

                  {tags ? (
                    <div className="mt-2">
                      {tags.split(",").map((tag) => (
                        <div key={tag} class="crs_cates cl_1">
                          <span>{to_title(tag.trim())}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="form-group smalls">
                  <label>Price*</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.set_price}
                    value={price}
                  />
                </div>

                <div className="form-group">
                  <label>Short Description*</label>
                  <textarea
                    onChange={this.set_description}
                    value={short_description}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Selected Courses*</label>
                  {
                    <table className="table dash_list">
                      {courses ? (
                        courses.length ? (
                          courses.map((course) => this.course(course))
                        ) : null
                      ) : (
                        <Loadindicator contained />
                      )}
                    </table>
                  }
                </div>
                <div className="row d-flex align-items-center">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="form-group smalls">
                      <label>Search Course</label>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        onChange={this.set_search_param}
                        value={search_param}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 pt-2">
                    <button
                      onClick={this.search}
                      style={{ color: "#fff" }}
                      className="btn theme-bg rounded full-width"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {
                  <table className="table dash_list">
                    {search_results ? (
                      search_results.length ? (
                        search_results.map((course) => this.course(course))
                      ) : null
                    ) : (
                      <Loadindicator contained />
                    )}
                  </table>
                }

                <div className="form-group smalls">
                  <button
                    onClick={
                      title && price && tags && short_description && this.sumbit
                    }
                    type="button"
                    className={`btn full-width ${
                      title && short_description && tags ? "theme-bg" : "grey"
                    } short_description-white`}
                  >
                    {_id ? "Update Master Course" : "Add Master Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create_school;
