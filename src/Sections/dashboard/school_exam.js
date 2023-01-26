import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import Modal from "../../Components/modal";
import Admission_questions from "./admission_questions";

class School_exam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_admission_questions = () => this.admission_questions?.toggle();

  render() {
    let { school } = this.props;
    let { title } = school;

    return (
      <span
        className="single_items lios_item mb-3"
        style={{
          boxShadow: "1px 2px 9px #ccc",
          alignSelf: "flex-start",
          margin: 20,
          padding: 20,
          borderRadius: 14,
          display: "inline",
        }}
      >
        <span>{to_title(title.replace(/_/g, " "))}</span>
        <br />
        <a
          href="#"
          style={{ cursor: "pointer" }}
          onClick={this.toggle_admission_questions}
        >
          Admission Questions
        </a>

        <Modal
          title="Admission Questions"
          aria_labelled_by="contained-modal-title-vcenter"
          ref={(admission_questions) =>
            (this.admission_questions = admission_questions)
          }
        >
          <Admission_questions
            school={school}
            toggle={this.toggle_admission_questions}
          />
        </Modal>
      </span>
    );
  }
}

export default School_exam;
