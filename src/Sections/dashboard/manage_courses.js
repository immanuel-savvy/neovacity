import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import Select_filter from "../../Components/select_filter";
import { emitter } from "../../Neovacity";
import { scroll_to_top } from "../../Pages/Adminstrator";
import Featured_course from "../../Components/course";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      page_size: 9,
      total_courses: "-",
    };
  }

  fetch_courses = async (page = this.state.page) => {
    let { page_size } = this.state;

    let res = await post_request("courses", {
      total_courses: true,
      limit: page_size,
      skip: page_size * (page || 0),
    });
    let { total_courses, courses } = res;

    let i = 0;
    for (let p = 0; p < total_courses; p += page_size) i++;

    this.setState({
      filter: await this.select_filter(),
      courses,
      total_courses,
      page,
      total_pages: i,
    });
  };

  componentDidMount = async () => {
    await this.fetch_courses();
  };

  select_filter = async () => {
    let schools = await get_request("schools/all");

    return new Array({
      _id: "school",
      label_text: "school",
      options: new Array(
        { title: "-- All schools --", default: true },
        ...schools.map(
          (school) =>
            new Object({
              title: school.title,
              value: school._id,
            })
        )
      ),
    });
  };

  filter_courses = async () => {
    let { school, search_param } = this.state;

    let filter = new Object();
    if (school) filter.school = school;
    if (search_param) filter.search_param = search_param;

    let { total_courses, courses } = await post_request("courses", {
      filter,
      total_courses: true,
      limit: this.page_size,
    });

    this.setState({ courses, total_courses });
  };

  page = async (page) => {
    await this.fetch_courses(page);

    scroll_to_top();
  };

  next_page = async () => {
    let { page, total_pages } = this.state;
    page < total_pages && (await this.fetch_courses(page + 1));
  };

  prev_page = async () => {
    let { page } = this.state;
    page > 0 && (await this.fetch_courses(page - 1));
  };

  render_pagers = () => {
    let { page_size, page, total_courses } = this.state,
      mapper = new Array(),
      i = 0;
    for (let p = 0; p < total_courses; p += page_size) mapper.push(i++);

    return mapper.map((pager, index) => (
      <li
        key={index}
        className={`page-item ${index === page ? "active" : ""}`}
        onClick={() => this.page(index)}
      >
        <a className="page-link" href="#">
          {pager + 1}
        </a>
      </li>
    ));
  };

  search_course = ({ target }) => this.setState({ search_param: target.value });

  render_pagination = () => {
    let { page, page_size, total_pages, courses, total_courses } = this.state;

    return (
      <div className="row align-items-center justify-content-between">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <p className="p-0">{`Showing ${page * page_size + 1} to ${
            page * page_size + courses.length
          } of ${total_courses} entire`}</p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <nav className="float-right">
            <ul className="pagination smalls m-0">
              <li
                onClick={this.prev_page}
                className={`page-item ${page === 0 ? "disabled" : ""}`}
              >
                <a className="page-link" href="#" tabIndex="-1">
                  <i className="fas fa-arrow-circle-left"></i>
                </a>
              </li>

              {this.render_pagers()}

              <li
                className={`page-item ${
                  total_pages === page ? "disabled" : ""
                }`}
                onClick={this.next_page}
              >
                <a className="page-link" href="#">
                  <i className="fas fa-arrow-circle-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  edit_course = (course) => emitter.emit("edit_course", course);

  delete_course = async (course_id) => {
    let { courses, total_courses } = this.state;
    courses = courses.filter((course) => course._id !== course_id);
    total_courses--;
    this.setState({ courses, total_courses });
    console.log(await post_request(`remove_course/${course_id}`));
  };

  render() {
    let { filter, courses } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage course" />

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="dashboard_wrap">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                  <h6 className="m-0">All Courses List</h6>
                </div>
              </div>
              <div className="row align-items-end mb-5">
                {filter ? (
                  filter.map((filter_, index) => (
                    <Select_filter
                      selection={filter_}
                      on_select={({ target }) =>
                        this.setState({ [filter_._id]: target.value })
                      }
                      key={index}
                    />
                  ))
                ) : (
                  <Loadindicator />
                )}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group smalls row align-items-center">
                    <label className="col-xl-2 col-lg-2 col-sm-2 col-form-label">
                      Search
                    </label>
                    <div className="col-xl-10 col-lg-10 col-sm-10">
                      <input
                        onChange={this.search_course}
                        type="text"
                        placeholder="Course title..."
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {filter ? (
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={this.filter_courses}
                        className="btn text-white full-width theme-bg"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="row">
                <hr />
                {courses && courses.map ? (
                  courses.map((course) => (
                    <Featured_course
                      adminstrator
                      course={course}
                      key={course._id}
                      delete_course={() => {
                        window.confirm("Are you sure to remove course? ") &&
                          this.delete_course(course._id);
                      }}
                      edit_course={() => this.edit_course(course)}
                    />
                  ))
                ) : (
                  <Loadindicator contained />
                )}
              </div>
              {/* Pagination */}
              {courses ? this.render_pagination() : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage_courses;
