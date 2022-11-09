import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import FormatCell from "./cells/FormatCell";

const Intraday = ({ rowData }) => {
  const gridRef = useRef();

  const columnDefs = [
    {
      headerName: "CHANGE IN OI",
      field: "oichange",
    },
    {
      headerName: "CALL",
      field: "call",
      cellRenderer: FormatCell,
      cellRendererParams: {
        type: "CE",
      },
    },
    {
      headerName: "PUT",
      field: "put",
      cellRenderer: FormatCell,
      cellRendererParams: {
        type: "PE",
      },
    },
    {
      headerName: "Observation",
      field: "observation",
    },
  ];

  return (
    <div
      className="ag-theme-balham mb-4"
      style={{ width: "50%", height: "200px" }}
    >
      <AgGridReact
        ref={gridRef}
        enableCellChangeFlash={true}
        rowData={[...rowData]}
        columnDefs={columnDefs}
        defaultColDef={{ width: 235, suppressMovable: true }}
        // onGridReady={onGridReady}
      />
    </div>
  );
};

export default Intraday;
