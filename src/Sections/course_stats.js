import React from "react";
import { gen_random_int, next_quarter } from "../Assets/js/utils/functions";

class Course_stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { course } = this.props;

    let next_entry = next_quarter();

    return (
      <section class="p-0 gray">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="crp_box fl_color ovr_top">
                <div class="row align-items-center">
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                    <div class="dro_140">
                      <div class="dro_141">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <div class="dro_142">
                        <h6>{`New Entry ${next_entry.str}`}</h6>
                        <p
                          style={{ textTransform: "capitalize" }}
                        >{`${next_entry.str} - ${next_entry.next_entry}`}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                    <div class="dro_140">
                      <div class="dro_141 st-1">
                        <i class="fa fa-play"></i>
                      </div>
                      <div class="dro_142">
                        <h6>Lessons</h6>
                        <p>{`${
                          course.lectures || gen_random_int(24, 4)
                        } Lectures`}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                    <div class="dro_140">
                      <div class="dro_141 st-3">
                        <i class="fa fa-user-shield"></i>
                      </div>
                      <div class="dro_142">
                        <h6>Current Students</h6>
                        <p>{`${
                          course.enrollments || gen_random_int(1500, 160)
                        } Students Enrolled`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Course_stats;
