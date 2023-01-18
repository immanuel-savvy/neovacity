import React from "react";
import Loadindicator from "../Components/loadindicator";
import { organisation_name } from "../Constants/constants";
import { Logged_user } from "../Contexts";
import Banner from "../Sections/banner";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Latest_news_and_articles from "../Sections/latest_news_and_articles";
import Alumni_reviews from "../Sections/alumni_reviews";
import Faqs from "../Sections/faqs";
import Modal from "../Components/modal";
import Subscribe from "../Components/subscribe";
import How_it_works from "../Sections/how_it_works";
import Best_instructors from "../Sections/best_instructors";
import Onboarding from "../Sections/onboarding";
import Schools from "../Sections/schools";

const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    if (!window.localStorage.getItem("ask_to_subscribe"))
      this.subscribe?.setState({ show: true });
  };

  render = () => {
    let { navs, banner_stuffs } = this.props;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          if (loggeduser) document.title = `Home | ${organisation_name}`;

          return (
            <div id="main-wrapper">
              <Header navs={navs} />
              <Banner banner_stuffs={banner_stuffs} />
              <How_it_works />
              <Best_instructors />
              <Schools />
              <Onboarding />
              <Alumni_reviews />
              <Latest_news_and_articles />
              <Faqs limit={6} grey />
              <Contact_us_today />
              <Footer />

              <Modal
                title="Subscribe to our newletters."
                on_hide={() =>
                  window.localStorage.setItem("ask_to_subscribe", "true")
                }
                aria_labelled_by="contained-modal-title-vcenter"
                ref={(subscribe) => (this.subscribe = subscribe)}
              >
                <Subscribe toggle={() => this.subscribe?.toggle()} />
              </Modal>
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  };
}

export default Index;
export { scroll_to_top };
