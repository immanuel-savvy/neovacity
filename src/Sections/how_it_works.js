import React from "react";
import How_it_work from "../Components/how_it_work";
import Loadindicator from "../Components/loadindicator";

class How_it_works extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let how_it_works = new Array(
      {
        title: "Find Courses and Enroll",
        explanation:
          "Obtain a globally recignised certificate that help you set an undeniable pace.",
        icon: "fa-search-location",
        link: "#schools",
      },
      {
        title: "Get certified",
        explanation:
          "We have helped over 3,000 new students acquire skill that make them globally relevant.",
        icon: "fa-certificate",
        link: "/about",
      },
      {
        title: "Land your dream job",
        explanation: "Get th job of your dreams with our 100% assistance.",
        icon: "fa-trophy",
        link: "/about",
      }
    );

    this.setState({ how_it_works });
  };

  render() {
    let { how_it_works } = this.state;

    return (
      <>
        <section class="min" id="how_it_works">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    How It <span class="theme-cl">Works?</span>
                  </h2>
                  <p>
                    Get your Globally recognised Degree in one year through the
                    most simplified process.
                  </p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center mt-5">
              {how_it_works ? (
                how_it_works.map((work, index) => (
                  <How_it_work
                    how_it_work={work}
                    key={index}
                    index={index}
                    active={index % 2}
                  />
                ))
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>
        </section>
        <div class="clearfix"></div>
      </>
    );
  }
}

export default How_it_works;
