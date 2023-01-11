import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Contact_message from "./contact_message";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let messages = await post_request("contact_messages");

    this.setState({ messages });
  };

  render() {
    let { messages } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="contact messages" />

        <div class="row">
          {messages ? (
            messages.length ? (
              messages.map((msg) => (
                <Contact_message message={msg} key={msg._id} />
              ))
            ) : (
              <Listempty text="You do not have any message yet." />
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_messages;
