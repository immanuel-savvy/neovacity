import React from "react";

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      question: question_,
      set_choice,
      choice,
      editable,
      index,
      remove,
    } = this.props;

    let { question, answer, options, _id } = question_;

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            <span style={{ opacity: 0.8 }}>{index}.)</span> {question}
          </span>

          {editable ? (
            <span>
              <a href="#" onClick={editable}>
                <i className="ti-pencil mr-2"></i>
              </a>
              <a href="#" onClick={remove}>
                <i className="ti-close ml-2"></i>
              </a>
            </span>
          ) : null}
        </div>

        {options.map((option, i) => (
          <span className="form-group smalls" key={i}>
            <input
              id={i}
              className="checkbox-custom"
              name={_id}
              checked={editable ? answer === i : choice === i}
              type="radio"
              onChange={editable ? () => {} : () => set_choice(i, _id)}
            />
            <label for={i} className="checkbox-custom-label">
              {option}
            </label>
          </span>
        ))}

        <hr />
      </div>
    );
  }
}

export default Question;
