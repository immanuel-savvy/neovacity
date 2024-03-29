import "./Assets/css/styles.css";
import "./Assets/css/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Emitter from "semitter";
import About from "./Pages/About";
import Forgot_password from "./Pages/Forgot_password";
import Adminstrator from "./Pages/Adminstrator";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Page_not_found from "./Pages/404";
import Index from "./Pages/Home";

import {
  Footer_context,
  Logged_admin,
  Logged_user,
  Nav_context,
} from "./Contexts";
import Contact from "./Pages/Contact";
import FAQS from "./Pages/Faqs";
import Testimonials from "./Pages/Testimonials";
import Blog from "./Pages/Blog";
import { get_request } from "./Assets/js/utils/services";
import School from "./Pages/School";
import Course from "./Pages/Course";
import { client_domain } from "./Constants/constants";
import Article from "./Pages/Article";
import Enroll from "./Pages/Enroll";
import Verify_email from "./Pages/Verify_email";
import Profile from "./Pages/Profile";
import Admission from "./Pages/Admission";
import Corporate_training from "./Pages/Corporate_training";
import Recruitment from "./Pages/Recruitment";
import Partnership from "./Pages/Partnership";
import Schools from "./Pages/Schools";

let emitter = new Emitter();

class Neovacity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submenus: new Object(),
      loggeduser: "fetching",
      subnavs: new Object(),
      navs: new Array(
        {
          title: "search",
          path: "/courses?search=true",
        },
        {
          title: "home",
          path: "/",
        },
        {
          title: "schools",
          path: "/schools",
          submenu: new Array(),
        },
        {
          title: "testimonials",
          path: "/testimonials",
        },
        {
          title: "about",
          path: "/about",
          submenu: new Array(
            {
              title: "Who we are",
              path: "/about",
            },
            {
              title: "Corporate Training",
              path: "/corporate_training",
            },
            {
              title: "Recruitment / Hire",
              path: "/recruitment",
            },
            {
              title: "Partnership",
              path: "/partnership",
            },
            {
              title: "FAQs",
              path: "/faqs",
            }
          ),
        },
        {
          title: "blog",
          path: "/blog",
        },
        {
          title: "contact",
          path: "/contact_us",
        },
        {
          title: "login",
          path: "/login",
        },
        {
          title: "get started",
          path: "/signup",
        }
      ),
    };
  }

  script_paths = new Array();

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  };

  handle_school = (school) => {
    window.sessionStorage.setItem("school", JSON.stringify(school));
    emitter.emit("push_school", school);
    window.location.assign(
      `${client_domain}/school/${school.title.replace(/ /g, "_")}`
    );
  };

  componentDidMount = async () => {
    this.script_paths.map((script_path) => this.append_script(script_path));

    let { banner_stuffs, best_instructors_stuffs, onboarding_stuffs } =
      (await get_request("entry")) || new Object();

    let schools = await get_request("schools/all");

    let { navs, submenus } = this.state;
    navs &&
      navs.map((nav) => {
        if (nav.title === "schools") {
          nav.submenu = schools.map((school) => {
            submenus[school._id] = school.courses;
            return {
              title: school.title,
              path: "/school",
              _id: school._id,
              on_click: () => this.handle_school(school),
            };
          });
          nav.submenu.push({
            title: "View all",
            path: "",
            view_all: true,
          });
        }
      });

    this.restore_logged_admin = (admin) => {
      this.setState({ admin_logged: admin });
    };

    this.setState({
      onboarding_stuffs,
      banner_stuffs,
      best_instructors_stuffs,
      navs,
      submenus,
      schools: new Array(...schools, {
        title: "View all",
        path: "",
        view_all: true,
      }),
    });

    emitter.listen("restore_loggeduser", this.restore_loggeduser);
    emitter.listen("restore_logged_admin", this.restore_logged_admin);
  };

  login = (user) =>
    this.setState({ loggeduser: user }, () =>
      window.sessionStorage.setItem("loggeduser", JSON.stringify(user))
    );

  log_admin = (admin) =>
    this.setState({ admin_logged: admin }, () => {
      window.sessionStorage.setItem("logged_admin", JSON.stringify(admin));
    });

  logout = () =>
    this.setState({ loggeduser: null }, () =>
      window.sessionStorage.removeItem("loggeduser")
    );

  restore_loggeduser = (loggeduser) => this.setState({ loggeduser });

  render = () => {
    let {
      admin_logged,
      banner_stuffs,
      loggeduser,
      subnavs,
      navs,
      schools,
      submenus,
    } = this.state;

    return (
      <Logged_user.Provider
        value={{
          loggeduser,
          logout: this.logout,
          set_loggeduser: this.restore_loggeduser,
          login: this.login,
        }}
      >
        <Logged_admin.Provider
          value={{ admin_logged, log_admin: this.log_admin }}
        >
          <Nav_context.Provider
            value={{
              navs,
              subnavs,
              set_subnav: this.set_subnav,
              load_subnavs: this.load_subnavs,
              submenus,
            }}
          >
            <Footer_context.Provider value={{ schools }}>
              <BrowserRouter>
                <Routes>
                  <Route
                    index
                    path={"/"}
                    element={<Index banner_stuffs={banner_stuffs} />}
                  />
                  <Route path={`adminstrator`} element={<Adminstrator />} />
                  <Route path={`contact_us`} element={<Contact />} />
                  <Route path={`about`} element={<About />} />
                  <Route path={`login`} element={<Login />} />
                  <Route path={`signup`} element={<Signup />} />
                  <Route path={`faqs`} element={<FAQS />} />
                  <Route path={`blog`} element={<Blog />} />
                  <Route path={`admission`} element={<Admission />} />
                  <Route path={`profile`} element={<Profile />} />
                  <Route path={`verify_email`} element={<Verify_email />} />
                  <Route path={`article`} element={<Article />} />
                  <Route path={`school/:school_name`} element={<School />} />
                  <Route path={`course`} element={<Course />} />
                  <Route path={`enroll`} element={<Enroll />} />
                  <Route path={`partnership`} element={<Partnership />} />
                  <Route path={`recruitment`} element={<Recruitment />} />
                  <Route path={`schools`} element={<Schools />} />
                  <Route
                    path={`corporate_training`}
                    element={<Corporate_training />}
                  />
                  <Route
                    path={`forgot_password`}
                    element={<Forgot_password />}
                  />
                  <Route path={`testimonials`} element={<Testimonials />} />
                  <Route path="*" element={<Page_not_found />} />
                </Routes>
              </BrowserRouter>
            </Footer_context.Provider>
          </Nav_context.Provider>
        </Logged_admin.Provider>
      </Logged_user.Provider>
    );
  };
}

export default Neovacity;
export { emitter };
