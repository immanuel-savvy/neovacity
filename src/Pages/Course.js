import React from "react";
import Course_sidebar from "../Components/course_sidebar";
import Contact_us_today from "../Sections/contact_us_today";
import Course_outline from "../Sections/course_outline";
import Course_stats from "../Sections/course_stats";
import Course_title from "../Sections/course_title";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { emitter } from "../Neovacity";
import { scroll_to_top } from "./Home";
import Loadindicator from "../Components/loadindicator";

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let course = window.sessionStorage.getItem("course");
    scroll_to_top();

    if (course) {
      course = JSON.parse(course);

      this.setState({ course });
    }

    this.push_course = (course) => {
      if (course._id === this.state.course._id) return;
      scroll_to_top();

      this.setState({ course });
    };

    emitter.listen("push_course", this.push_course);

    this.setState({ enrolled: window.location.search.includes("enrolled") });
  };

  componentWillUnmount = () => {
    emitter.remove_listener("push_course", this.push_course);
  };

  render() {
    let { course, enrolled } = this.state;
    if (!course) return <Loadindicator contained />;

    return (
      <div id="main-wrapper">
        <Header page="course" />
        <div class="clearfix"></div>

        <Course_title enrolled={enrolled} course={course} />

        <Course_stats course={course} />
        <section class="gray">
          <div class="container">
            <div class="row">
              <Course_outline enrolled={enrolled} course={course} />

              <Course_sidebar enrolled={enrolled} course={course} />
            </div>
          </div>
        </section>

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Course;
