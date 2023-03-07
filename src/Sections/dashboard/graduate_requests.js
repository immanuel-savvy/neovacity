import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Dropdown_menu from "../dropdown_menu";
import Graduate_request from "../graduate_request";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

const request_types = new Array("unresolved", "resolved");

class Graduate_requests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 15,
      request_type: request_types[0],
    };
  }

  fetch_requests = async () => {
    let { limit, page, request_type } = this.state;
    let graduate_requests = await post_request(
      "get_request_to_hire_graduates",
      {
        limit,
        skip: (page - 1) * limit,
        resolved: request_type === request_types[0] ? false : true,
      }
    );

    this.setState({ graduate_requests });
  };

  componentDidMount = async () => {
    await this.fetch_requests();
  };

  render() {
    let { graduate_requests, request_type } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="graduate requests"
          right_btn={
            <Dropdown_menu
              items={request_types.map(
                (res) =>
                  new Object({
                    title: res,
                    action: () =>
                      this.setState({ request_type: res }, this.fetch_requests),
                  })
              )}
              button={React.forwardRef(({ onClick }, ref) => {
                return (
                  <div
                    class="dropdown show"
                    ref={ref}
                    onClick={(e) => {
                      e.preventDefault();
                      onClick(e);
                    }}
                  >
                    <a
                      class="btn btn-filter dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="selection">{to_title(request_type)}</span>
                    </a>
                  </div>
                );
              })}
            />
          }
        />
        <div class="row">
          {graduate_requests ? (
            graduate_requests.length ? (
              graduate_requests.map((request) => (
                <Graduate_request request={request} key={request._id} />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Graduate_requests;
