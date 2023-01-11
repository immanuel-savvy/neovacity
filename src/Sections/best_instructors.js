import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { domain } from "../Constants/constants";
import Explore_more_btn from "../Components/explore_more_btn";

class Best_instructors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  render() {
    let { best_instructors_stuffs, about } = this.props;

    let { heading, text, bullets, image } = best_instructors_stuffs || {
      bullets: new Array(
        "Full lifetime access",
        "20+ downloadable resources",
        "Guaranteed Job Placement",
        "Certificate of completion"
      ),
      image: "best_teacher.jpg",
    };

    return (
      <div className={"gray"}>
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
                    <h2 class="mb-3">
                      {heading ||
                        "We Have The Best Instructors Available in The City"}
                    </h2>
                    <p>{text}</p>

                    {bullets
                      ? bullets.map((step, index) => (
                          <div key={index} class="mb-3 mr-4 ml-lg-0 mr-lg-4">
                            <div class="d-flex align-items-center">
                              <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                <i class="fas fa-check"></i>
                              </div>
                              <h6 class="mb-0 ml-3">{step}</h6>
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