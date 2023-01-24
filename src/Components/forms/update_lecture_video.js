import React from "react";
import { next_quarter } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../handle_image_upload";
import Loadindicator from "../loadindicator";
import Video from "../video";

class Update_lecture_video extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { video_url } = this.props;
    this.state = { ...video_url };

    if (video_url) {
      this.state.thumbnail_image = video_url.thumbnail;
      this.state.thumbnail_image_hash = video_url.thumbnail_hash;
    }
  }

  submit = async () => {
    let { video, thumbnail_image, thumbnail_image_hash, _id, uploading } =
      this.state;
    let { course, outline, return_result } = this.props;

    if (uploading) return;

    this.setState({ uploading: true });

    let set = next_quarter().curr_entry.str;

    let video_url = {
      course,
      outline: outline._id || outline.topic,
      set,
      video,
      thumbnail: thumbnail_image,
      thumbnail_hash: thumbnail_image_hash,
      _id,
    };

    let res = await post_request(
      _id ? "lecture_video_update" : "lecture_video_upload",
      video_url
    );

    video_url._id = res._id;
    video_url.created = res.created;

    return_result && return_result(video_url);
  };

  render() {
    let {
      thumbnail_image,
      thumbnail_image_hash,
      uploading,
      video,
      thumbnail_image_loading,
      thumbnail_image_name,
      _id,
    } = this.state;

    return (
      <div>
        {video || thumbnail_image ? (
          <Video
            url={video}
            thumbnail={thumbnail_image}
            thumbnail_hash={thumbnail_image_hash}
          />
        ) : null}

        <div className="form-group smalls">
          <label>Video URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://www.youtube.com/watch?v=ExXhmuH-cw8"
            value={video}
            onChange={({ target }) => this.setState({ video: target.value })}
          />
        </div>
        <div className="form-group smalls">
          <label>Video Thumbnail</label>
          {thumbnail_image_loading ? (
            <Loadindicator />
          ) : (
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept="image/*"
                onChange={(e) => this.handle_image(e, "thumbnail")}
              />
              <label className="custom-file-label" for="customFile">
                {thumbnail_image_name || "Choose file"}
              </label>
            </div>
          )}
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="form-group">
            {uploading ? (
              <Loadindicator />
            ) : (
              <a
                href="#"
                style={{ color: "#fff" }}
                onClick={(video || thumbnail_image) && this.submit}
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

export default Update_lecture_video;
