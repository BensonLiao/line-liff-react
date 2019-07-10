import React, { Component } from "react";
import "./App.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Profile from "./pages/Profile";
import SendMessage from "./pages/SendMessage";
import LIFFWindow from "./pages/LIFFWindow";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h3 className="app-title">React LIFF Boilerplate</h3>
        </header>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab">
          <Tab eventKey="profile" title="Profile">
            <Profile />
          </Tab>
          <Tab eventKey="message" title="SendMessage">
            <SendMessage />
          </Tab>
          <Tab eventKey="window" title="LIFFWindow">
            <LIFFWindow />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
