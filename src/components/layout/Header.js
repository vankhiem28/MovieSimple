import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-center items-center mt-5 gap-x-2 text-gray-500">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
}

export default Header;
