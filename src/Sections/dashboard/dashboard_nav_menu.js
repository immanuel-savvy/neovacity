import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { default_admin } from "../../Constants/constants";
import { emitter } from "../../Neovacity";
import "bootstrap/dist/css/bootstrap.min.css";

class Dashboard_nav_menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "dashboard",
      navs: new Array(
        {
          title: "dashboard",
          icon: "fa-th",
        },
        {
          title: "courses",
          icon: "fa-shopping-basket",
          subnav: new Array(
            { title: "manage_courses" },
            { title: "add_course" },
            { title: "manage_schools" }
          ),
        },
        {
          title: "admissions",
          icon: "fa-shopping-basket",
          subnav: new Array(
            { title: "manage_exam_questions" },
            { title: "graduate_requests" }
          ),
        },
        {
          title: "about",
          icon: "fa-th",
          subnav: new Array({
            title: "about_statement",
          }),
        },
        {
          title: "trusted_by",
          icon: "fa-th",
        },
        {
          title: "testimonials",
          icon: "fa-th",
          subnav: new Array(
            { title: "manage_reviews" },
            { title: "pending_reviews" },
            { title: "alumni_overview" }
          ),
        },
        {
          title: "blog",
          icon: "fa-th",
          subnav: new Array(
            { title: "manage_articles" },
            { title: "new_article" },
            { title: "manage_categories" }
          ),
        },
        {
          title: "newsletters",
          icon: "fa-envelope",
          subnav: new Array(
            { title: "manage_newsletters" },
            { title: "create_newsletter" },
            { title: "subscribers" }
          ),
        },
        {
          title: "messages",
          icon: "fa-gem",
        },
        {
          title: "sections",
          icon: "fa-th",
          subnav: new Array(
            { title: "onboarding" },
            { title: "best_instructors" },
            { title: "FAQs" }
          ),
        },
        {
          title: "admins",
          icon: "fa-user-shield",
          subnav: new Array(
            { title: "manage_admins" },
            { title: "add_new_admin" }
          ),
        }
      ),
    };
  }

  nav_click = (title) =>
    this.setState({ current_nav: title }, () =>
      emitter.emit("dash_nav_click", title)
    );

  nav_sub_click = (subtitle) =>
    this.setState({ current_nav: subtitle }, () =>
      emitter.emit("dash_nav_click", subtitle)
    );

  render_nav = ({ title, subnav }, index) => {
    let { current_slide_index } = this.state;

    return subnav ? (
      <div key={index}>
        {/* <div
          id="headingOne"
          className="card-header bg-white shadow-sm border-0"
          // onClick={() => console.log("clicked")}
        >
          <h6 className="m-2 accordion_title">
            <a
              href="#"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded={current_slide_index === index ? "true" : "false"}
              aria-controls={`collapse${index}`}
              className="d-block position-relative text-dark collapsible-link py-2"
            >
              {`${to_title(title.replace(/_/g, " "))}`}
            </a>
          </h6>
        </div>
        <div
          id={`collapse${index}`}
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
          className={`collapse ${current_slide_index === index ? "show" : ""}`}
          style={{ margin: 0, marginLeft: 0, padding: 0, paddingRight: 0 }}
        > */}
        <div className="ml-2 mt-4">
          <h6>{title}</h6>
        </div>
        <div>
          {subnav.map(({ title }, index) => (
            <li
              style={{ flexWrap: "wrap", padding: 10, cursor: "pointer" }}
              key={index}
              className={"incomplete" || "complete"}
              onClick={() => this.nav_dash(title)}
            >
              {to_title(title.replace(/_/g, " "))}
            </li>
          ))}{" "}
        </div>
        {/*
        </div> */}
      </div>
    ) : (
      <h6
        key={index}
        className="p-2"
        style={{ cursor: "pointer" }}
        onClick={() => this.nav_dash(title)}
      >
        <a className="d-block position-relative text-dark py-2">{`${to_title(
          title.replace(/_/g, " ")
        )}`}</a>
      </h6>
    );
  };

  nav_dash = (title) => {
    emitter.emit("dash_nav_click", title);
  };

  render = () => {
    let { admin } = this.props;
    let { navs } = this.state;

    return (
      <div id="accordionExample" className="accordion shadow circullum">
        {navs.map((nav, i) =>
          admin && admin._id !== default_admin && nav.title === "admins"
            ? null
            : this.render_nav(nav, i)
        )}
      </div>
    );
  };
}

export default Dashboard_nav_menu;
