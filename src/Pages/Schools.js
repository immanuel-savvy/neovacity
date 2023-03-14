import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Breadcrumb from "../Components/breadcrumb";
import Loadindicator from "../Components/loadindicator";
import School from "../Components/school";
import Alumni_reviews from "../Sections/alumni_reviews";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Schools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let schools = await get_request("schools/all");

    this.setState({ schools });
  };

  render() {
    let { schools } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="schools" />
        <Breadcrumb page_title="Find Courses" page_text="Schools" />
        <section class="min">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Our <span class="text-accent">Schools</span>
                  </h2>
                  <p>
                    Learn the in-demand Digital Skills required to take you from
                    beginner to Expert Level in ONE YEAR. NO Degree or prior
                    Tech experience required.
                  </p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              {schools && schools.length ? (
                schools.map((school) => (
                  <School school={school} key={school._id} />
                ))
              ) : (
                <div className="d-flex align-items-center justify-content-center my-5">
                  <Loadindicator />
                </div>
              )}
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

export default Schools;
