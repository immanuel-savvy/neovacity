import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";

class Contact_message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seen: this.props.message.seen,
    };
  }

  mark_seen = async (_id) => {
    await post_request(`contact_message_seen/${_id}`);

    this.setState({ seen: true });
  };

  remove_message = async (_id) => {
    await post_request(`remove_contact_message/${_id}`);

    this.setState({ removed: true });
  };

  toggle_full_text = () => this.setState({ full_text: !this.state.full_text });

  render() {
    let { full_text, seen, removed } = this.state;
    if (removed) return null;

    let { message } = this.props;
    let { name, email, phone, organisation, _id, text } = message;
    return (
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="dash_crs_cat">
          <a
            onClick={() =>
              window.confirm("Are you sure to remove section? ") &&
              this.remove_message(_id)
            }
            href="#"
            class="remove_tools"
          >
            <i class="fas fa-trash-alt"></i>
          </a>
          <div class="dash_crs_cat_caption">
            <div class="dash_crs_cat_head">
              <h4>{to_title(name)}</h4>
              <span>{to_title(organisation)}</span>
            </div>
            <div
              class="d-flex dash_crs_cat_caption px-3"
              style={{ justifyContent: "center", flexWrap: "wrap" }}
            >
              <span style={{ fontStyle: "italic" }}>{to_title(phone)}</span>
              <span>{to_title(email)}</span>
            </div>
            <div className="mx-5">
              <hr />
            </div>
            <div class="dash_crs_cat_body" onClick={this.toggle_full_text}>
              <p className="mx-3">
                {full_text || text.length <= 300
                  ? text
                  : `${text.slice(0, 300)}...`}
              </p>
            </div>
            <div class="dash_crs_cat_bottom">
              <a
                href="#"
                onClick={() => this.mark_seen(_id)}
                class="btn full-width theme-bg-light theme-cl"
              >
                {seen ? "Seen" : "Mark as Seen"}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact_message;
