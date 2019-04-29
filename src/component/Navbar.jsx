import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import "../customStyle/bottomNavbar.css";

export const NavbarTop = () => {
  return (
    <React.Fragment>
      {/* <div className="jumbotron text-center" style={{ marginBottom:"0"}}>
<h1>My Locations</h1>
<p>A JS assignment</p> 
</div> */}
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
        <a className="navbar-brand" href="/">
          My Locations
        </a>
        <ul className="navbar-nav  ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/add-category">
              Add Category
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add-location">
              Add Location
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export const NavbarBottom = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom justify-content-center">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link btn btn-outline-success mx-2" href="/">
            <i className="fa fa-list-alt" aria-hidden="true" /> Category
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link btn btn-outline-success mx-2" href="/location">
            <i className="fa fa-map-marker" aria-hidden="true" /> Location
          </a>
        </li>
      </ul>
    </nav>
  );
};
