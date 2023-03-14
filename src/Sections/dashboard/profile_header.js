import React from "react";
import Preview_image from "../../Components/preview_image";

class Profile_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { user, courses_enrolled: courses_enrolled_ } = this.props;
    if (!user) return;

    let {
      image,
      image_hash,
      running_courses,
      courses_enrolled,
      lectures_taken,
      firstname,
      bio,
      lastname,
    } = user;

    courses_enrolled = courses_enrolled_ || courses_enrolled;

    return (
      <div className="ed_detail_head">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="authi_125">
                <div className="authi_125_thumb">
                  <Preview_image
                    image={
                      image ||
                      require("../../Assets/img/user_image_placeholder.png")
                    }
                    image_hash={image_hash}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  {/* <div className="crs_cates cl_1">
                    <span>Web Design</span>
                  </div>
                  <div className="crs_cates cl_3">
                    <span>PHP</span>
                  </div> */}
                  <div className="ed_header_caption">
                    <h2 className="ed_title">{`${firstname} ${lastname}`}</h2>
                    <ul>
                      <li>
                        <i className="ti-calendar"></i>
                        {`${running_courses || 0} Running Courses`}
                      </li>
                      <li>
                        <i className="ti-calendar"></i>
                        {`${courses_enrolled || 0} Courses Enrolled`}
                      </li>
                      <li>
                        <i className="ti-control-forward"></i>
                        {`${lectures_taken || 0} Lectures Taken`}
                      </li>
                    </ul>
                  </div>
                  <div className="ed_header_short">
                    {bio ? (
                      <p>
                        {`${bio}`}{" "}
                        <a href="#" className="theme-cl">
                          Read More..
                        </a>
                        .
                      </p>
                    ) : (
                      <a
                        onClick={() =>
                          this.setState({
                            toggle_add_bio: !this.state.toggle_add_bio,
                          })
                        }
                        style={{ cursor: "pointer" }}
                        className="text-dark"
                      >
                        Add Your Bio
                      </a>
                    )}
                  </div>
                </div>
                <div className="dlkio_last">
                  <div className="ed_view_link">
                    {running_courses ? (
                      <a href="#" className="btn theme-bg enroll-btn">
                        Next Class<i className="ti-angle-right"></i>
                      </a>
                    ) : null}
                    <a href="#" className="btn theme-border enroll-btn">
                      Find more courses<i className="fas fa-share"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile_header;
