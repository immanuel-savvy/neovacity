import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Neovacity";
import { scroll_to_top } from "../../Pages/Adminstrator";
import Featured_course from "../../Components/course";
import Add_school from "./create_school";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_schools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let schools = await get_request("schools/all");
    this.setState({ schools });

    this.new_school = (school) => {
      let { schools } = this.state;
      schools = new Array(school, ...schools);
      this.setState({ schools });
    };
    this.school_updated = (school) => {
      let { schools } = this.state;
      schools = schools.map((school_) => {
        if (school_._id === school._id) return school;
        return school_;
      });
      this.setState({ schools });
    };

    emitter.listen("new_school", this.new_school);
    emitter.listen("school_updated", this.school_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_school", this.new_school);
    emitter.remove_listener("school_updated", this.school_updated);
  };

  toggle_form = () =>
    this.setState({
      show_form: !this.state.show_form,
      school_to_update: null,
    });

  add_new_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Create school
          </a>
        </div>
      </div>
    );

  remove_school = async (school_id) => {
    let { schools } = this.state;
    schools = schools.filter((school) => school._id !== school_id);
    this.setState({ schools });

    await post_request(`remove_school/${school_id}`);
    emitter.emit("school_removed", school_id);
  };

  edit_school = (school) => {
    scroll_to_top();

    this.state.show_form
      ? emitter.emit("school_to_update", school)
      : this.setState({
          school_to_update: school,
          show_form: true,
        });
  };

  render() {
    let { schools, show_form, school_to_update } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="school"
          on_click={this.toggle_form}
          hide={show_form || !schools || (schools && !schools.length)}
          title="manage school"
        />

        <div class="row">
          {show_form ? (
            <div>
              <Add_school school={school_to_update} toggle={this.toggle_form} />
              <hr />
            </div>
          ) : null}

          {schools ? (
            schools.length && schools.map ? (
              schools.map((school) => (
                <Featured_course
                  course={school}
                  delete_course={() => {
                    window.confirm("Are you sure to remove school? ") &&
                      this.remove_school(school._id);
                  }}
                  edit_course={() => this.edit_school(school)}
                  in_courses
                />
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {this.add_new_btn()}
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_schools;
