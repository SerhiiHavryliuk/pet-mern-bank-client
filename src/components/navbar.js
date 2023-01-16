import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
        <img style={{"width" : 25 + '%'}} src="https://api.lvivtech.com/companies/49/image/1633093535_ET%20logo%20no%20gradient.pngg"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Banks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/calculator">
                Calculator
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create">
                <button type="button" className="btn btn-primary" >Add bank</button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
