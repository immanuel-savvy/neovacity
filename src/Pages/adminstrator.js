import React from "react";
import { emitter } from "../Giit";
import Contact_us_today from "../Sections/contact_us_today";
import Dashboard_navbar from "../Sections/dashboard/dashboard_navbar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { Logged_admin } from "../Contexts";
import Admin_login from "../Sections/dashboard/admin_login";

const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

class Adminstrator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current_nav: "dashboard" };
  }

  script_paths = new Array(
    "../Assets/js/raphael.min.js",
    "../Assets/js/morris.min.js",
    "../Assets/js/morris.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    document.title = "Dashboard | Globalstar Innovative Information Technology";

    this.script_paths.map((script_path) => this.append_script(script_path));

    emitter.listen("dash_nav_click", this.dash_nav_click);
    emitter.listen("edit_instructor", this.edit_instructor);
    emitter.listen("edit_course", this.edit_course);
    emitter.listen("edit_article", this.edit_article);

    document.title =
      "Adminstrator | Globalstar Innovative Information Technology";
  };

  componentWillUnmount = () => {
    emitter.remove_listener("edit_instructor", this.edit_instructor);
    emitter.remove_listener("edit_course", this.edit_course);
    emitter.remove_listener("dash_nav_click", this.dash_nav_click);
  };

  nav_et_component = () => new Object({});

  render() {
    let { current_nav } = this.state;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged, log_admin }) => {
          return admin_logged ? (
            <div id="main-wrapper">
              <Header page="dashboard" />
              <div className="clearfix"></div>
              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <Dashboard_navbar admin={admin_logged} />
                    {this.nav_et_component()[current_nav]}
                  </div>
                </div>
              </section>

              <Contact_us_today />
              <Footer />
            </div>
          ) : (
            <Admin_login log_admin={log_admin} />
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Adminstrator;
export { scroll_to_top };
