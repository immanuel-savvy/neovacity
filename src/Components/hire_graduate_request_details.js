import React from "react";

class Hire_graduate_request_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { details } = this.props;
    let { firstname, desired_role, lastname } = details;

    return (
      <div
        style={{
          textAlign: "center",
          boxShadow: `rgba(0, 0, 0, 0.3) 5px 5px 12px`,
          borderRadius: 20,
          padding: 20,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
        }}
      >
        <p>
          Hello,{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {firstname} {lastname}
          </span>
        </p>
        <p>your request for a graduate for the role of</p>

        <h2 style={{ cursor: "pointer" }}>{desired_role}</h2>
        <p>
          Has been sent to our{" "}
          <a target="_blank" href="mailto://admin@neovacityafrica.com">
            Admin
          </a>
          , we'll get back to you in less than 24 work hrs
        </p>

        <p>Thanks!</p>
      </div>
    );
  }
}

export default Hire_graduate_request_details;
