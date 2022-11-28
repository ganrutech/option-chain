import React from "react";
import { AgGridReact } from "ag-grid-react";

import FormatSymbol from "../cells/FormatSymbol";

const Bearish = ({ state }) => {
  const columnDefsBearish = [
    {
      headerName: "Bearish",
      field: "symbol",
      cellRenderer: FormatSymbol,
      cellRendererParams: {
        type: "bearish",
      },
    },
  ];

  return (
    <div
      className="ag-theme-balham mb-4"
      style={{ width: "100%", height: "500px" }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.bearStock.slice(0, 5)}
        columnDefs={columnDefsBearish}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
          width: "370",
        }}
      />
    </div>
  );
};

export default Bearish;
