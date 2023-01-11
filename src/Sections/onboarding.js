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
                      src={`${client_domain}/at-1.png`}
                      class="img-fluid elsio cirl animate-fl-y"
                      alt=""
                    />
                    <img
                      src={`${client_domain}/at-3.png`}
                      class="img-fluid elsio arrow animate-fl-x"
                      alt=""
                    />
                    <img
                      src={`${client_domain}/at-2.png`}
                      class="img-fluid elsio moon animate-fl-x"
                      alt=""
                    />
                  </div>
                  <img
                    style={{
                      borderRadius: "25%",
                    }}
                    src={`${client_domain}/sp-2.png`}
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
                          Oluptatem accusantium doloremque laudantium, totam rem
                          aperiam, eaque ipsa.
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
                        <h4>Join Membership</h4>
                        <p>
                          Error sit voluptatem actium doloremque laudantium,
                          totam rem aperiam, eaque ipsa.
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
                          Error sit voluptatem actium doloremque laudantium,
                          totam rem aperiam, eaque ipsa.
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
                          Unde omnis iste natus error sit voluptatem accusantium
                          doloremque laudantium, totam rem aperiam, eaque ipsa.
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
