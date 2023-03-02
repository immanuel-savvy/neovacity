import React from "react";
import { domain } from "../Constants/constants";

class Best_instructors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { best_instructors_stuffs } = this.props;

    let { heading, text, bullets, image } = best_instructors_stuffs || {
      bullets: new Array(
        "Relevant Updated Curriculum",
        "Guaranteed Assistance with Job Search",
        "Best Instructors in the City- Industry Leaders",
        "Project-Based Exams- with Real world Application",
        "4 Semesters Only with Short break inbetween",
        "Innovative Professional Diploma (Pro-Diploma)",
        "Globally recognized Certificate of Completion",
        "No delaying Strikes/Industrial Actions"
      ),
      image: "best_teacher.jpg",
    };

    return (
      <div
        className={"gray"}
        style={{
          color: "#fff",
          background:
            "linear-gradient(to right, #19338b, rgba(25, 51, 139, 1))",
        }}
      >
        {/* {best_instructors_stuffs ? (
          <div className="row justify-content-center mt-5">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>Our Instructors</h2>
                <p>We have the best instructors in the Africa.</p>
              </div>
            </div>
          </div>
        ) : null} */}
        {image ? (
          <section class="imageblock pt-m-0">
            <div class="imageblock__content">
              <div
                class="background-image-holder"
                style={{ backgroundImage: `url(${domain}/Images/${image})` }}
              ></div>
            </div>
            <div class="container">
              <div class="row align-items-center justify-content-between">
                <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                  <div class="lmp_caption">
                    <h2 class="mb-3 text-light">{heading || "Features"}</h2>
                    <p>{text}</p>

                    {bullets
                      ? bullets.map((step, index) => (
                          <div key={index} class="mb-3 mr-4 ml-lg-0 mr-lg-4">
                            <div class="d-flex align-items-center">
                              <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                <i class="fas fa-check"></i>
                              </div>
                              <h6
                                style={{ textTransform: "none" }}
                                class="mb-0 ml-3 text-light"
                              >
                                {step}
                              </h6>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
}

export default Best_instructors;
