import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { domain } from "../Constants/constants";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { banner_stuffs } = this.props;
    let { image, thumbnail } = banner_stuffs || new Object();

    return (
      <div
        className="hero_banner d-flex justify-content-center image-cover for_top_info"
        style={{
          backgroundColor: "gray",
          backgroundImage: `url(${domain}/Images/${
            image || "neoafrica_banner_background_image.jpg"
          })`,
          backgroundRepeat: "no-repeat",
          marginTop: "50px",
        }}
        data-overlay="1"
      >
        <Container style={{ height: 400, overflow: "auto" }} id="banner_video">
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
                  <div className="elsio_tag">RAISING GLOBALSTARS</div>
                  <h1 className="banner_title mb-2">
                    Become a graduate in 1 year
                  </h1>
                  <p className="font-lg mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                  <div class="inline_btn mt-5">
                    <a href="#" class="btn theme-bg btn-md text-white">
                      Get Started
                    </a>
                    <a href="#" class="btn text-dark pl-sm-0 ml-3">
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
              style={{
                display: thumbnail ? "inline" : "none",
                overflow: "hidden",
                height: "2%",
              }}
              xl={6}
              lg={6}
              md={6}
              sm={12}
            >
              <div class="side_block">
                <img src="assets/img/h-5.png" class="img-fluid" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
