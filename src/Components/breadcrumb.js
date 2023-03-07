import React from "react";
import { Link } from "react-router-dom";

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { page_text, page_title, no_gray } = this.props;

    return (
      <section
        style={{
          ...(page_title === "courses"
            ? new Object({ paddingTop: 30, paddingBottom: 20 })
            : null),
          backgroundImage: `url(${require("../Assets/img/breadcrumb_bg.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "#fff",
        }}
        className={`page-title ${no_gray ? "" : "gray"}`}
        data-overlay="1"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="breadcrumbs-wrap">
                <h1 className="breadcrumb-title text-light">{page_title}</h1>
                <nav className="transparent">
                  <ol className="breadcrumb p-0">
                    <li className="breadcrumb-item text-light">
                      <Link
                        to="/"
                        style={{
                          color: "#fff",
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item text-accent active theme-cl"
                      aria-current="page"
                    >
                      {page_text}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Breadcrumb;
