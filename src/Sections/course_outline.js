import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Weekly_outline from "../Components/weekly_outline";

class Course_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { course } = this.props;
    let curriculum = await get_request(`curriculum/${course._id}`);

    curriculum = curriculum.sort((c1, c2) => c1.created - c2.created);

    this.setState({ curriculum });
  };

  render() {
    let { curriculum } = this.state;

    return (
      <div class="col-lg-8 col-md-12 order-lg-first">
        {curriculum ? (
          curriculum.map((weeks) => {
            return weeks.weeks.map((week, index) => (
              <Weekly_outline
                index={index}
                week={week}
                key={week && week._id}
              />
            ));
          })
        ) : (
          <Loadindicator contained />
        )}
      </div>
    );
  }
}

export default Course_outline;
