import React from "react";
import { AgGridReact } from "ag-grid-react";

import FormatSymbol from "../cells/FormatSymbol";

const Bearish = ({ state }) => {
  const columnDefsBearish = [
    {
      headerName: "Loosers",
      flex: 1,
      field: "symbol",
      cellRenderer: FormatSymbol,
      cellRendererParams: {
        type: "bearish",
        result: true,
      },
    },
  ];

  return (
    <div
      className="ag-theme-balham mb-4 result-table"
      style={{ width: "100%", height: "500px" }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.bearStock}
        columnDefs={columnDefsBearish}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
        }}
      />
    </div>
  );
};

export default Bearish;
