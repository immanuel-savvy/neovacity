import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Trustee from "../Components/trustee";

class Trusted_by extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let trustees = await get_request("trusted_by");

    this.setState({ trustees });
  };

  render() {
    let { trustees } = this.state;

    return trustees && trustees.length ? (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Trusted By{" "}
                  <span className="theme-cl">{trustees.length || ""}</span>
                </h2>
                <p></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {trustees ? (
              trustees.map((trustee) => (
                <Trustee key={trustee._id} trustee={trustee} />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    ) : null;
  }
}

export default Trusted_by;
