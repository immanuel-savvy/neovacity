import React from "react";
import Breadcrumb from "../Components/breadcrumb";
import Contact_sidebar from "../Components/contact_sidebar";
import Alumni_reviews from "../Sections/alumni_reviews";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Corporate_training extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: `Equip your staff members for better performance…
    Unlock your Organization’s uniqueness and power with Skills that will make them more effective and relevant in the Work Place, to increase productivity, generate revenue and reduce cost, through our World-Class Training. 
    Neovacity builds capacity for Organizations by impacting them with knowledge, through Training that equip them for greatness. Our Training methodologies foster development of skills that can create Sustainable Performance. We help Organizations and Individuals take control of their Businesses and their Careers.
    We have garnered a good number of Industry Experts as trainers who passionately offer Corporate and personal Online and In-Person Professional Development Training.`.split(
        "\n"
      ),
    };
  }

  render() {
    let { text } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="corporate training" />
        <div className="clearfix"></div>
        <Breadcrumb
          page_text="Corporate Training"
          page_title="Corporate Training"
        />

        <section>
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                <div className="lmp_caption">
                  <span className="theme-cl">Corporate Training</span>
                  <h2 className="mb-3">What We Do & Our Aim</h2>

                  {text.map((txt, index) => (
                    <p key={index} style={{ textAlign: "justify" }}>
                      {txt.trim()}
                    </p>
                  ))}
                  <p>
                    <b>
                      Our Corporate Training are offered at a 20% discount for
                      10 persons and above.
                    </b>
                  </p>
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

export default Corporate_training;
