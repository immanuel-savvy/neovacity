import React from "react";
import Update_lecture_url from "./forms/update_lecture_url";
import Modal from "./modal";

class Lecture_url extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_update_url = () => this.update_url?.toggle();

  render() {
    let { lecture_url, return_url, course, outline } = this.props;

    return (
      <div>
        <span>
          <span onClick={this.toggle_update_url} style={{ cursor: "pointer" }}>
            {lecture_url ? lecture_url.url : "Add Lecture Url"}
          </span>
          {lecture_url ? (
            <a
              target="_blank"
              href={lecture_url.url}
              className="btn btn-action"
            >
              <i className={`fas fa-link`}></i>
            </a>
          ) : null}
        </span>

        <Modal
          centered
          title={`Update lecture url`}
          aria_labelled_by="contained-modal-title-vcenter"
          ref={(update_url) => (this.update_url = update_url)}
        >
          <Update_lecture_url
            course={course}
            return_url={(url) => {
              return_url && return_url(url);
              this.toggle_update_url();
            }}
            lecture_url={lecture_url}
            outline={outline}
          />
        </Modal>
      </div>
    );
  }
}

export default Lecture_url;
