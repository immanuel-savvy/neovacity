import React from "react";
import Breadcrumb from "../Components/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { post_request } from "../Assets/js/utils/services";
import Review from "../Components/review";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import { organisation_name } from "../Constants/constants";
import Add_alumni_review from "../Components/forms/add_review_form";

class Testimonials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      page_size: 24,
    };
  }

  componentDidMount = async () => {
    document.title = `Testimonials | ${organisation_name}`;

    let { page_size, page } = this.state;

    let reviews = await post_request("reviews", {
      verified: true,
      skip: page_size * page,
      limit: page_size,
    });

    this.setState({ reviews });
  };

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  render() {
    let { reviews, show_form, review_submitted } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="Testimonials" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb
          page_title="What we did?"
          no_gray
          page_text="Testimonials"
        />

        <div style={{ backgroundColor: "#f7f8f9", paddingTop: 20 }}>
          <div className="container">
            <div className="row justify-content-center">
              {reviews ? (
                reviews.length ? (
                  reviews.map((review) => (
                    <Review testimonials review={review} />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
            <div
              className={
                "d-flex align-items-center justify-content-center py-5"
              }
            >
              {review_submitted ? (
                <span>
                  <Review review={review_submitted} />

                  <div className="alert alert-success" role="alert">
                    Thanks for sending us a review &nbsp;
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                  </div>
                </span>
              ) : (
                <span className="elkios" onClick={this.toggle_form}>
                  <a
                    href="#"
                    className="add_new_btn"
                    data-toggle="modal"
                    data-target="#catModal"
                  >
                    <i className="fas fa-plus-circle mr-1"></i>
                    Add a review
                  </a>
                </span>
              )}
            </div>
            <div className="row justify-content-center">
              {show_form ? (
                <Add_alumni_review
                  toggle={this.toggle_form}
                  on_submit={(review) =>
                    this.setState({ review_submitted: review })
                  }
                />
              ) : null}
            </div>
          </div>
        </div>
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Testimonials;
