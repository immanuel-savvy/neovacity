import React from "react";

class Score extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  proceed_with_enrollment = () => {
    let { proceed_with_enrollment, details } = this.props;

    proceed_with_enrollment(details);
  };

  render() {
    let { details } = this.props;
    let { score, pass, total } = details;
    let qualified = score > 50;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 24,
          borderRadius: 20,
          boxShadow: "1px 2px 9px #ccc",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3>{qualified ? "Congratulations" : "Hello"}</h3>
          <span>Your test score is</span>
          <div className="h2 mt-3">{score} %</div>
          <div>
            {pass} / {total}
          </div>
          <span>
            {qualified
              ? "You are above average, thereby qualified to start the course"
              : "You didn't meet with the test requirement, please try again in a week time."}
          </span>

          <div className="mt-3">
            {qualified ? (
              <span
                type="span"
                onClick={this.proceed_with_enrollment}
                className={`btn full-width text-light theme-bg short_description-white`}
              >
                Proceed with enrollment
              </span>
            ) : (
              <span
                type="span"
                onClick={this.find_other_courses}
                className={`btn full-width text-light theme-bg short_description-white`}
              >
                Find other courses
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
