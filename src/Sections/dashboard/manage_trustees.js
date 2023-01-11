import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Neovacity";
import Trustee from "../../Components/trustee";
import Add_trustee from "./add_trustee";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_trustees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_form = () =>
    this.setState({
      show_form: !this.state.show_form,
    });

  add_new_trust_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add Organisation
          </a>
        </div>
      </div>
    );

  componentDidMount = async () => {
    let trusted_by = await get_request("trusted_by");

    this.setState({ trusted_by });

    this.new_trusted_by = (trusted_by_) => {
      let { trusted_by } = this.state;
      trusted_by = new Array(trusted_by_, ...trusted_by);
      this.setState({ trusted_by });
    };

    emitter.listen("new_trusted_by", this.new_trusted_by);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_trusted_by", this.new_trusted_by);
  };

  remove = async (trustee_id) => {
    let { trusted_by } = this.state;
    trusted_by = trusted_by.filter((t) => t._id !== trustee_id);
    this.setState({ trusted_by });

    await post_request(`remove_trustee/${trustee_id}`);
  };

  trustee = (trustee) => {
    return (
      <Trustee
        trustee={trustee}
        key={trustee._id}
        remove={() => this.remove(trustee._id)}
      />
    );
  };

  render() {
    let { trusted_by, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage trusted by"
          on_click={this.toggle_form}
          hide={show_form || !trusted_by || (trusted_by && !trusted_by.length)}
          title="add organisation"
        />
        <div class="row">
          {show_form ? (
            <div>
              <Add_trustee toggle={this.toggle_form} />
              <hr />
            </div>
          ) : null}

          {trusted_by ? (
            trusted_by.length && trusted_by.map ? (
              trusted_by.map((trustee) => this.trustee(trustee))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {this.add_new_trust_btn()}
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_trustees;
