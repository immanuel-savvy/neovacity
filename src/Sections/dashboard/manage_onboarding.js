import React from "react";
import {
  domain,
  get_request,
  post_request,
} from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Preview_image from "../../Components/preview_image";
import Video from "../../Components/video";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_onboarding extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {
      steps: new Array(),
      step_index: null,
      step_in_edit: new Object(),
    };
  }

  componentDidMount = async () => {
    let onboarding_stuffs = await get_request("onboarding_stuffs");

    this.setState({ onboarding_stuffs, ...onboarding_stuffs });
  };

  add_step = (e) => {
    e.preventDefault();
    let { step_in_edit, step_index, steps } = this.state;

    if (step_index !== null) {
      steps[step_index] = step_in_edit;
      step_index = null;
    } else steps = new Array(...steps, step_in_edit);

    this.setState({ steps, step_index, step_in_edit: "" });
  };

  edit_step = (index) => {
    let step_in_edit = this.state.steps[index];
    this.setState({ step_in_edit, step_index: index });
  };

  filter_step_index = (index) => {
    let { steps } = this.state;
    steps.splice(index, 1);
    this.setState({ steps });
  };

  submit = async () => {
    let { image_hash, image, video, steps, uploading } = this.state;
    if (uploading) return;
    this.setState({ uploading: true });

    let res = await post_request("handle_onboarding_stuffs", {
      image_hash,
      image,
      steps,
      video,
    });

    this.setState({ uploading: false, video: res.video, image: res.image });
  };

  render() {
    let {
      onboarding_stuffs,
      image_loading,
      uploading,
      image,
      image_hash,
      steps,
      step_in_edit,
      step_index,
      video,
      video_loading,
    } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage onboarding section" />

        <div className="row">
          <div className="justify-content-center">
            {video ? (
              <Video
                style={{ marginBottom: 20 }}
                thumbnail={image}
                thumbnail_hash={image_hash}
                url={
                  video
                    ? video.startsWith("data")
                      ? video
                      : `${domain}/Videos/${video}`
                    : null
                }
                null_video
              />
            ) : (
              <Preview_image image={image} image_hash={image_hash} />
            )}
          </div>
          <form>
            <div class="row">
              <div className="form-group smalls">
                <label>Image (1920 x 1200)</label>
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

              {/* <div className="form-group smalls">
                <label>Video</label>
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
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div> */}

              <hr />

              <div className="form-group smalls">
                <label>Steps</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title..."
                  value={step_in_edit.title}
                  onChange={({ target }) =>
                    this.setState({
                      step_in_edit: {
                        ...this.state.step_in_edit,
                        title: target.value,
                      },
                    })
                  }
                />
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Text..."
                  value={step_in_edit.text}
                  onChange={({ target }) =>
                    this.setState({
                      step_in_edit: {
                        ...this.state.step_in_edit,
                        text: target.value,
                      },
                    })
                  }
                />

                {step_in_edit.title && step_in_edit.text ? (
                  <a
                    onClick={this.add_step}
                    href="#"
                    class="btn theme-bg text-light mt-2"
                  >
                    {step_index === null ? "Add" : "Update"}
                  </a>
                ) : null}
              </div>
              {steps.length ? (
                <ul class="simple-list p-0">
                  {steps.map((step, i) => (
                    <li key={i}>
                      <h5>{step.title}</h5>
                      <p>{step.text}</p>
                      <span
                        className="px-2"
                        onClick={() => this.filter_step_index(i)}
                      >
                        <i className={`fa fa-trash`}></i>
                      </span>
                      <span className="px-2" onClick={() => this.edit_step(i)}>
                        <i className={`fa fa-edit`}></i>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  {uploading ? (
                    <Loadindicator />
                  ) : (
                    <a
                      href="#"
                      style={{ color: "#fff" }}
                      onClick={
                        ((steps && steps.length) || image || image_hash) &&
                        this.submit
                      }
                      class="btn theme-bg btn-md"
                    >
                      {onboarding_stuffs ? "Update" : "Upload"}
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

export default Manage_onboarding;
