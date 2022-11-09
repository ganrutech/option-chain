import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center space-x-4">
        <li className="text-blue-500 underline">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="text-blue-500 underline">
          <Link to="/stock-options">Spurts OI</Link>
        </li>
        <li className="text-blue-500 underline">
          <Link to="/nifty-options">Nifty OI</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
