import React from "react";
import { client_domain } from "../Constants/constants";

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <section class="pt-5">
          <div class="container">
            <div class="row align-items-center justify-content-between">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div class="side_block extream_img">
                  <div class="list_crs_img">
                    <img
                      src={require("../Assets/img/at-1.png")}
                      class="img-fluid elsio cirl animate-fl-y"
                      alt=""
                    />
                    <img
                      src={require("../Assets/img/at-3.png")}
                      class="img-fluid elsio arrow animate-fl-x"
                      alt=""
                    />
                    <img
                      src={require("../Assets/img/at-2.png")}
                      class="img-fluid elsio moon animate-fl-x"
                      alt=""
                    />
                  </div>
                  <img
                    style={{
                      borderRadius: "25%",
                    }}
                    src={require("../Assets/img/sp-2.png")}
                    class="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                <div class="lmp_caption">
                  <ol class="list-unstyled p-0">
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          1
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Create account</h4>
                        <p>
                          Sign up with{" "}
                          <span style={{ textDecoration: "line-through" }}>
                            $25 only
                          </span>{" "}
                          (<b>FREE</b> for first 100 applicants). <br />
                          Take your{" "}
                          <b>
                            <em>Pre-Admission Test</em>
                          </b>
                          , and with a 70% pass mark, you are good to go!
                          Otherwise, attempt test again in a week's time. Test
                          is 20 objectives.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          2
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Make Payment and Get assigned a Course Advisor</h4>
                        <p>
                          Pay a <em>$500</em> dollar course fee (One-off or
                          installment) and get registration details instantly to
                          your email.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          3
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Start Learning</h4>
                        <p>
                          Recieve lectures, tests and other activities through
                          virtual / physical means from your instructors.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          4
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Get Certificate</h4>
                        <p>
                          Earn a Globally Pro-Diploma certificate on completion
                          of real-world project based exams.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Onboarding;
