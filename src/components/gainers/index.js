import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

import { ACTIONS } from "../StockOptions";
import FormatINR from "../cells/FormatINR";
import _ from "lodash";
import FormatSymbol from "../cells/FormatSymbol";
import { useLocation } from "react-router-dom";
import CsvButton from "../common/CsvButton";
import { generateCsvData } from "../common/utils";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TopGainer = ({ state, dispatch }) => {
  let queryParams = useQuery();
  const isQuery = queryParams.get("search") === "eq";

  useEffect(() => {
    const defaultUrl =
      "https://www.nseindia.com/api/live-analysis-variations?index=gainers";
    const alternateUrl =
      "https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O";
    const getUrl = isQuery ? alternateUrl : defaultUrl;

    try {
      axios.get(getUrl).then((res) => {
        let resp = [];
        let gainerData = [];

        if (isQuery) {
          resp = res.data.data;
        } else {
          resp = res.data.FOSec.data;
        }

        if (isQuery) {
          gainerData = [..._.filter(resp, (o) => Number(o.lastPrice) > 100)];
        } else {
          gainerData = [..._.filter(resp, (o) => o.ltp > 100)];
        }

        dispatch({
          type: ACTIONS.INITIAL,
          payload: {
            topGainer: [...gainerData.slice(0, 10)],
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
      headerName: "S.No",
      valueGetter: "node.rowIndex + 1",
      width: 100,
    },
    {
      field: "symbol",
      headerName: "Top Gainers",
      cellRenderer: FormatSymbol,
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
      id="top-gainers"
      className="ag-theme-balham mb-4"
      style={{ width: "100%", height: "500px" }}
    >
      <CsvButton
        csvData={[[""], ...generateCsvData(state.topGainer)]}
        filename={"top-gainers.csv"}
      />
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.topGainer}
        columnDefs={columnDefsGainers}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
        }}
      />
    </div>
  );
};

export default TopGainer;
