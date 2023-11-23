import React from "react";
import { AgGridReact } from "ag-grid-react";
import FormatSymbol from "../cells/FormatSymbol";

const Bullish = ({ state }) => {
  const columnDefsBullish = [
    {
      headerName: "Bullish",
      flex: 1,
      field: "symbol",
      cellRenderer: FormatSymbol,
      cellRendererParams: {
        result: true,
      },
    },
  ];

  return (
    <div
      id="mobile"
      className="ag-theme-balham mb-4 result-table"
      style={{ width: "100%", height: "500px" }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.bullish}
        columnDefs={columnDefsBullish}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
        }}
      />
    </div>
  );
};

export default Bullish;
