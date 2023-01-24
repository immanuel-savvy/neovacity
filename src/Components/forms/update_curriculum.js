import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Daily_outline from "../daily_outline";
import Loadindicator from "../loadindicator";

let sorted_dow = new Array(
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
);

class Update_curriculum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: new Array(),
      dow: new Array(),
    };
  }

  componentDidMount = async () => {
    let { course } = this.props;
    let weeks = await get_request(`curriculum/${course._id}`),
      active_week;

    let dow = (weeks && weeks.dow) || new Array();

    let weeks_ = new Array();
    weeks = weeks.weeks.map((week) => weeks_.push(week));

    if (weeks && !weeks.length) {
      weeks = new Array({
        _id: Math.random(),
        lectures: new Array(),
        topic: "",
      });
    } else weeks = weeks_;

    active_week = weeks[0]._id;

    this.setState({ weeks, active_week, dow });
  };

  reset_state = () =>
    this.setState({
      topic: "",
      subtopics: new Array(),
      _id: null,
    });

  add_new_week = (e) => {
    e.preventDefault();

    let { weeks } = this.state;
    weeks.push({
      week: weeks.length + 1,
      _id: Math.random(),
      lectures: new Array(),
      course: this.props.course._id,
    });

    this.setState({ weeks, active_week: weeks.slice(-1)[0]._id });
  };

  handle_file = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    this.setState({ resource_loading: true });
    reader.onloadend = async (e) =>
      this.setState({
        resource: reader.result,
        resource_file_name: file.name,
        resource_loading: false,
      });
  };

  delete_week = async (week_id) => {
    let { course } = this.props;
    let { weeks, active_week } = this.state;
    weeks = weeks.filter((week) => week._id !== week_id);

    if (active_week === week_id) active_week = weeks[0];
    this.setState({ weeks, active_week });

    typeof week_id === "string" &&
      (await post_request("delete_week", {
        week: week_id,
        course: course._id,
      }));
  };

  save_lecture = () => {
    let { active_week, topic, resource_file_name, resource, weeks } =
      this.state;
    let week = weeks.find((week) => week._id === active_week);
    week.lectures.push({
      topic,
      resource,
      resource_file_name,
    });

    this.setState({ weeks, resource_file_name: "", resource: "", topic: "" });
  };

  active_week = (week_id) => this.setState({ active_week: week_id });

  submit = async () => {
    this.setState({ loading: true });
    let { course } = this.props;
    let { weeks, active_week, dow } = this.state;

    let week = weeks.find((week) => week._id === active_week);

    week.course = course._id;
    let route = typeof week._id === "string" ? "update_week" : "new_week";
    route === "new_week" && delete week._id;

    let res = await post_request(route, { week, dow });

    if (res && res.week) {
      week._id = res.week._id;
      week.lectures = res.week.lectures;
      week.created = res.week.created;
    }

    this.setState({
      active_week: "",
      topic: "",
      resource: "",
      resource_file_name: "",
      loading: false,
    });
  };

  handle_dow = (day) => {
    let { dow } = this.state;
    if (dow.includes(day)) dow = dow.filter((d) => d !== day);
    else dow.push(day);

    this.setState({ dow });
  };

  render() {
    let { toggle, course } = this.props;
    let {
      topic,
      loading,
      weeks,
      active_week,
      resource_loading,
      dow,
      resource_file_name,
    } = this.state;

    if (active_week)
      active_week = weeks.find((week) => week._id === active_week);

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <br />
            <div className="modal-body">
              <p>Lecture Days of the Week</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {sorted_dow.map((day) => {
                  let selected = dow.includes(day);
                  return (
                    <span
                      onClick={() => this.handle_dow(day)}
                      style={{
                        borderColor: selected ? "#000132" : "#333",
                        borderWidth: selected ? 1 : 0,
                        borderStyle: "solid",
                        borderRadius: 10,
                        marginRight: 15,
                        marginBottom: 5,
                        cursor: "pointer",
                        padding: 10,
                      }}
                    >
                      <a
                        href="#"
                        style={{
                          padding: 5,
                          textDecoration: "none",
                          color: selected ? "#000132" : "#000",
                          borderRadius: 10,
                          borderWidth: 1,
                          textTransform: "capitalize",
                        }}
                        key={day}
                      >{`${day}`}</a>
                    </span>
                  );
                })}
              </div>

              <p className="mt-3">Weeks</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {weeks.map((week, index) => (
                  <span>
                    <a
                      href="#"
                      style={{
                        marginHorizontal: 2,
                        padding: 5,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#333",
                      }}
                      onClick={() => this.active_week(week._id)}
                      key={index}
                    >{`Week ${index + 1}`}</a>

                    <a
                      onClick={() =>
                        window.confirm(`Delete week ${index + 1}?`) &&
                        this.delete_week(week._id)
                      }
                      className="btn btn-action"
                    >
                      <i className={`fas fa-window-close`}></i>
                    </a>
                  </span>
                ))}

                {weeks.length < (course.duration || 12) ? (
                  <a href="#" onClick={this.add_new_week}>
                    <span>
                      <i class="fa fa-plus"></i>
                      {`New week`}
                    </span>
                  </a>
                ) : null}
              </div>

              <br />
              {active_week && typeof active_week._id === "string" ? null : (
                <>
                  {active_week?.lectures?.length >= dow.length ? null : (
                    <div>
                      <h6>Add Lecture</h6>
                      <form className="forms_block">
                        <div className="form-group smalls">
                          <label>Topic*</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={({ target }) =>
                              this.setState({ topic: target.value })
                            }
                            value={topic}
                          />
                        </div>

                        <div className="form-group smalls">
                          <label>Lecture Resource (PDF)</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={this.handle_file}
                            />
                            {resource_loading ? (
                              <Loadindicator />
                            ) : (
                              <label
                                className="custom-file-label"
                                for="customFile"
                              >
                                {resource_file_name || "Choose Resource"}
                              </label>
                            )}
                          </div>
                        </div>

                        {topic ? (
                          <a
                            href="#"
                            style={{ color: "#fff" }}
                            onClick={this.save_lecture}
                            class="btn theme-bg btn-md"
                          >
                            Save
                          </a>
                        ) : null}
                      </form>
                    </div>
                  )}

                  <hr />

                  {loading ? (
                    <Loadindicator />
                  ) : active_week && active_week.lectures.length > 0 ? (
                    <div className="form-group smalls">
                      <button
                        onClick={this.submit}
                        type="button"
                        className={`btn theme-bg full-width text-white`}
                      >
                        {typeof active_week._id === "string"
                          ? "Update Week"
                          : "Add Week"}
                      </button>
                    </div>
                  ) : null}
                </>
              )}

              {active_week
                ? active_week.lectures.map((lecture, index) => (
                    <Daily_outline
                      outline={lecture}
                      key={index}
                      index={index}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Update_curriculum;
export { sorted_dow };
