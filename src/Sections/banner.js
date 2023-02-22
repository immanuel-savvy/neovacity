import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { domain } from "../Constants/constants";
import Preview_image from "../Components/preview_image";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { banner_stuffs } = this.props;
    let { image, thumbnail, thumbnail_hash } = banner_stuffs || new Object();

    return (
      <div
        className="hero_banner d-flex justify-content-center image-cover for_top_info"
        style={{
          backgroundColor: "#0478bd",
          backgroundImage: `url(${domain}/Images/${
            image || "neovacity_africa_banner_background_image.jpg"
          })`,
          backgroundRepeat: "no-repeat",
          marginTop: "80px",
        }}
        data-overlay="8"
      >
        <Container>
          <Row className="align-items-center mb-2">
            <Col xl={6} lg={6} md={6} sm={12}>
              <div
                className="simple-search-wrap text-left"
                style={{
                  linearGradient: "reform",
                  paddingHorizontal: "50px",
                  borderRadius: "25px",
                }}
              >
                <div className="hero_search-2">
                  <div className="elsio_tag">RAISING GLOBAL LEADERS</div>
                  <h1 className="banner_title mb-2">
                    Become a graduate in 1 year
                  </h1>
                  <p className="font-lg mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                  <div class="inline_btn mt-5">
                    <button
                      class="btn_svg slide-in"
                      id="slider_stuff"
                      onClick={() => window.location.assign("#schools")}
                    >
                      <svg
                        width="155px"
                        height="60px"
                        viewBox="0 0 155 60"
                        class="svg border"
                      >
                        <polyline
                          points="179,1 179,59 1,59 1,1 179,1"
                          class="bg-line"
                        />
                        <polyline
                          points="179,1 179,59 1,59 1,1 179,1"
                          class="hl-line"
                        />
                      </svg>
                      <a className="btn btn-bg btn-md text-white">
                        Get Started
                      </a>
                    </button>

                    <a
                      href="#how_it_works"
                      class="mt-2 btn text-light pl-sm-0 ml-3"
                    >
                      <span class="esli_vd">
                        <i class="fa fa-play"></i>
                      </span>
                      How It Works?
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              style={
                {
                  // display: thumbnail ? "inline" : "none",
                  // overflow: "hidden",
                  // height: "2%",
                }
              }
              xl={6}
              lg={6}
              md={6}
              sm={12}
            >
              <div class="side_block">
                <Preview_image image={thumbnail} image_hash={thumbnail_hash} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
