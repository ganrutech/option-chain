import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import _ from "lodash";
import { ACTIONS } from "../StockOptions";

import FormatINR from "../cells/FormatINR";

const TopLoosers = ({ state, dispatch }) => {
  useEffect(() => {
    try {
      axios
        .get(
          "https://www.nseindia.com/api/live-analysis-variations?index=loosers"
        )
        .then((res) => {
          const resp = res.data.FOSec.data;

          dispatch({
            type: ACTIONS.INITIAL,
            payload: {
              topLooser: _.filter(
                resp,
                (o) => o.ltp > 100 && o.ltp < 5000
              ).slice(0, 5),
              // topLooser: resp.slice(0, 5),
              // topLooser: _.orderBy(resp, ["turnover"], ["desc"]),
              // topLooser: _.orderBy(resp, ["perChange"], ["desc"]),
              timestamp: res.data.timestamp,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnDefsLoosers = [
    {
      field: "symbol",
      headerName: "Top Loosers",
    },
    {
      headerName: "Latest Price",
      field: "ltp",
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
        rowData={state.topLooser}
        columnDefs={columnDefsLoosers}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
          width: "185",
        }}
      />
    </div>
  );
};

export default TopLoosers;
