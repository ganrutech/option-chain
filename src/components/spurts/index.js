import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import _ from "lodash";
import { ACTIONS } from "../StockOptions";

import FormatINR from "../cells/FormatINR";

const SpurtsTable = ({ state, dispatch }) => {
  useEffect(() => {
    const conditionalArray = ["FINNIFTY", "BANKNIFTY", "NIFTY", "MIDCPNIFTY"];
    try {
      axios
        .get("https://www.nseindia.com/api/live-analysis-oi-spurts-underlyings")
        .then((res) => {
          // const resp = _.orderBy(res.data.data, ["volume"], ["desc"]);
          const resp = res.data.data;
          // _.orderBy(resp, ["volume"], ["desc"])

          dispatch({
            type: ACTIONS.INITIAL,
            payload: {
              spurts: _.filter(resp, function (o) {
                if (
                  o.symbol !== conditionalArray[0] &&
                  o.symbol !== conditionalArray[1] &&
                  o.symbol !== conditionalArray[2] &&
                  o.symbol !== conditionalArray[3]
                ) {
                  return o;
                }
              }).slice(0, 10),
              // spurts: _.orderBy(resp, ["volume"], ["desc"]),
              timestamp: res.data.timestamp,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnDefs = [
    {
      field: "symbol",
      headerName: "OI Spurts",
    },
    {
      field: "avgInOI",
      cellRenderer: FormatINR,
    },
  ];

  return (
    <div
      className="ag-theme-balham mb-4"
      style={{ width: "100%", height: "500px" }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.spurts}
        columnDefs={columnDefs}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
          width: "185",
        }}
      />
    </div>
  );
};

export default SpurtsTable;
