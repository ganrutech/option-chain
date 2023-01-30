import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

import { ACTIONS } from "../StockOptions";
import FormatINR from "../cells/FormatINR";
import _ from "lodash";

const TopGainer = ({ state, dispatch }) => {
  useEffect(() => {
    try {
      axios
        .get(
          "https://www.nseindia.com/api/live-analysis-variations?index=gainers"
        )
        .then((res) => {
          const resp = res.data.FOSec.data;

          dispatch({
            type: ACTIONS.INITIAL,
            payload: {
              topGainer: _.filter(resp, (o) => o.ltp > 100).slice(0, 5),
              // topGainer: resp.slice(0, 5),
              // topGainer: _.orderBy(resp, ["turnover"], ["desc"]),
              timestamp: res.data.timestamp,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnDefsGainers = [
    {
      field: "symbol",
      headerName: "Top Gainers",
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
        rowData={state.topGainer}
        columnDefs={columnDefsGainers}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
          width: "185",
        }}
      />
    </div>
  );
};

export default TopGainer;
