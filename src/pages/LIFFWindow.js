import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import liffHelper from "../utils/liffHelper";

export default class LIFFWindow extends Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = this.setTextInputRef.bind(this);
    this.openLIFFWindow = this.openLIFFWindow.bind(this);
    this.openLIFFWindowExternal = this.openLIFFWindowExternal.bind(this);
  }

  setTextInputRef = element => {
    this.textInput = element;
  };

  openLIFFWindow() {
    liffHelper.openWindow(this.textInput.value, false);
  }

  openLIFFWindowExternal() {
    liffHelper.openWindow(this.textInput.value, true);
  }

  closeWindow() {
    liffHelper.closeWindow();
  }

  render() {
    return (
      <div className="page-content">
        <Container>
          <Row>
            <Col lg={3} />
            <Col lg={6}>
              <label htmlFor="url">URL:</label>
              <InputGroup className="mb-3">
                <FormControl
                  ref={this.setTextInputRef}
                  defaultValue="https://www.google.com"
                />
              </InputGroup>
            </Col>
            <Col lg={3} />
          </Row>
          <br />
          <Row>
            <Col lg={3} />
            <Col lg={6}>
              <Button variant="secondary" onClick={this.openLIFFWindow}>
                Open in LINE Browser
              </Button>
            </Col>
            <Col lg={3} />
          </Row>
          <br />
          <Row>
            <Col lg={3} />
            <Col lg={6}>
              <Button variant="secondary" onClick={this.openLIFFWindowExternal}>
                Open in External Browser
              </Button>
            </Col>
            <Col lg={3} />
          </Row>
          <Row>
            <Col lg={3} />
            <Col lg={6}>
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
