import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import UploadImage from "./components/upload-image.component";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/upload" className="navbar-brand">Yelp Restaurant Search</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/upload" className="nav-link">Upload Image</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/upload" component={UploadImage} />
        </div>
      </Router>
    );
  }
}

export default App;
