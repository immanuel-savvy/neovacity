import React from "react";
import { emitter } from "../Neovacity";
import Contact_us_today from "../Sections/contact_us_today";
import Admin_login from "../Sections/dashboard/admin_login";
import Manage_schools from "../Sections/dashboard/manage_schools";
import Dashboard_landing from "../Sections/dashboard/dashboard_landing";
import Dashboard_navbar from "../Sections/dashboard/dashboard_navbar";
import Manage_admins from "../Sections/dashboard/manage_admins";
import Manage_courses from "../Sections/dashboard/manage_courses";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { Logged_admin } from "../Contexts";
import Manage_trusted_by from "../Sections/dashboard/manage_trustees";
import Manage_reviews from "../Sections/dashboard/manage_reviews";
import New_article from "../Sections/dashboard/new_article";
import Manage_articles from "../Sections/dashboard/manage_articles";
import Create_newsletter from "../Sections/dashboard/create_newsletter";
import Manage_newsletters from "../Sections/dashboard/manage_newsletters";
import Manage_subscribers from "../Sections/dashboard/manage_subscribers";
import Manage_messages from "../Sections/dashboard/manage_messages";
import Pending_reviews from "../Sections/dashboard/pending_reviews";
import Manage_alumni_overview from "../Sections/dashboard/manage_alumni_overview";
import Manage_onboarding from "../Sections/dashboard/manage_onboarding";
import Manage_best_instructors_section from "../Sections/dashboard/manage_best_instructors_section";
import Manage_faqs from "../Sections/dashboard/manage_faqs";
import About_statement from "../Sections/dashboard/about_statement";
import Add_course from "../Sections/dashboard/add_course";
import Add_admin from "../Sections/dashboard/add_admin";

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

  nav_et_component = () =>
    new Object({
      dashboard: <Dashboard_landing />,
      manage_courses: <Manage_courses />,
      add_course: <Add_course course={this.state.course} />,
      manage_schools: <Manage_schools />,
      manage_admins: <Manage_admins />,
      add_admin: <Add_admin />,
      FAQs: <Manage_faqs />,
      onboarding: <Manage_onboarding />,
      trusted_by: <Manage_trusted_by />,
      best_instructors: <Manage_best_instructors_section />,
      create_newsletter: <Create_newsletter />,
      manage_newsletters: <Manage_newsletters />,
      subscribers: <Manage_subscribers />,
      messages: <Manage_messages />,
      about_statement: <About_statement />,
      manage_reviews: <Manage_reviews />,
      alumni_overview: <Manage_alumni_overview />,
      pending_reviews: <Pending_reviews />,
      new_article: <New_article article={this.state.article} />,
      manage_articles: <Manage_articles />,
    });

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
