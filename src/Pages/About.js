import React from "react";
import Breadcrumb from "../Components/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Trusted_by from "../Sections/trusted_by";
import Best_instructors from "../Sections/best_instructors";
import { Link } from "react-router-dom";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Alumni_reviews from "../Sections/alumni_reviews";
import { client_domain, organisation_name } from "../Constants/constants";
import Onboarding from "../Sections/onboarding";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `About | ${organisation_name}`;

    let about_statement = await get_request("about_statement");
    console.log(about_statement);
    this.setState({ about_statement });
  };

  render() {
    let { navs } = this.props;
    let { about_statement } = this.state;

    if (!about_statement || (about_statement && !about_statement.text))
      about_statement = {
        text: `Irure ad consequat proident officia eiusmod nostrud. Nostrud cillum voluptate veniam voluptate ad proident cillum nulla aute exercitation duis enim est. Lorem nisi id reprehenderit eiusmod amet nulla labore eiusmod enim sint sunt. Non ad Lorem exercitation minim occaecat in irure ut ullamco mollit sint officia deserunt.`,
      };

    return (
      <div id="main-wrapper">
        <Header navs={navs} page="about" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="Who we are?" page_text="About Us" />

        {about_statement && about_statement.text ? (
          <section>
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                  <div className="lmp_caption">
                    <span className="theme-cl">About Us</span>
                    <h2 className="mb-3">What We Do & Our Aim</h2>
                    {about_statement.text.split("\n").map((text, index) => (
                      <p style={{ textAlign: "justify" }} key={index}>
                        {text}
                      </p>
                    ))}
                    <br />

                    <div className="text-left mt-4">
                      <Link
                        to="/courses"
                        className="btn btn-md text-light theme-bg"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                  <div className="lmp_thumb">
                    <img
                      src={require(`../Assets/img/logo_badge.png`)}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Loadindicator contained />
        )}

        <Best_instructors />
        <Onboarding />
        <Trusted_by />
        <Alumni_reviews />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default About;
