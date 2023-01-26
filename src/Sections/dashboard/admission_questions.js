import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Question from "../../Components/question";
import New_question from "./new_question";

class Admission_questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { school } = this.props;
    let questions = await post_request("admission_questions", {
      school: school._id,
    });

    questions = (questions && questions.questions) || new Array();
    this.setState({ questions });
  };

  remove_question = async (index) => {
    let { questions } = this.state;
    let question = questions.splice(index, 1);

    this.setState({ questions });

    question.length &&
      (await post_request("remove_question", {
        question: question[0]._id,
        school: this.props.school._id,
      }));
  };

  new_question = async (question) => {
    let { questions, loading, question_in_edit } = this.state;
    if (loading) return;
    this.setState({ loading: true });

    let { school } = this.props;
    question.school = school._id;

    let res = await post_request(
      question_in_edit ? "update_question" : "new_question",
      question
    );
    question._id = res._id;
    question.created = res.created;

    if (question_in_edit)
      questions = questions.map((q) => {
        if (q._id === question_in_edit._id) return question;
        return q;
      });
    else questions = new Array(question, ...questions);
    this.setState({ questions, loading: false, question_in_edit: null });
  };

  edit_question = (question) => {
    let { new_question } = this.state;
    new_question
      ? this.setState({ new_question: false }, () =>
          this.edit_question(question)
        )
      : this.setState({ question_in_edit: question, new_question: true });
  };

  toggle_new_question = () =>
    this.setState({
      new_question: !this.state.new_question,
      question_in_edit: null,
    });

  render() {
    let { questions, question_in_edit, new_question, loading } = this.state;

    return (
      <div>
        {new_question ? (
          <New_question
            new_question={this.new_question}
            loading={loading}
            question={question_in_edit}
            toggle={this.toggle_new_question}
          />
        ) : (
          <a href="#" onClick={this.toggle_new_question}>
            <i className="ti-plus"></i>
            &nbsp; Question
          </a>
        )}
        <hr />

        <span>Questions</span>
        <br />
        <br />
        {questions ? (
          questions.length ? (
            questions.map((q, i) => (
              <Question
                question={q}
                key={q._id}
                index={i + 1}
                remove={() =>
                  window.confirm("Are you sure to remove this question?") &&
                  this.remove_question(i)
                }
                editable={() => this.edit_question(q)}
              />
            ))
          ) : (
            <Listempty text="No questions set yet." />
          )
        ) : (
          <Loadindicator contained />
        )}
      </div>
    );
  }
}

export default Admission_questions;
