import React from "react";
import { to_title } from "../../Assets/js/utils/functions";

class Toggle_form_btn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { hide, title, on_click } = this.props;
    return hide ? null : (
      <div>
        <div class="elkios" onClick={on_click}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>
            {to_title(title)}
          </a>
        </div>
      </div>
    );
  }
}

export default Toggle_form_btn;
