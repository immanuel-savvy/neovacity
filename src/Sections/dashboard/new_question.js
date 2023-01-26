import React from "react";
import Loadindicator from "../../Components/loadindicator";

class New_question extends React.Component {
  constructor(props) {
    super(props);

    let { question } = this.props;

    this.state = {
      options: new Array(),
      option_index: null,
      answer: null,
      option_in_edit: "",
      ...question,
    };
  }

  add_option = (e) => {
    e.preventDefault();
    let { option_in_edit, option_index, options } = this.state;

    if (option_index !== null) {
      options[option_index] = option_in_edit;
      option_index = null;
    } else options = new Array(...options, option_in_edit);

    this.setState({
      options,
      option_index,
      option_in_edit: "",
    });
  };

  edit_option = (index) => {
    let option_in_edit = this.state.options[index];
    this.setState({ option_in_edit, option_index: index });
  };

  filter_option_index = (index) => {
    let { options, answer } = this.state;
    options.splice(index, 1);

    if (index === answer) answer = null;

    this.setState({ options, answer });
  };

  submit = async () => {
    let { new_question } = this.props;
    let { question, options, answer } = this.state;

    question = {
      question,
      options,
      answer,
    };

    await new_question(question);

    this.setState({
      question: "",
      options: new Array(),
      answer: null,
      option_index: null,
      option_in_edit: "",
    });
  };

  render() {
    let { option_in_edit, question, _id, answer, option_index, options } =
      this.state;
    let { toggle, loading } = this.props;

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Add Question</span>

          <a onClick={toggle}>
            <i className="ti-close"></i>
          </a>
        </div>

        {loading ? (
          <Loadindicator contained />
        ) : (
          <div className="form_blocs_wrap">
            <form>
              <div className="row justify-content-between">
                <div className="form-group smalls">
                  <label>Question</label>
                  <textarea
                    onChange={({ target }) =>
                      this.setState({ question: target.value })
                    }
                    value={question}
                    className="summernote form-control"
                  ></textarea>
                </div>

                <div className="form-group smalls">
                  <label>Options</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add option"
                    value={option_in_edit}
                    onChange={({ target }) =>
                      this.setState({
                        option_in_edit: target.value,
                      })
                    }
                  />
                  {option_in_edit ? (
                    <a
                      onClick={this.add_option}
                      href="#"
                      class="btn theme-bg text-light mt-2"
                    >
                      {option_index === null ? "Add" : "Update"}
                    </a>
                  ) : null}
                </div>
                {options.length ? (
                  <ul class="simple-list p-0">
                    {options.map((option, i) => (
                      <li key={i}>
                        {option}{" "}
                        <span
                          className="px-2"
                          onClick={() => this.filter_option_index(i)}
                        >
                          <i className={`fa fa-trash`}></i>
                        </span>
                        <span
                          className="px-2"
                          onClick={() => this.edit_option(i)}
                        >
                          <i className={`fa fa-edit`}></i>
                        </span>
                        <span className="form-group smalls">
                          <input
                            id={i}
                            className="checkbox-custom"
                            name="answer"
                            checked={answer === i}
                            type="radio"
                            onChange={() => this.setState({ answer: i })}
                          />
                          <label for={i} className="checkbox-custom-label">
                            Answer
                          </label>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </form>

            {question &&
            options.length > 1 &&
            answer !== null &&
            answer < options.length ? (
              <span
                type="span"
                onClick={this.submit}
                className={`btn full-width text-light theme-bg short_description-white`}
              >
                {_id ? "Update Question" : "Add Question"}
              </span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default New_question;
