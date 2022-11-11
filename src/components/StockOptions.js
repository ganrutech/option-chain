import React, { useRef, useEffect, useReducer } from "react";
import { AgGridReact } from "ag-grid-react";
import NavSpurts from "./NavSpurts";
import axios from "axios";

const ACTIONS = {
  INITIAL: "initial",
  SET_ROWDATA: "rowData",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INITIAL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
const initialValue = {
  spurts: [],
  topGainer: [],
  topLooser: [],
  bullish: [],
  bearStock: [],
  timestamp: "",
};

const formatINR = (params) => {
  return params.value.toLocaleString("en-IN");
};

const formatSymbol = (params) => {
  function copyClip() {
    navigator.clipboard.writeText(params.value);
  }

  return (
    <div
      onClick={() => copyClip()}
      className={`font-semibold ${
        params.type !== "bearish" ? "text-green-600" : "text-red-600"
      }`}
    >
      {params.value}
    </div>
  );
};

const StockOptions = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const gridRef = useRef();

  const columnDefs = [
    {
      field: "symbol",
      headerName: "OI Spurts",
    },
    {
      field: "changeInOI",
      cellRenderer: formatINR,
    },
  ];

  const columnDefsGainers = [
    {
      field: "symbol",
      headerName: "Top Gainers",
    },
    {
      headerName: "Latest Price",
      field: "ltp",
      cellRenderer: formatINR,
    },
  ];

  const columnDefsLoosers = [
    {
      field: "symbol",
      headerName: "Top Loosers",
    },
    {
      headerName: "Latest Price",
      field: "ltp",
      cellRenderer: formatINR,
    },
  ];

  const columnDefsBullish = [
    {
      headerName: "Bullish",
      field: "symbol",
      cellRenderer: formatSymbol,
    },
  ];

  const columnDefsBearish = [
    {
      headerName: "Bearish",
      field: "symbol",
      cellRenderer: formatSymbol,
      cellRendererParams: {
        type: "bearish",
      },
    },
  ];

  useEffect(() => {
    try {
      axios
        .get("https://www.nseindia.com/api/live-analysis-oi-spurts-underlyings")
        .then((res) => {
          const resp = res.data.data.slice(0, 20);

          dispatch({
            type: ACTIONS.INITIAL,
            payload: {
              spurts: resp,
              timestamp: res.data.timestamp,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
              topGainer: resp,
              timestamp: res.data.timestamp,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
              topLooser: resp,
              timestamp: res.data.timestamp,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const bullStock = [];
    if (state.topGainer.length > 0 && state.spurts.length > 0) {
      state.spurts.forEach((element) => {
        state.topGainer.forEach((item) => {
          if (item.symbol === element.symbol && item.ltp > 150) {
            bullStock.push({ symbol: element.symbol });
          }
        });
      });
      console.log(bullStock);
      dispatch({
        type: ACTIONS.INITIAL,
        payload: {
          bullish: bullStock,
        },
      });
    }
  }, [state.spurts, state.topGainer]);

  useEffect(() => {
    const bearStock = [];
    if (state.topLooser.length > 0 && state.spurts.length > 0) {
      state.spurts.forEach((element) => {
        state.topLooser.forEach((item) => {
          if (item.symbol === element.symbol && item.ltp > 150) {
            bearStock.push({ symbol: element.symbol });
          }
        });
      });
      console.log(bearStock);
      dispatch({
        type: ACTIONS.INITIAL,
        payload: {
          bearStock: bearStock,
        },
      });
    }
  }, [state.spurts, state.topLooser]);

  return (
    <div className="p-4">
      <NavSpurts />
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="border border-gray-500 px-3 bg-gray-200"
      >
        Reload
      </button>
      <div className="flex justify-center space-x-4">
        <div
          className="ag-theme-balham mb-4"
          style={{ width: "20%", height: "500px" }}
        >
          <AgGridReact
            ref={gridRef}
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

        <div
          className="ag-theme-balham mb-4"
          style={{ width: "20%", height: "500px" }}
        >
          <AgGridReact
            ref={gridRef}
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

        <div
          className="ag-theme-balham mb-4"
          style={{ width: "20%", height: "500px" }}
        >
          <AgGridReact
            ref={gridRef}
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

        <div
          className="ag-theme-balham mb-4"
          style={{ width: "20%", height: "500px" }}
        >
          <AgGridReact
            ref={gridRef}
            enableCellChangeFlash={true}
            rowData={state.bullish}
            columnDefs={columnDefsBullish}
            defaultColDef={{
              suppressMovable: true,
              suppressSizeToFit: true,
              width: "370",
            }}
          />
        </div>

        <div
          className="ag-theme-balham mb-4"
          style={{ width: "20%", height: "500px" }}
        >
          <AgGridReact
            ref={gridRef}
            enableCellChangeFlash={true}
            rowData={state.bearStock}
            columnDefs={columnDefsBearish}
            defaultColDef={{
              suppressMovable: true,
              suppressSizeToFit: true,
              width: "370",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StockOptions;
