import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import _ from "lodash";
import { ACTIONS } from "../StockOptions";

import FormatINR from "../cells/FormatINR";
import FormatSymbol from "../cells/FormatSymbol";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TopLoosers = ({ state, dispatch }) => {
  let queryParams = useQuery();
  const isQuery = queryParams.get("search") === "eq";

  useEffect(() => {
    const defaultUrl =
      "https://www.nseindia.com/api/live-analysis-variations?index=loosers";
    const alternateUrl =
      "https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O";
    const getUrl =
      queryParams.get("search") === "eq" ? alternateUrl : defaultUrl;

    try {
      axios.get(getUrl).then((res) => {
        let resp = [];
        let looserData = [];

        if (isQuery) {
          resp = res.data.data;
        } else {
          resp = res.data.FOSec.data;
        }

        if (isQuery) {
          const filterLooser = _.orderBy(resp, ["pChange"], ["asc"]);
          looserData = [
            ..._.filter(filterLooser, (o) => Number(o.lastPrice) > 100),
          ];
        } else {
          looserData = [..._.filter(resp, (o) => o.ltp > 100)];
        }

        dispatch({
          type: ACTIONS.INITIAL,
          payload: {
            topLooser: [...looserData.slice(0, 10)],
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
      headerName: "S.No",
      valueGetter: "node.rowIndex + 1",
      width: 100,
    },
    {
      field: "symbol",
      headerName: "Top Loosers",
      cellRenderer: FormatSymbol,
      cellRendererParams: {
        type: "bearish",
      },
      flex: 1,
    },
    {
      headerName: "Latest Price",
      field: isQuery ? "lastPrice" : "ltp",
      cellRenderer: FormatINR,
      flex: 1,
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
        }}
      />
    </div>
  );
};

export default TopLoosers;
