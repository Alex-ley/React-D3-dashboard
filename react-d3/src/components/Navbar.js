import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Navbar = (props) => {

  return (
    <nav>
    <div className="nav-wrapper light-blue darken-4" id="nav_wrapper">
      <div className="container left-align">
        <Link className="brand-logo" id="nav_logo" to="/"><i className="material-icons">equalizer</i>Dashboard</Link>
        <NavLink to="#" data-target="mobile-sidenav" className="sidenav-trigger"><i className="material-icons">menu</i></NavLink>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to='' >Randomize</NavLink></li>
          <li><NavLink to='' >Refresh</NavLink></li>
        </ul>
      </div>
    </div>
      <div className="mobile-links">
      </div>
    </nav>
  )
}

export default Navbar;
