import React from "react";
import Breadcrumb from "../Components/breadcrumb";
import Contact_sidebar from "../Components/contact_sidebar";
import Alumni_reviews from "../Sections/alumni_reviews";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Partnership extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { text } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="corporate training" />
        <div className="clearfix"></div>
        <Breadcrumb page_text="Partnership" page_title="Partnership" />

        <section>
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                <div className="lmp_caption">
                  <span className="theme-cl">Partnership</span>
                  <h2 className="mb-3">What We Do & Our Aim</h2>

                  <p className="text-justify">
                    Contribute to the ongoing technological revolution. We are
                    seeking Sponsors who are interested in empowering
                    individuals to be at the forefront of the rapid Global
                    Change, by equipping them with skills required for
                    exceptionalism in all industry verticals.
                  </p>

                  <h4 className="text-center">For Sponsorship</h4>
                  <b>
                    <p className="text-center">
                      Email:{" "}
                      <a
                        target="_blank"
                        href="mailto://admin@neovacityafrica.com"
                      >
                        admin@neovacityafrica.com
                      </a>
                    </p>
                  </b>
                </div>
              </div>
              <Contact_sidebar />
            </div>
          </div>
        </section>

        <Alumni_reviews />
        <Footer />
      </div>
    );
  }
}

export default Partnership;
