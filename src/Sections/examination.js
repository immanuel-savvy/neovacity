import React from "react";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Question from "../Components/question";
import Score from "./score";

class Examination extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current_question: 1, choices: new Object() };
  }

  prev = () => {
    let { current_question } = this.state;
    current_question--;
    this.setState({ current_question });
  };

  next = () => {
    let { current_question } = this.state;
    current_question++;
    this.setState({ current_question });
  };

  set_choice = (choice, question) => {
    let { choices } = this.state;
    choices[question] = choice;

    this.setState({ choices }, this.can_submit);
  };

  can_submit = () => {
    let { questions } = this.props;
    let { choices } = this.state;

    Object.values(choices)?.length === questions?.length &&
      this.setState({ can_submit: true });
  };

  submit = () => {
    let { questions } = this.props;
    let { choices } = this.state;
    let pass = 0;
    questions.map(({ answer, _id }) => {
      if (answer === choices[_id]) pass++;
    });

    let score = ((pass / questions.length) * 100).toFixed(2);

    this.setState({ score, pass, submitted: true });
  };

  render() {
    let { questions, school, proceed_to_admission } = this.props;
    let { current_question, submitted, score, pass, choices, can_submit } =
      this.state;
    if (!questions) return <Loadindicator contained />;

    let question = questions[current_question - 1];

    return submitted ? (
      <Score
        details={{ score, pass, school, choices, total: questions.length }}
        proceed_to_admission={proceed_to_admission}
      />
    ) : (
      <div>
        <div>
          {!questions.length ? (
            <Listempty text="No questions set." />
          ) : (
            <Question
              set_choice={this.set_choice}
              index={current_question}
              choice={choices[question._id]}
              question={question}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {current_question > 1 ? (
            <span className="cpointer" onClick={this.prev}>
              <i className="ti ti-arrow-left"></i>&nbsp; Prev
            </span>
          ) : (
            <span></span>
          )}
          {
            <span>
              {current_question} of {questions.length}
            </span>
          }
          {current_question < questions.length ? (
            <span className="cpointer" onClick={this.next}>
              Next &nbsp;
              <i className="ti ti-arrow-right"></i>
            </span>
          ) : (
            <span></span>
          )}
        </div>

        <hr />

        {can_submit ? (
          <span
            type="span"
            onClick={this.submit}
            className={`btn full-width text-light btn-bg short_description-white`}
          >
            Submit
          </span>
        ) : null}
      </div>
    );
  }
}

export default Examination;
