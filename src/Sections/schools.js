import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Explore_more_btn from "../Components/explore_more_btn";
import Loadindicator from "../Components/loadindicator";
import School from "../Components/school";

class Schools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let schools = await get_request("schools/all");

    this.setState({ schools });
  };

  componentWillUnmount = () => {};

  render() {
    let { schools, removed } = this.state;
    if ((schools && !schools.length) || removed) return null;

    return (
      <section class="min" id="schools">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  Our <span class="theme-cl">Schools</span>
                </h2>
                <p>
                  Learn the in-demand Digital Skills required to take you from
                  beginner to Expert Level in <b>ONE YEAR</b>. NO Degree or
                  prior Tech experience required.
                </p>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            {schools && schools.length ? (
              schools.map((school) => (
                <School school={school} key={school._id} />
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                <Loadindicator />
              </div>
            )}
          </div>
        </div>

        {schools && schools.length ? (
          <Explore_more_btn text="View all schools" to="/schools" />
        ) : null}
      </section>
    );
  }
}

export default Schools;
