import React from "react";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Neovacity";
import Contact_us_today from "../Sections/contact_us_today";
import Featured_course from "../Components/course";
import Course_sidebar from "../Components/course_sidebar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { scroll_to_top } from "./Adminstrator";
import Course_banner from "../Components/course_banner";
import Alumni_reviews from "../Sections/alumni_reviews";

class School extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let school = window.sessionStorage.getItem("school");
    scroll_to_top();

    if (school) {
      school = JSON.parse(school);

      this.setState({ school });
    }

    this.push_school = (school) => {
      if (school._id === this.state.school._id) return;
      scroll_to_top();

      this.setState({ school });
    };

    emitter.listen("push_school", this.push_school);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("push_school", this.push_school);
  };

  render() {
    let { navs } = this.props;
    let { school } = this.state;
    if (!school) return <Loadindicator contained />;

    let { courses } = school;

    return (
      <div id="main-wrapper">
        <Header page="school" navs={navs} />
        <div class="clearfix"></div>

        <Course_banner school={school} />

        <section class="gray pt-3">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-lg-8 col-md-12 order-lg-first">
                <div class="row justify-content-center">
                  {courses ? (
                    courses.map((course_) => (
                      <Featured_course
                        in_courses
                        course={course_}
                        key={course_._id}
                      />
                    ))
                  ) : (
                    <Loadindicator contained />
                  )}
                </div>
              </div>

              <Course_sidebar school={school} />
            </div>
          </div>
        </section>

        <Alumni_reviews />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default School;
