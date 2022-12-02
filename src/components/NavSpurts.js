import React from "react";
import { Link } from "react-router-dom";

const NavSpurts = () => {
  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.querySelector("#mobile");
    if (element) {
      const location = element.offsetTop;

      window.scrollTo({
        left: 0,
        top: location - 56,
      });
    }
  };

  return (
    <nav>
      <ul className="flex items-center space-x-4">
        <li className="text-blue-500 underline">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="text-blue-500 underline">
          <Link to="/stock-options">Spurts OI</Link>
        </li>

        <li className="text-green-600 font-bold underline">
          <Link to="/stock-options" onClick={handleScroll}>
            SCROLL
          </Link>
        </li>

        {/* <li>
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
        </li> */}
        {/* <li>
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
        </li> */}
      </ul>
    </nav>
  );
};

export default NavSpurts;
