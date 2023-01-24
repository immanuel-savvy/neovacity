import React from "react";
import Update_lecture_video from "./forms/update_lecture_video";
import Modal from "./modal";
import Video from "./video";

class Lecture_video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_video_url = () => this.update_video?.toggle();

  toggle_video = () => this.video?.toggle();

  render() {
    let { course, video_url, return_video, outline } = this.props;

    return (
      <div>
        {!video_url ? (
          <span onClick={this.toggle_video_url} style={{ cursor: "pointer" }}>
            Update video URL
          </span>
        ) : (
          /*  video === "fetching" ? (
          <Loadindicator />
        ) : */
          <span>
            {" "}
            <span onClick={this.toggle_video} style={{ cursor: "pointer" }}>
              {video_url.video}
            </span>
            <a onClick={this.toggle_video_url} className="btn btn-action">
              <i className={`fas fa-edit`}></i>
            </a>
          </span>
        )}

        <Modal
          centered
          title={`Update lecture video`}
          aria_labelled_by="contained-modal-title-vcenter"
          ref={(update_video) => (this.update_video = update_video)}
        >
          <Update_lecture_video
            course={course}
            return_result={(video) => {
              return_video && return_video(video);
              this.toggle_video_url();
            }}
            video_url={video_url}
            outline={outline}
          />
        </Modal>

        <Modal
          centered
          title={`Lecture video`}
          aria_labelled_by="contained-modal-title-vcenter"
          ref={(video) => (this.video = video)}
        >
          {video_url ? (
            <Video
              url={video_url.video}
              thumbnail={video_url.thumbnail}
              thumbnail_hash={video_url.thumbnail_hash}
            />
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default Lecture_video;
