import React from "react";
import { to_title } from "../Assets/js/utils/functions";

class Select_filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { selection, on_select } = this.props;
    let { label_text, options, _id } = selection;

    return (
      <div key={_id} class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
        <div class="form-group">
          <label>{to_title(label_text)}</label>
          <div class="smalls">
            <select onChange={on_select} id={_id} class="form-control">
              {options.map((option, index) =>
                option.default ? (
                  <option selected value="">
                    {option.title}
                  </option>
                ) : (
                  <option key={index} value={option.value || option.title}>
                    {to_title(option.title.replace(/_/g, " "))}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Select_filter;
