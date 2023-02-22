import React from "react";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    let { date } = this.props;
    this.state = {
      date,
    };
  }

  aday = 60 * 60 * 24;
  anhour = 60 * 60;
  amin = 60;

  componentDidMount = () => {
    let { date } = this.state;
    this.set_interval = setInterval(() => {
      let now = new Date();

      let ntime = now.getTime();
      let dtime = date.getTime();

      let diff = parseInt((dtime - ntime) / 1000);

      let days = parseInt(diff / this.aday);
      diff -= this.aday * days;

      let hours = parseInt(diff / this.anhour);
      diff -= this.anhour * hours;

      let minutes = parseInt(diff / this.amin);
      diff -= this.amin * minutes;

      this.setState({ hours, days, minutes, seconds: diff });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.set_interval);
  };

  clean_figure = (value) => {
    return (value || "0").toString().padStart(2, "0");
  };

  render() {
    let { days, hours, minutes, seconds } = this.state;
    return (
      <div>
        <span>{`Days : Hrs : Mins : Secs`}</span>
        <br />
        <span style={{ fontWeight: "bold" }}>{`${this.clean_figure(
          days
        )} : ${this.clean_figure(hours)} : ${this.clean_figure(
          minutes
        )} : ${this.clean_figure(seconds)}`}</span>
      </div>
    );
  }
}

export default Countdown;
