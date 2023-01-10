import React from "react";

class How_it_work extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { how_it_work, active } = this.props;
    let { title, explanation } = how_it_work;

    return (
      <div class="col-lg-4 col-md-4 col-sm-6">
        <div class={"wrk_grid" + (active ? " active" : "")}>
          <div class="wrk_grid_ico">
            <i class="fa fa-search-location"></i>
          </div>
          <div class="wrk_caption">
            <h4>{title}</h4>
            <p>{explanation}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default How_it_work;
