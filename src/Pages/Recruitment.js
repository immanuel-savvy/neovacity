import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Components/breadcrumb";
import Contact_sidebar from "../Components/contact_sidebar";
import Hire_graduate from "../Components/hire_graduate";
import Modal from "../Components/modal";
import Alumni_reviews from "../Sections/alumni_reviews";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Recruitment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_hire_graduate = () => this.hire_graduate?.toggle();

  render() {
    return (
      <div id="main-wrapper">
        <Header page="recruitment" />
        <div className="clearfix"></div>
        <Breadcrumb page_text="Recruitment" page_title="Recruitment" />

        <section>
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                <div className="lmp_caption">
                  <span className="theme-cl">Recruitment</span>
                  <h2 className="mb-3">Let's provide you with talents</h2>

                  <p style={{ textAlign: "justify" }}>
                    Neovacity Africa is set to produce 3000 Tech Talents that
                    have gone through twelve (12) months of intensive trainings
                    from Real-World Experts. Our curriculum is designed to
                    provide quality Technical Training to ensure that our
                    Graduates are well-rounded in their fields and prepared for
                    employment.
                  </p>

                  <h6 className="mt-5">
                    Why hire a Neovacity Africa Graduate?
                  </h6>

                  <div className="prt_body mb-5">
                    <ul>
                      <li>
                        <h6>Expert Training</h6>
                      </li>

                      <li>
                        <h6>Strong Technical Knowledge</h6>
                      </li>

                      <li>
                        <h6>Real-World Applicable Skills</h6>
                      </li>
                    </ul>
                  </div>

                  <p style={{ textAlign: "justify" }}>
                    We take our Graduates through a <b>Project-Based</b>{" "}
                    learning experiences which includes theoretical knowledge
                    and practical Real-Life applications.
                  </p>

                  <p style={{ textAlign: "justify" }}>
                    Neovacity Africa Graduates are trained with up-to-date
                    insights about the industry/selected career tracks, by
                    mentors who are subject matter and industry experts.
                  </p>

                  <br />

                  <div className="text-left mt-4">
                    <span
                      onClick={this.toggle_hire_graduate}
                      style={{ cursor: "pointer" }}
                      className="btn btn-md text-light theme-bg"
                    >
                      Hire Our Graduates!
                    </span>
                  </div>
                </div>
              </div>
              <Contact_sidebar />
            </div>
          </div>
        </section>

        <Alumni_reviews />
        <Footer />

        <Modal ref={(hire_graduate) => (this.hire_graduate = hire_graduate)}>
          <Hire_graduate toggle={this.toggle_hire_graduate} />
        </Modal>
      </div>
    );
  }
}

export default Recruitment;
