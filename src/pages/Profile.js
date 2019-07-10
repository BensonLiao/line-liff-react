import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import man from "../assets/img/man.png";
import liffHelper from "../utils/liffHelper";

export default class Profile extends Component {
  state = {
    profile: { pictureUrl: man }
  };

  componentDidMount() {
    liffHelper.getProfile().then(profile => this.setState({ profile }));
  }

  render() {
    return (
      <div className="page-content">
        <Container>
          <Row>
            <Col lg={3} />
            <Col lg={6}>
              <div>
                <img
                  width="130"
                  className="avatar-img"
                  alt="profile"
                  src={this.state.profile.pictureUrl}
                />
              </div>
              <hr />
              <Form>
                <Form.Group controlId="formGroupUserId">
                  <Form.Label>User ID:</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={this.state.profile.userId}
                  />
                </Form.Group>
                <Form.Group controlId="formGroupDisplayName">
                  <Form.Label>Display Name:</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={this.state.profile.displayName}
                  />
                </Form.Group>
                <Form.Group controlId="formGroupStatusMessage">
                  <Form.Label>Status Message:</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={this.state.profile.statusMessage}
                  />
                </Form.Group>
                <Form.Group controlId="formGroupLIFFInfo">
                  <Form.Label>LIFF Info:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="10"
                    disabled
                    value={JSON.stringify(liffHelper.getLIFFInfo(), "", 2)}
                  />
                </Form.Group>
              </Form>
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
        {/* <div className="col-lg-3" />
        <div className="col-lg-6">
          
        </div>
        <div className="col-lg-3" /> */}
      </div>
    );
  }
}
