import React from "react";
import { next_quarter } from "../Assets/js/utils/functions";

class Admission_exam_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { course, user_details, begin_exam, start } = this.props;
    let { title } = course;
    let { firstname, lastname, email } = user_details;

    let set = next_quarter();

    return (
      <div>
        <div>
          <span className="h3">Course Details</span>
          <div style={{ display: "flex" }}>
            <div style={{ display: "inline" }}>
              <br />
              <div className="h5">{title}</div>
            </div>
            <div style={{ display: "inline", marginLeft: 24 }}>
              <span>Set</span>
              <div style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                {set.str} - {set.next_entry}
              </div>
            </div>
          </div>
        </div>

        <hr />

        <span className="h3">Student Details</span>
        <div className="ed_header_caption">
          <h2 className="ed_title">{`${firstname} ${lastname}`}</h2>

          <span>{email}</span>
        </div>

        <hr />

        <div className="ed_header_caption">
          <ul>
            <li>
              <i className="ti-calendar"></i>
              20 Questions
            </li>

            <li>
              <i className="ti-calendar"></i>
              50% Cut-off
            </li>
          </ul>
        </div>

        {begin_exam && !start ? (
          <span
            type="span"
            onClick={begin_exam}
            className={`btn full-width text-light btn-bg short_description-white`}
          >
            Begin Exam
          </span>
        ) : null}
      </div>
    );
  }
}

export default Admission_exam_details;
