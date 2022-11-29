import React from "react";
import { Link } from "react-router-dom";

const NavSpurts = () => {
  return (
    <nav>
      <ul className="flex items-center space-x-4">
        <li className="text-blue-500 underline">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="text-blue-500 underline">
          <Link to="/stock-options">Spurts OI</Link>
        </li>
        <li>
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.nseindia.com/api/live-analysis-oi-spurts-underlyings",
                "_blank"
              )
            }
          >
            Spurts URL
          </span>
        </li>
        <li>
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.nseindia.com/api/live-analysis-variations?index=gainers",
                "_blank"
              )
            }
          >
            Top Gainers
          </span>
        </li>
        <li>
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.nseindia.com/api/live-analysis-variations?index=loosers",
                "_blank"
              )
            }
          >
            Top Loosers
          </span>
        </li>
        <li>
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.nseindia.com/api/live-analysis-oi-spurts-contracts",
                "_blank"
              )
            }
          >
            Spurts Contracts
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default NavSpurts;
