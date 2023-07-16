import React from "react";
import { AgGridReact } from "ag-grid-react";
import FormatSymbol from "../cells/FormatSymbol";

const Bullish = ({ state }) => {
  const columnDefsBullish = [
    {
      headerName: "Spurts Bullish",
      field: "symbol",
      cellRenderer: FormatSymbol,
    },
  ];

  return (
    <div
      id="mobile"
      className="ag-theme-balham mb-4"
      style={{ width: "100%", height: "500px" }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.bullish}
        columnDefs={columnDefsBullish}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
          width: "370",
        }}
      />
    </div>
  );
};

export default Bullish;
