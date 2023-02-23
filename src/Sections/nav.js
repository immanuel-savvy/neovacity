import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { to_title } from "../Assets/js/utils/functions";
import Loadindicator from "../Components/loadindicator";
import { client_domain } from "../Constants/constants";
import { Logged_user, Nav_context } from "../Contexts";
import { emitter } from "../Neovacity";
import { scroll_to_top } from "../Pages/Home";

const route_prefix = "";

class Custom_nav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      subnavs: new Object(),
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  componentDidMount = async () => {
    window.onscroll = (e) => {
      if (window.scrollY > 200) {
        document.querySelector(".header").classList.add("header-fixed");
        document.getElementById("top_info").style.display = "none";
      } else {
        document.querySelector(".header").classList.remove("header-fixed");
        document.getElementById("top_info").style.display = "block";
      }
    };

    if (!this.loggeduser) {
      let loggeduser = window.sessionStorage.getItem("loggeduser");
      loggeduser && this.set_loggeduser(JSON.parse(loggeduser));
    }
  };

  handle_course = (course) => {
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);

    window.location.assign(`${client_domain}/course`);
  };

  search = () => {
    let { search_param } = this.state;
    window.location.assign(
      `${client_domain}/courses?search_param=${search_param}`
    );
    scroll_to_top();
  };

  render() {
    let { current_subnav, current_nav, show_search, search_param } = this.state;

    return (
      <Logged_user.Consumer>
        {({ loggeduser, logout, set_loggeduser }) => {
          this.set_loggeduser = set_loggeduser;
          this.loggeduser = loggeduser;
          if (this.loggeduser === "fetching") this.loggeduser = null;

          return (
            <Nav_context.Consumer>
              {({ navs, set_subnav, submenus, load_subnavs, subnavs }) => {
                this.navs = navs;
                this.set_subnav = set_subnav;

                return (
                  <div
                    id="navigation"
                    className="my_header my_header-fixed navigation navigation-landscape"
                  >
                    <Navbar sticky="top" light expand="lg">
                      <NavbarBrand href={`/`} className="nav-brand">
                        <img
                          src={require(`../Assets/img/neovacity_africa_logo.png`)}
                          className="logo"
                          id="logo_white"
                          alt=""
                        />
                      </NavbarBrand>
                      <NavbarToggler
                        style={{ color: "#fff" }}
                        onClick={this.toggle}
                      />
                      <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav
                          className="ml-auto"
                          navbar
                          style={{ alignItems: "center" }}
                        >
                          {navs.map((nav, index) => {
                            return nav.submenu && nav.submenu.length ? (
                              <UncontrolledDropdown key={index} nav inNavbar>
                                <DropdownToggle
                                  style={{
                                    backgroundColor: "transparent",
                                  }}
                                  nav
                                  caret
                                  ref={(dropdown) =>
                                    (this[`main_dropdown_${index}`] = dropdown)
                                  }
                                  onMouseOver={() => {
                                    let comp = this[`main_dropdown_${index}`];
                                    !comp.context.isOpen &&
                                      comp.context.toggle();
                                    this.setState({ current_nav: nav.title });
                                  }}
                                  onMouseMove={() => {
                                    let comp = this[`main_dropdown_${index}`];
                                    current_nav !== nav.title &&
                                      comp.context.isOpen &&
                                      comp.context.toggle();
                                  }}
                                >
                                  <span>
                                    {to_title(nav.title.replace(/_/g, " "))}
                                  </span>
                                </DropdownToggle>
                                {current_nav === nav.title ? (
                                  <DropdownMenu
                                    className="nav-dropdown nav-submenu"
                                    end
                                  >
                                    {nav.submenu.map((subnav, index) => (
                                      <li
                                        key={index}
                                        onMouseOver={
                                          subnav.view_all
                                            ? null
                                            : () => {
                                                this.setState(
                                                  { current_subnav: subnav },
                                                  this.set_submenu
                                                );
                                              }
                                        }
                                      >
                                        <Link
                                          onClick={subnav.on_click}
                                          to={`${
                                            subnav.view_all
                                              ? "/courses"
                                              : subnav.path
                                          }`}
                                        >
                                          {subnav.view_all
                                            ? "View all courses..."
                                            : subnav.title.replace(/_/g, " ")}
                                        </Link>
                                        {nav.title !==
                                        "schools" ? null : subnav.submenu &&
                                          !subnav.submenu
                                            .length ? null : subnav._id ===
                                          (current_subnav &&
                                            current_subnav._id) ? (
                                          <UncontrolledDropdown
                                            key={index}
                                            nav
                                            inNavbar
                                            onClick={({ target }) => {
                                              !target.classList.contains(
                                                "sub_sub_nav"
                                              ) && subnav.on_click();
                                            }}
                                          >
                                            <DropdownToggle
                                              style={{
                                                backgroundColor: "transparent",
                                              }}
                                              nav
                                              caret
                                              ref={(dropdown) =>
                                                (this[`dropdown_${index}`] =
                                                  dropdown)
                                              }
                                              onMouseOver={
                                                subnav.view_all
                                                  ? null
                                                  : () => {
                                                      let comp =
                                                        this[
                                                          `dropdown_${index}`
                                                        ];
                                                      !comp.context.isOpen &&
                                                        comp.context.toggle();
                                                    }
                                              }
                                            ></DropdownToggle>
                                            <DropdownMenu
                                              className="nav-dropdown nav-submenu"
                                              end
                                            >
                                              {submenus[subnav._id] ? (
                                                submenus[subnav._id].length ? (
                                                  submenus[subnav._id].map(
                                                    (sub_nav, index) => {
                                                      return (
                                                        <li
                                                          className="sub_sub_nav"
                                                          onClick={({
                                                            target,
                                                          }) => {
                                                            this.handle_course(
                                                              sub_nav
                                                            );
                                                          }}
                                                          style={{
                                                            backgroundColor:
                                                              "transparent",
                                                          }}
                                                          key={index}
                                                        >
                                                          <Link
                                                            className="sub_sub_nav"
                                                            to={`/course`}
                                                          >
                                                            {sub_nav.title.replace(
                                                              /_/g,
                                                              " "
                                                            )}
                                                          </Link>
                                                        </li>
                                                      );
                                                    }
                                                  )
                                                ) : null
                                              ) : (
                                                <Loadindicator />
                                              )}
                                            </DropdownMenu>
                                          </UncontrolledDropdown>
                                        ) : null}
                                      </li>
                                    ))}
                                  </DropdownMenu>
                                ) : null}
                              </UncontrolledDropdown>
                            ) : nav.title === "search" ? (
                              <li
                                onClick={() =>
                                  this.setState({
                                    show_search: !this.state.show_search,
                                  })
                                }
                              >
                                <Link
                                  to="#"
                                  style={{ border: "none" }}
                                  className="btn btn-action"
                                >
                                  <i className="ti-search"></i>
                                </Link>
                              </li>
                            ) : nav.path === "/login" ? (
                              <ul className="nav-menu nav-menu-social align-to-right">
                                <li onClick={this.loggeduser && logout}>
                                  <Link
                                    to={this.loggeduser ? "/" : `/login`}
                                    className="alio_green"
                                    data-toggle="modal"
                                    data-target="#login"
                                  >
                                    <i className="fas fa-sign-in-alt mr-1"></i>
                                    <span className="dn-lg">{`Log ${
                                      this.loggeduser ? "out" : "In"
                                    }`}</span>
                                  </Link>
                                </li>
                              </ul>
                            ) : nav.path === "/signup" ? (
                              this.loggeduser ? (
                                <ul className="nav-menu nav-menu-social align-to-right mb-3">
                                  <li className="add-listing btn-bg">
                                    <Link
                                      to={`/profile`}
                                      className="text-white"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {`${this.loggeduser.firstname} ${this.loggeduser.lastname}`.trim()}
                                    </Link>
                                  </li>
                                </ul>
                              ) : (
                                <ul className="nav-menu nav-menu-social align-to-right mb-3">
                                  <li className="add-listing btn-bg">
                                    <Link to={`/signup`} className="text-white">
                                      Get Started
                                    </Link>
                                  </li>
                                </ul>
                              )
                            ) : (
                              <NavItem>
                                <NavLink
                                  style={{
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  <Link
                                    style={{ textDecorationColor: "none" }}
                                    to={`/${nav.path.slice(1)}`}
                                  >
                                    <span>
                                      {to_title(nav.title.replace(/_/g, " "))}
                                    </span>
                                  </Link>
                                </NavLink>
                              </NavItem>
                            );
                          })}
                        </Nav>
                      </Collapse>
                    </Navbar>
                    {show_search ? (
                      <div className="form-group col-md-6 col-lg-4">
                        <div className="input-with-icon">
                          <input
                            type="text"
                            className="form-control"
                            autoFocus
                            placeholder="Search Your Courses"
                            value={search_param}
                            onKeyUp={async (e) => {
                              if (
                                e.target.value === this.previous_value &&
                                this.previous_value
                              )
                                return this.search(e);
                              this.previous_value = e.target.value;
                            }}
                            onChange={({ target }) =>
                              this.setState({ search_param: target.value })
                            }
                          />
                          <i className="ti-search"></i>
                        </div>
                      </div>
                    ) : null}

                    {/* <Helmet>
                      {new Array(
                        "../Assets/js/jquery.min.js",
                        "../Assets/js/popper.min.js",
                        "../Assets/js/bootstrap.min.js",
                        "../Assets/js/select2.min.js",
                        "../Assets/js/slick.js",
                        "../Assets/js/moment.min.js",
                        "../Assets/js/daterangepicker.js",
                        "../Assets/js/summernote.min.js",
                        "../Assets/js/metisMenu.min.js",
                        "../Assets/js/custom.js",
                        "../Assets/js/my_custom.js"
                      ).map((scr, index) => {
                        return (
                          <script
                            key={index}
                            src={scr}
                            async={true}
                            // type="text/javascript"
                            type="text/babel"
                          />
                        );
                      })}
                    </Helmet> */}
                  </div>
                );
              }}
            </Nav_context.Consumer>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Custom_nav;
export { route_prefix };
