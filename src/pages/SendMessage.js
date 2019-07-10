import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import swal from "sweetalert2";
import { geolocated } from "react-geolocated";
import liffHelper from "../utils/liffHelper";
import messageHelper from "../utils/messagingApiHelper";

const textOptions = [
  "give me brown",
  "search imgur account",
  "upload to imgur"
];

const datalistId = "text-options";

const messageTypes = [
  {
    key: "text",
    label: "Text",
    editable: true,
    value: ""
  },
  {
    key: "image",
    label: "Image",
    editable: true,
    value:
      "https://developers.line.biz/media/messaging-api/using-line-url-scheme/camera-screen-3c7466e3.png"
  },
  {
    key: "video",
    label: "Video",
    editable: false,
    value:
      "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4"
  },
  {
    key: "audio",
    label: "Audio",
    editable: false,
    value: "https://cdn.online-convert.com/example-file/audio/m4a/example.m4a"
  },
  {
    key: "location",
    label: "Location",
    editable: false,
    value: "Location"
  },
  {
    key: "button",
    label: "Template - Button",
    editable: false,
    value: "Button"
  },
  {
    key: "confirm",
    label: "Template - Confirm",
    editable: false,
    value: "Confirm"
  },
  {
    key: "carousel",
    label: "Template - Carousel",
    editable: false,
    value: "Carousel",
    disabled: true
  },
  {
    key: "image-carousel",
    label: "Template - Image carousel",
    editable: false,
    value: "Image carousel",
    disabled: true
  }
];

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textListKey: ""
    };

    this.textInput = [];
    this.setTextInputRef = (key, element) => {
      this.textInput[key] = element;
    };
  }

  sendMessageToChat(messageKey) {
    let value = this.textInput[messageKey].value;
    let message;
    switch (messageKey) {
      case "text":
        message = messageHelper.createTextMessage(value);
        break;
      case "image":
        message = messageHelper.createImageMessage(value, value);
        break;
      case "video":
        let video =
          "https://www.sample-videos.com/img/Sample-png-image-500kb.png";
        message = messageHelper.createVDOMessage(value, video);
        break;
      case "audio":
        message = messageHelper.createAudioMessage(value, 3600);
        break;
      case "button":
        let actions = [
          {
            type: "uri",
            label: "Google",
            uri: `https://google.com`
          },
          {
            type: "uri",
            label: "Facebook",
            uri: `https://facebook.com`
          }
        ];
        message = messageHelper.createButtonMessageWithImage(
          "Select Page",
          "Send Buttton Demo",
          "https://developers.line.biz/media/messaging-api/using-line-url-scheme/camera-screen-3c7466e3.png",
          actions
        );
        break;
      case "confirm":
        let confirmActions = [
          {
            type: "uri",
            label: "YES",
            uri: `https://google.com`
          },
          {
            type: "uri",
            label: "NO",
            uri: `https://facebook.com`
          }
        ];
        message = messageHelper.createConfirmMessage(
          "Send Message again",
          confirmActions
        );
        break;
      case "location":
        if (
          this.props.isGeolocationAvailable &&
          this.props.isGeolocationEnabled
        ) {
          let lat = this.props.coords.latitude;
          let lng = this.props.coords.longitude;
          message = messageHelper.createLocationMessage(lat, lng);
        } else {
          swal({
            type: "error",
            title: "Send Error",
            text: "Geolocation is not enabled"
          });
        }
        break;
      default:
        message = messageHelper.createTextMessage("ABC");
    }
    if (message) {
      liffHelper
        .sendMessages([message])
        .then(() => {
          swal({
            type: "success",
            title: "Send Message Complete",
            showConfirmButton: false,
            timer: 1000
          });
        })
        .catch(err => {
          swal({
            type: "error",
            title: "Send Error",
            text: err.response.data.message
          });
        });
    }
  }

  getInputElement(messageType) {
    return messageType.key === "text" ? (
      <InputGroup className="mb-3">
        <FormControl
          ref={this.setTextInputRef.bind(this, messageType.key)}
          disabled={!messageType.editable}
          defaultValue={messageType.value}
          list={datalistId}
        />
        <InputGroup.Append>
          <Button
            variant="secondary"
            disabled={messageType.disabled}
            onClick={this.sendMessageToChat.bind(this, `${messageType.key}`)}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    ) : (
      <InputGroup className="mb-3">
        <FormControl
          ref={this.setTextInputRef.bind(this, messageType.key)}
          disabled={!messageType.editable}
          defaultValue={messageType.value}
        />
        <InputGroup.Append>
          <Button
            variant="secondary"
            disabled={messageType.disabled}
            onClick={this.sendMessageToChat.bind(this, `${messageType.key}`)}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  getMobileInputElement(messageType) {
    const { textListKey } = this.state;
    return messageType.key === "text" ? (
      <InputGroup className="mb-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="Select"
          id="input-group-dropdown-1"
          onSelect={key => {
            this.setState({ textListKey: key });
          }}
        >
          {textOptions.map(option => (
            <Dropdown.Item eventKey={option} key={option}>
              {option}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <FormControl
          ref={this.setTextInputRef.bind(this, messageType.key)}
          disabled={!messageType.editable}
          value={textListKey}
          onChange={value => {
            console.log("value", value);
          }}
        />
        <InputGroup.Append>
          <Button
            variant="secondary"
            disabled={messageType.disabled}
            onClick={this.sendMessageToChat.bind(this, `${messageType.key}`)}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    ) : (
      <InputGroup className="mb-3">
        <FormControl
          ref={this.setTextInputRef.bind(this, messageType.key)}
          disabled={!messageType.editable}
          defaultValue={messageType.value}
        />
        <InputGroup.Append>
          <Button
            variant="secondary"
            disabled={messageType.disabled}
            onClick={this.sendMessageToChat.bind(this, `${messageType.key}`)}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  renderMessageTypeKey(isMobileBrowser = false) {
    return messageTypes.map(messageType => (
      <div key={messageType.key}>
        <label htmlFor={`msg_${messageType.key}`}>{messageType.label}:</label>
        {!isMobileBrowser && this.getInputElement(messageType)}
        {isMobileBrowser && this.getMobileInputElement(messageType)}
        {/* note. <datalist> are not supported on some browser */}
        {/* ref: https://caniuse.com/#search=datalist */}
        {/* if in production, it should be handle properly with detect or fallback */}
        {!isMobileBrowser && messageType.key === "text" && (
          <datalist id={datalistId}>
            {textOptions.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </datalist>
        )}
      </div>
    ));
  }

  render() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    console.log("userAgent:", userAgent);
    // Usually when user click a link in LINE it will open an IAB,
    // which limited the compatibility to frontend technologies like
    // native mobile browser.
    // LINE introduced LIFF which use native mobile browser,
    // gives more compatibility to frontend technologies.
    //&& userAgent.toLowerCase().indexOf("android");
    const isInAppBrowser = userAgent.toLowerCase().indexOf("IAB") > -1;
    console.log("isInAppBrowser", isInAppBrowser);
    const isMobileBrowser = userAgent.toLowerCase().indexOf("mobile") > -1;
    console.log("isMobileBrowser", isMobileBrowser);
    return (
      <div className="page-content">
        <Container>
          <Row>
            <Col lg={3} />
            <Col lg={6}>
              {this.renderMessageTypeKey(isMobileBrowser)}
              <hr />
              <Button
                variant="success"
                onClick={() => {
                  liffHelper.closeWindow();
                }}
              >
                Close LIFF
              </Button>
            </Col>
            <Col lg={3} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(SendMessage);

//For later implementation
SendMessage.propTypes = {
  isGeolocationAvailable: PropTypes.bool,
  isGeolocationEnabled: PropTypes.bool,
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  })
};
