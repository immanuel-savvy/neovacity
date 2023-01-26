import React from "react";
import { to_title } from "../Assets/js/utils/functions";
import { dow_index_inverse, month_index } from "../Constants/constants";
import Daily_outline from "./daily_outline";

class Weekly_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  calculate_daily_date = (date, dow, index) => {
    if (!index) return date;
    else if (dow && !dow[index]) return;

    return !dow
      ? new Date()
      : new Date(
          `${date.getMonth() + 1}-${
            date.getDate() +
            (dow_index_inverse[dow[index]] - dow_index_inverse[dow[0]])
          }-${date.getFullYear()}`
        );
  };

  render() {
    let { week, dow, enrolled, course, index, date } = this.props;

    if (!week) return;

    return (
      <div class="liop_wraps">
        <div class="liop_wraps_01">
          <h6>{`Week 0${index + 1}`}</h6>
          <span>
            {date
              ? `${date.getDate().toString().padStart(2, "0")}-${to_title(
                  month_index[date.getMonth()]
                )}`
              : ""}
          </span>
        </div>
        <div class="liop_wraps_list">
          {week && week.lectures
            ? week.lectures.map((lecture, index) => (
                <Daily_outline
                  date={this.calculate_daily_date(date, dow, index)}
                  outline={lecture}
                  key={index}
                  in_course
                  course={course}
                  week={week._id}
                  enrolled={enrolled}
                  dow={dow && dow[index]}
                  weekindex={index}
                  index={index}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Weekly_outline;
