import React from "react";
import Breadcrumb from "../Components/breadcrumb";
import Faqs from "../Sections/faqs";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class FAQS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="main-wrapper">
        <Header page="enroll" />
        <div className="clearfix"></div>
        <Breadcrumb page_title="FAQS" page_text="Frequently asked questions" />

        <Faqs paged />

        <Footer />
      </div>
    );
  }
}

export default FAQS;
