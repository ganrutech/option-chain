import React from "react";
import { AgGridReact } from "ag-grid-react";
import FormatSymbol from "../cells/FormatSymbol";
import CsvButton from "../common/CsvButton";
import { generateCsvData } from "../common/utils";

const Bullish = ({ state }) => {
  const columnDefsBullish = [
    {
      headerName: "Gainers",
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
      <CsvButton
        csvData={[[""], ...generateCsvData(state.bullish)]}
        filename={"top-gainers.csv"}
      />
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
