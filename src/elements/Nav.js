import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import './Nav.css';

const Nav = () => {
  var linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <>
      <nav className="bg-gray-800">
        <ul>
          <li className = "nav">
            <Link style={linkStyle} to="/">Home</Link>
          </li>
          <li className = "nav">
            <Link  style={linkStyle} to="/specialty">Drug By Specialty</Link>
          </li>
          <li className = "nav">
            <Link  style={linkStyle} to="/levelofcare">By Level Of Care</Link>
          </li>
        </ul>
      </nav>
      
      <Outlet />
    </>
  )
};

export default Nav;