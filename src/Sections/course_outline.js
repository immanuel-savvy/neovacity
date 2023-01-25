import React from "react";
import { next_quarter } from "../Assets/js/utils/functions";
import { get_request } from "../Assets/js/utils/services";
import { sorted_dow } from "../Components/forms/update_curriculum";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Weekly_outline from "../Components/weekly_outline";
import { dow_index } from "../Constants/constants";

class Course_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = { curriculum: "fetching" };
  }

  componentDidMount = async () => {
    let { course } = this.props;
    let curriculum = await get_request(`curriculum/${course._id}`);

    this.setState({ curriculum });
  };

  start_date = (curriculum) => {
    if (!curriculum || curriculum === "fetching") return;

    let { curr_entry } = next_quarter();
    let { dow, weeks } = curriculum;
    dow = dow.sort((d1, d2) => sorted_dow.indexOf(d1) - sorted_dow.indexOf(d2));

    let dt = 1;
    let date = new Date(`${curr_entry.month}-${dt}-${curr_entry.year}`);

    for (let i = 0; i < 7; i++) {
      if (dow_index[Number(date.getDay())] === dow[0]) break;
      date = new Date(`${curr_entry.month}-${dt + i}-${curr_entry.year}`);
    }

    return date;
  };

  leap_months = new Array(8, 3, 5, 10);

  calculate_date_from_weeks_interval = (date_object, w) => {
    date_object = new Date(date_object);

    let date = date_object.getDate();

    let next_date = date + w * 7;

    let max_date = this.leap_months.includes(date_object.getMonth())
      ? 30
      : date_object.getMonth() === 1
      ? 28
      : 31;

    if (next_date > max_date) {
      next_date = next_date - max_date;
      let next_month = date_object.getMonth() + 1;

      for (let i = 0; i < 12; i++) {
        max_date = this.leap_months.includes(next_month)
          ? 30
          : date_object.getMonth() === 1
          ? 28
          : 31;

        if (next_date <= max_date) {
          break;
        }
      }

      date_object = new Date(
        `${next_month + 1}-${next_date}-${date_object.getFullYear()}`
      );
    } else {
      date_object = new Date(
        `${
          date_object.getMonth() + 1
        }-${next_date}-${date_object.getFullYear()}`
      );
    }

    return date_object;
  };

  render() {
    let { enrolled, course } = this.props;
    let { curriculum } = this.state;
    let date = this.start_date(curriculum);

    return (
      <div className="col-lg-8 col-md-12 order-lg-first">
        {!curriculum ? (
          <Listempty text="No outline yet" />
        ) : curriculum === "fetching" ? (
          <Loadindicator contained />
        ) : (
          curriculum.weeks.map((week, index) => (
            <Weekly_outline
              date={this.calculate_date_from_weeks_interval(date, index)}
              index={index}
              enrolled={enrolled}
              week={week}
              course={course._id}
              dow={curriculum.dow}
              key={week && week._id}
            />
          ))
        )}
      </div>
    );
  }
}

export default Course_outline;
