import React, { useEffect, useReducer } from "react";

import NavSpurts from "./NavSpurts";
import SpurtsTable from "./spurts";

import TopGainer from "./gainers";
import TopLoosers from "./loosers";
import Bullish from "./bullish";
import Bearish from "./bearish";

export const ACTIONS = {
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

const StockOptions = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    const bullStock = [];
    if (state.topGainer.length > 0 && state.spurts.length > 0) {
      state.topGainer.forEach((item) => {
        state.spurts.forEach((element) => {
          if (item.symbol === element.symbol) {
            bullStock.push({ symbol: element.symbol });
          }
        });
      });
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
      state.topLooser.forEach((item) => {
        state.spurts.forEach((element) => {
          if (item.symbol === element.symbol) {
            bearStock.push({ symbol: element.symbol });
          }
        });
      });
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
      <div className="grid grid-cols-5 gap-2 mt-4">
        <SpurtsTable state={state} dispatch={dispatch} />
        <TopGainer state={state} dispatch={dispatch} />
        <TopLoosers state={state} dispatch={dispatch} />
        <Bullish state={state} />
        <Bearish state={state} />
      </div>
    </div>
  );
};

export default StockOptions;
