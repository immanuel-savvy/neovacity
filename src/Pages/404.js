import React from "react";
import { Link } from "react-router-dom";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Page_not_found extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="main-wrapper">
        <Header page="404" />
        <div class="clearfix"></div>
        <section class="error-wrap">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6 col-md-10">
                <div class="text-center">
                  <img src="../Assets/img/404.png" class="img-fluid" alt="" />
                  <p>
                    "To be globally acclaimed as an innovative organization
                    working towards fulfilling the information technology needs
                    of our clients."
                  </p>
                  <Link class="btn theme-bg text-white btn-md" to="/">
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Page_not_found;
