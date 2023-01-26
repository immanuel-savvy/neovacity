import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Admission_exam_details from "./admission_exam_details";
import Examination from "./examination";

class Admission_exam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetch_questions = async () => {
    let { course } = this.props;

    let questions = await post_request("admission_questions", {
      school: course.schools[0],
      limit: 20,
    });

    if (!questions.questions) questions = new Array();
    else questions = questions.questions;

    this.setState({ questions });
  };

  begin_exam = () => {
    this.setState({ start: true }, this.fetch_questions);
  };

  render() {
    let { course, user_details } = this.props;
    let { start, questions } = this.state;

    return (
      <div>
        <Admission_exam_details
          begin_exam={this.begin_exam}
          course={course}
          start={start}
          user_details={user_details}
        />

        {start ? (
          <Examination school={course.schools[0]} questions={questions} />
        ) : null}
      </div>
    );
  }
}

export default Admission_exam;
