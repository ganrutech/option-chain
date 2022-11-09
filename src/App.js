import React from "react";
import "./App.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS

import { Route, Routes } from "react-router-dom";

import ViewTable from "./components/ViewTable";
import StockOptions from "./components/StockOptions";
import NiftyStockOptions from "./components/NiftyStockOptions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewTable />} />
      <Route path="/stock-options" element={<StockOptions />} />
      <Route path="/nifty-options" element={<NiftyStockOptions />} />
    </Routes>
  );
}

export default App;
