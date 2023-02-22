import React from "react";
import { default as Modal_ } from "react-bootstrap/Modal";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  toggle = () => this.setState({ show: !this.state.show });

  render() {
    let {
      children,
      on_hide,
      style,
      aria_labelled_by,
      backdrop,
      keyboard,
      size,
      title,
      centered,
      header_color,
    } = this.props;
    let { show } = this.state;

    return (
      <Modal_
        size={size}
        scrollable
        show={show}
        centered={centered}
        backdrop={backdrop}
        keyboard={keyboard !== null ? keyboard : null}
        fullscreen="sm-down"
        aria-labelledby={aria_labelled_by}
        onHide={() => {
          this.toggle();
          on_hide && on_hide();
        }}
      >
        {title ? (
          <Modal_.Header style={{ color: header_color, ...style }} closeButton>
            {title ? (
              <Modal_.Title
                style={style ? { color: "#fff" } : null}
                id={aria_labelled_by}
              >
                {title}
              </Modal_.Title>
            ) : null}
          </Modal_.Header>
        ) : null}
        <Modal_.Body style={{ ...style }}>{children}</Modal_.Body>
      </Modal_>
    );
  }
}

export default Modal;
