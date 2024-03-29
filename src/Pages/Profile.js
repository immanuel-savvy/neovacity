import React from "react";
import { Link } from "react-router-dom";
import { get_request } from "../Assets/js/utils/services";
import Featured_course from "../Components/course";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import { Logged_user } from "../Contexts";
import Contact_us_today from "../Sections/contact_us_today";
import Profile_header from "../Sections/dashboard/profile_header";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let courses = await get_request(`get_student_courses/${this.user._id}`);

    this.setState({ courses });
  };

  set_upcoming_lecture = (date, course, outline) => {
    // let { upcoming_lecture } = this.state;
    // if (!upcoming_lecture) upcoming_lecture = { date, course, outline };
    // else {
    //   let { date: date_ } = upcoming_lecture;
    //   if (date_.getTime() > new Date().getTime()) {
    //   }
    // }
    // this.setState({ upcoming_lecture });
  };

  render() {
    let { courses, upcoming_lecture } = this.state;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          if (!loggeduser) return null;

          this.user = loggeduser;

          return (
            <div id="main-wrapper">
              <Header page="profile" />
              <div className="clearfix"></div>
              <Profile_header
                user={loggeduser}
                // upcoming_lecture={upcoming_lecture}
                courses_enrolled={courses && courses.length}
              />

              <section className="gray">
                <div className="container">
                  <div className="row justify-content-center">
                    {courses ? (
                      courses.length ? (
                        courses.map((course) => (
                          <Featured_course
                            course={course.course}
                            enrolled={this.set_upcoming_lecture}
                          />
                        ))
                      ) : (
                        <div>
                          <Listempty text="No courses enrolled yet" />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <Link
                              to="/schools"
                              className="btn theme-bg btn-md text-white"
                            >
                              Find Courses
                            </Link>
                          </div>
                        </div>
                      )
                    ) : (
                      <Loadindicator contained />
                    )}
                  </div>
                </div>
              </section>

              <Contact_us_today />
              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Profile;
