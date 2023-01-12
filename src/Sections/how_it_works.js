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
        title: "Find Courses",
        explanation:
          "We have helped over 3,400 new students to get into the most popular tech teams.",
      },
      {
        title: "Book Your Seat",
        explanation:
          "We have helped over 3,400 new students to get into the most popular tech teams.",
      },
      {
        title: "Get Certificate",
        explanation:
          "We have helped over 3,400 new students to get into the most popular tech teams.",
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
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
