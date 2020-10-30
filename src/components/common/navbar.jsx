import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    const { currentUser } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" class="navbar-brand">
          Vidly App
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/customers" className="nav-link">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/rentals" className="nav-link" href="#">
                Rentals
              </NavLink>
            </li>
            {!currentUser && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" href="#">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" href="#">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {currentUser && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link" href="#">
                    {currentUser.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/logout" className="nav-link" href="#">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
