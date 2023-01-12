import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import School from "../Components/school";

class Schools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { section } = this.props;

    let schools = await get_request("schools/all");
    console.log(schools);

    this.setState({ schools });
  };

  componentWillUnmount = () => {};

  render() {
    let { section, gray } = this.props;
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
            </div>
          </div>

          <div class="row align-items-center">
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
      </section>
    );
  }
}

export default Schools;