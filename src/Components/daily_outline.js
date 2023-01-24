import React from "react";
import { next_quarter } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import { domain } from "../Constants/constants";
import { emitter } from "../Neovacity";
import Lecture_url from "./lecture_url";
import Lecture_video from "./lecture_video";

class Daily_outline extends React.Component {
  constructor(props) {
    super(props);

    this.state = { past: true };
  }

  componentDidMount = async () => {
    let {
      enrolled,
      in_update,
      outline,
      weekindex,
      in_week,
      week,
      date,
      course,
      set,
    } = this.props;

    enrolled &&
      date &&
      emitter.emit("daily_outline", { date, week, course, outline });

    if (in_update && date) {
      if (in_update.getTime() <= date.getTime()) {
        this.setState({ past: false });
      } else this.setState({ past: true });
    } else if (!date && weekindex > in_week) this.setState({ past: false });

    set = set || next_quarter().curr_entry.str;

    this.past_timeout = setTimeout(async () => {
      let { past } = this.state;
      if (past) {
        let video_url = await post_request("fetch_lecture_video_url", {
          course,
          outline: outline._id || outline.topic,
          set,
        });

        video_url && this.setState({ video_url });
      } else {
        let lecture_url = await post_request("fetch_lecture_url", {
          course,
          outline: outline._id || outline.topic,
          set,
        });

        lecture_url && this.setState({ lecture_url });
      }
    }, 500);
  };

  componentWillUnmount = () => {
    clearTimeout(this.past_timeout);
  };

  toggle_upload_lecture_video = () => this.lecture_video?.toggle();

  toggle_lecture_url = () => this.lecture_url?.toggle();

  set_video_url = (video_url) => video_url && this.setState({ video_url });

  set_lecture_url = (lecture_url) =>
    lecture_url && this.setState({ lecture_url });

  render() {
    let { outline, date, dow, course } = this.props;
    if (!outline) return;
    let { past, video_url, lecture_url } = this.state;

    let { topic, resource } = outline;

    return (
      <div class="liop_wraps_single">
        <div class="lki_813">
          <h6>{(dow && dow.slice(0, 3)) || "Day"}</h6>
          <span>
            {date ? `${date.getDate() || "--"}`.padStart(2, "0") : ""}
          </span>
        </div>
        <div class="bhu_486">
          <h5>{topic}</h5>
          {resource ? (
            <a
              style={{ textDecoration: "none" }}
              href={`${domain}/Files/${resource}`}
              download
            >
              <span>Download Resource</span>
            </a>
          ) : null}

          {past ? (
            <Lecture_video
              video_url={video_url}
              course={course}
              return_video={this.set_video_url}
              outline={outline}
            />
          ) : (
            <Lecture_url
              course={course}
              return_url={this.set_lecture_url}
              lecture_url={lecture_url}
              outline={outline}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Daily_outline;
