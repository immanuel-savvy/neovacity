import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import { emitter } from "../../Neovacity";

class Add_trustee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_logo = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => this.setState({ file, logo: reader.result });
  };

  set_name = ({ target }) => this.setState({ name: target.value });

  set_url = ({ target }) => this.setState({ url: target.value });

  add = async () => {
    let { logo, url, name } = this.state;

    let org = { logo, url, name };
    let res = await post_request("add_trusted_by", org);
    org._id = res._id;
    org.created = res.created;
    org.logo = res.logo;

    emitter.emit("new_trusted_by", org);

    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { logo, url, name } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Trusted By</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times-circle"></i>
                </span>
              </button>
            </div>

            <div className="modal-body">
              <form className="forms_block">
                <div className="form-group smalls">
                  <label>Logo (400 x 110)*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={this.handle_logo}
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose Logo
                    </label>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    {logo ? (
                      <img
                        className="py-3"
                        style={{
                          maxHeight: 200,
                          maxWidth: 200,
                          resize: "both",
                        }}
                        src={this.state.logo}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="form-group smalls">
                  <label>Organisation Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_name}
                    value={name}
                  />
                </div>
                <div className="form-group smalls">
                  <label>Organisation Url</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_url}
                    value={url}
                  />
                </div>

                <div className="form-group smalls">
                  <button
                    onClick={name && logo && this.add}
                    type="button"
                    className={`btn full-width ${
                      name && logo ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    Add Organisation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_trustee;
