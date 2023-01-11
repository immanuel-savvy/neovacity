import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Neovacity";
import Review from "../../Components/review";
import Add_student_review from "./../../Components/forms/add_review_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await post_request("reviews", { verified: true });

    this.setState({ reviews });

    this.new_alumni_review = (review) => {
      let { reviews } = this.state;
      reviews = new Array(review, ...reviews);
      this.setState({ reviews });
    };

    emitter.listen("new_alumni_review", this.new_alumni_review);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_alumni_review", this.new_alumni_review);
  };

  remove_review = async (review_id) => {
    let { reviews } = this.state;

    reviews = reviews.filter((review) => review._id !== review_id);
    this.setState({ reviews });

    await post_request(`remove_review/${review_id}`);
  };

  toggle_form = () =>
    this.setState({
      show_form: !this.state.show_form,
      review_to_update: null,
    });

  add_new_review_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add Review
          </a>
        </div>
      </div>
    );

  render() {
    let { reviews, show_form, review_to_update } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage reviews"
          on_click={this.toggle_form}
          hide={show_form || !reviews || (reviews && !reviews.length)}
          title="add review"
        />

        <div className="row">
          {show_form ? (
            <div>
              <Add_student_review
                review={review_to_update}
                toggle={this.toggle_form}
                admin
              />
              <hr />
            </div>
          ) : null}

          {reviews ? (
            reviews.length ? (
              reviews.map((review) => (
                <Review
                  review={review}
                  remove={() => this.remove_review(review._id)}
                />
              ))
            ) : (
              <div className="my-5 d-flex justify-content-center">
                <div>
                  <p className="h4">No Reviews yet.</p>
                  <br />
                  {this.add_new_review_btn()}
                </div>
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_reviews;
