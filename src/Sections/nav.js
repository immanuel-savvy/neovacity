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
import { client_domain, domain } from "../Constants/constants";
import { Nav_context } from "../Contexts";
import { emitter } from "../Neovacity";
import { scroll_to_top } from "../Pages/Home";

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

  handle_course = (course) => {
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);
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
      <Nav_context.Consumer>
        {({ navs, set_subnav, submenus, load_subnavs, subnavs }) => {
          this.navs = navs;
          this.set_subnav = set_subnav;

          // if (current_subnav && !submenus[current_subnav._id])
          //   load_subnavs(current_subnav);

          return (
            <div id="navigation" className="navigation navigation-landscape">
              <Navbar dark expand="lg">
                <NavbarBrand href="/" className="nav-brand">
                  <h2 style={{ color: "#000" }}>Neovacity</h2>
                  {/* <img
                    src={`${domain}/Images/giit_africa_logo_white.png`}
                    className="logo"
                    id="logo_white"
                    alt=""
                  />
                  <img
                    src={`${domain}/Images/giit_africa_logo_blue.png`}
                    className="logo"
                    id="logo_blue"
                    style={{ display: "none" }}
                    alt=""
                  /> */}
                </NavbarBrand>
                <NavbarToggler
                  style={{ color: "#000" }}
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
                              !comp.context.isOpen && comp.context.toggle();
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
                                  onMouseOver={
                                    subnav.view_all
                                      ? null
                                      : () =>
                                          this.setState(
                                            { current_subnav: subnav },
                                            this.set_submenu
                                          )
                                  }
                                >
                                  <Link
                                    onClick={subnav.on_click}
                                    to={
                                      subnav.view_all ? "/courses" : subnav.path
                                    }
                                  >
                                    {subnav.view_all
                                      ? "View all courses..."
                                      : to_title(
                                          subnav.title.replace(/_/g, " ")
                                        )}
                                  </Link>
                                  {nav.title !==
                                  "courses" ? null : subnav.submenu &&
                                    !subnav.submenu
                                      .length ? null : subnav._id ===
                                    (current_subnav && current_subnav._id) ? (
                                    <UncontrolledDropdown
                                      key={index}
                                      nav
                                      inNavbar
                                      onClick={subnav.on_click}
                                    >
                                      <DropdownToggle
                                        style={{
                                          backgroundColor: "transparent",
                                        }}
                                        nav
                                        caret
                                        ref={(dropdown) =>
                                          (this[`dropdown_${index}`] = dropdown)
                                        }
                                        onMouseOver={
                                          subnav.view_all
                                            ? null
                                            : () => {
                                                let comp =
                                                  this[`dropdown_${index}`];
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
                                              (sub_nav) => (
                                                <li
                                                  onClick={() =>
                                                    this.handle_course(sub_nav)
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      "transparent",
                                                  }}
                                                  key={sub_nav._id}
                                                >
                                                  <Link to="/course">
                                                    {sub_nav.title.replace(
                                                      /_/g,
                                                      " "
                                                    )}
                                                  </Link>
                                                </li>
                                              )
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
                          <li>
                            <Link
                              to="/login"
                              className="alio_green"
                              data-toggle="modal"
                              data-target="#login"
                            >
                              <i className="fas fa-sign-in-alt mr-1"></i>
                              <span className="dn-lg">Log In</span>
                            </Link>
                          </li>
                        </ul>
                      ) : nav.path === "/signup" ? (
                        <ul className="nav-menu nav-menu-social align-to-right mb-3">
                          <li className="add-listing theme-bg">
                            <Link to="/signup" className="text-white">
                              Get Started
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        <NavItem>
                          <NavLink
                            style={{
                              backgroundColor: "transparent",
                            }}
                          >
                            <Link
                              style={{ textDecorationColor: "none" }}
                              to={nav.path}
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
            </div>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Custom_nav;
