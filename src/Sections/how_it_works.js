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
          "Our courses are designed to equip you with relevant knowledge and in-demand skills.",
        icon: "fa-search-location",
        link: "#schools",
      },
      {
        title: "Get certified",
        explanation:
          "We have helped over 3,000 new students acquire skills that make them globally relevant, through our innovative Pro-Diploma Certificate.",
        icon: require("../Assets/img/IMG-20230301-WA0004.jpg"),
        link: "/about",
      },
      {
        title: "Land your dream job",
        explanation:
          "Get the job of your dreams with our 100% assistance and mentorship.",
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
                  <h2 style={{ textTransform: "none" }}>
                    How it <span class="theme-cl">Works?</span>
                  </h2>
                  <p>
                    Get your Globally recognised Degree in <b>ONE YEAR</b>&nbsp;
                    through the most simplified process.
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
