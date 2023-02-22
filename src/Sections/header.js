import React from "react";
import Nav from "./nav";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    let { page, navs, lock } = this.props;

    return (
      <div
        className={
          page === "home" || !page
            ? "header header-transparent dark-text my_header_style_init"
            : "header header-light head-shadow my_header_style_init"
        }
      >
        <div
          id="top_info"
          className="top-bar-area address-two-lines text-light"
          style={{ backgroundColor: "#19338b", letterSpacing: 1 }}
        >
          <div className="container pt-2">
            <div className="row">
              <div className="col-md-12 col-sm-12 address-info">
                <ul
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "space-between",
                    color: "#fff",
                  }}
                >
                  <li>
                    <span style={{ color: "#fff" }}>
                      <i className="fas fa-map"></i>
                    </span>
                    &nbsp; 18, Afolabi Aina Street, Allen Avenue, Ikeja, Lagos{" "}
                  </li>
                  <li>
                    <span style={{ color: "#fff" }}>
                      <i className="fas fa-envelope-open"></i>
                    </span>
                    &nbsp; info@neovacityafrica.com{" "}
                  </li>
                  <li>
                    <span style={{ color: "#fff" }}>
                      <i className="fas fa-phone"></i>
                    </span>
                    &nbsp; +234 8033027439,
                  </li>
                  <li>
                    <span style={{ color: "#fff" }}>
                      <i className="fab fa-whatsapp"></i>
                    </span>
                    &nbsp;
                    <a
                      href="https://wa.me/+2348033027439/?text=Hello,%20I%20like%20to%20enquire%20about%20GIIT%20courses%20and%20training?"
                      target="_blank"
                      style={{ color: "#fff" }}
                    >
                      +234 8033027439
                    </a>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Nav navs={navs} lock={lock} ref="nav" />
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default Header;
