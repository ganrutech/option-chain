import React from "react";
import { AgGridReact } from "ag-grid-react";
import FormatSymbol from "../cells/FormatSymbol";

const Bullish = ({ state }) => {
  const columnDefsBullish = [
    {
      headerName: "Bullish",
      field: "symbol",
      cellRenderer: FormatSymbol,
    },
  ];

  return (
    <div
      className="ag-theme-balham mb-4"
      style={{ width: "100%", height: "500px" }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.bullish.slice(0, 5)}
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
