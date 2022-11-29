import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import _ from "lodash";

import { ACTIONS } from "../StockOptions";
import FormatINR from "../cells/FormatINR";

import { conditionalArray } from "../StockOptions";

function copyStrikePrice(params) {
  function copyClip(value) {
    navigator.clipboard.writeText(`${params.value} ${value.data.strikePrice}`);
  }
  return <div onClick={() => copyClip(params)}>{params.value}</div>;
}

const SlideOIRise = ({ state, dispatch }) => {
  useEffect(() => {
    try {
      axios
        .get("https://www.nseindia.com/api/live-analysis-oi-spurts-contracts")
        .then((res) => {
          const resp = res.data.data[1]["Slide-in-OI-Rise"];

          dispatch({
            type: ACTIONS.INITIAL,
            payload: {
              slideOI: _.filter(resp, function (o) {
                if (
                  !conditionalArray.includes(o.symbol) &&
                  o.symbol.length > 2
                ) {
                  return o;
                }
              }),
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
      headerName: "Slide-in-OI-Rise",
      cellRenderer: copyStrikePrice,
    },
    {
      field: "strikePrice",
    },
    {
      field: "optionType",
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
      style={{ width: "100%", height: "200px" }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        rowData={state.slideOI}
        columnDefs={columnDefs}
        defaultColDef={{
          suppressMovable: true,
          suppressSizeToFit: true,
          width: "230",
        }}
      />
    </div>
  );
};

export default SlideOIRise;
