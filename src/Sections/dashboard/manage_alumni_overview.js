import React from "react";
import { Col } from "react-bootstrap";
import {
  domain,
  get_request,
  post_request,
} from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Video from "../../Components/video";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_alumni_overview extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = { show_vid: true };
  }

  componentDidMount = async () => {
    let alumni_overview = await get_request("alumni_overview");

    this.setState({ alumni_overview, ...alumni_overview });
  };

  submit = async () => {
    this.setState({ uploading: true });
    let { thumbnail, video, image_hash, image } = this.state;
    thumbnail = image || thumbnail;

    let res = await post_request("update_alumni_overview", {
      thumbnail,
      video,
      image_hash,
    });

    this.setState({ uploading: false });
  };

  render() {
    let {
      uploading,
      video_loading,
      image_loading,
      show_vid,
      alumni_overview,
      thumbnail,
      video,
      image,
    } = this.state;
    image = image || thumbnail;

    let video_ = video;
    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="alumni overview" />

        <div className="row justify-content-center mb-3">
          {(alumni_overview || image || video) && show_vid ? (
            <Col lg={6} md={6} sm={12} className="align-items-center">
              <Video
                url={
                  video_.startsWith("data")
                    ? video_
                    : `${domain}/Videos/${video_}`
                }
                thumbnail={image}
              />
            </Col>
          ) : null}
        </div>
        <hr />
        <div className="row ">
          <form>
            <div class="row">
              <div className="form-group smalls">
                <label>Thumbnail *</label>
                {image_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={this.handle_image}
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div>
              <div className="form-group smalls">
                <label>Video *</label>
                {video_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="video/*"
                      onChange={this.handle_video}
                      control
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
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
                      onClick={video_ && image && this.submit}
                      class="btn theme-bg btn-md"
                    >
                      Update
                    </a>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Manage_alumni_overview;
