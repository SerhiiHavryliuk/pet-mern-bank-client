import React from "react";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img style={{"width" : 25 + '%'}} src="https://api.lvivtech.com/companies/49/image/1633093535_ET%20logo%20no%20gradient.pngg"></img>
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <div className="d-flex" >
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
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}
