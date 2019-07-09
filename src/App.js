import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import SendMessage from "./pages/SendMessage";
import LIFFWindow from "./pages/LIFFWindow";
import Header from "./pages/components/Header";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h3 className="app-title">React LIFF Boilerplate</h3>
        </header>
        <Header />
        <HashRouter basename="/">
          <div>
            <Route exact path="/" component={Profile} />
            <Route path="/message" component={SendMessage} />
            <Route path="/window" component={LIFFWindow} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
