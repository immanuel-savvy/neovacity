import React from "react";
import { next_quarter } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../loadindicator";

class Update_lecture_url extends React.Component {
  constructor(props) {
    super(props);

    let { lecture_url } = this.props;

    this.state = { ...lecture_url };
  }

  submit = async () => {
    let { uploading, url, _id } = this.state;
    if (uploading) return;

    let { course, outline, return_url } = this.props;

    let lecture_url = {
      url,
      _id,
      course,
      outline: outline._id || outline.topic,
      set: next_quarter().curr_entry.str,
    };

    let res = await post_request(
      _id ? "update_lecture_url" : "upload_lecture_url",
      lecture_url
    );
    lecture_url._id = res._id;
    lecture_url.created = res.created;

    return_url && return_url(lecture_url);
  };

  render() {
    let { url, _id, uploading } = this.state;

    return (
      <div>
        <div className="form-group smalls">
          <label>Lecture URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://meet.google.com/glc-zjwn-jzy?ku=229"
            value={url}
            onChange={({ target }) => this.setState({ url: target.value })}
          />
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="form-group">
            {uploading ? (
              <Loadindicator />
            ) : (
              <a
                href="#"
                style={{ color: "#fff" }}
                onClick={url && this.submit}
                class="btn theme-bg btn-md"
              >
                {_id ? "Update" : "Submit"}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Update_lecture_url;
