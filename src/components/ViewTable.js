import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import _ from "lodash";

import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "../index.css";
import InrFormat from "./cells/InrFormat";
import ChangePercentage from "./cells/ChangePercentage";
import NormalCell from "./cells/NormalCell";
import Intraday from "./Intraday";
import Nav from "./Nav";

const ACTIONS = {
  INITIAL: "initial",
  EXPIRY: "expiry",
  SET_ROWDATA: "rowData",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INITIAL:
      return { ...state, ...action.payload };
    case ACTIONS.EXPIRY:
      return { ...state, expiry: action.payload.expiry };
    case ACTIONS.SET_ROWDATA:
      return { ...state, rowData: action.payload.rowData };
    default:
      return state;
  }
}

const initialValue = {
  allData: [],
  rowData: [],
  expDates: [],
  expiry: "",
  underlyingValue: "",
  timestamp: "",
};

const ViewTable = () => {
  const gridRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialValue);

  const [refresh, setRefresh] = useState(true);
  const [option, setOption] = useState("BANKNIFTY");

  const columnDefs = [
    {
      headerName: "CALLS",
      children: [
        {
          headerName: "OI",
          field: "CE.openInterest",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "CHNG OI",
          field: "CE.changeinOpenInterest",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "VOLUME",
          field: "CE.totalTradedVolume",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "IV",
          field: "CE.impliedVolatility",
          width: 80,
          cellRenderer: NormalCell,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "LTP",
          field: "CE.lastPrice",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
            isBold: true,
          },
        },
        {
          headerName: "CHNG",
          field: "CE.change",
          width: 90,
          cellRenderer: ChangePercentage,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "BID QTY",
          field: "CE.bidQty",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "BID",
          field: "CE.bidprice",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "ASK",
          field: "CE.askPrice",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
          },
        },
        {
          headerName: "ASK QTY",
          field: "CE.askQty",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "CE",
          },
        },
      ],
    },
    {
      headerName: "STRIKE",
      field: "CE.strikePrice",
      width: 90,
      cellRenderer: InrFormat,
      cellRendererParams: {
        type: "CE",
        isBold: true,
      },
    },
    {
      headerName: "PUTS",
      children: [
        {
          headerName: "BID QTY",
          field: "PE.bidQty",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
          },
        },
        {
          headerName: "BID",
          field: "PE.bidprice",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
          },
        },

        {
          headerName: "ASK",
          field: "PE.askPrice",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
          },
        },
        {
          headerName: "ASK QTY",
          field: "PE.askQty",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
          },
        },
        {
          headerName: "CHNG",
          field: "PE.change",
          width: 90,
          cellRenderer: ChangePercentage,
          cellRendererParams: {
            type: "PE",
          },
        },
        {
          headerName: "LTP",
          field: "PE.lastPrice",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
            isBold: true,
          },
        },
        {
          headerName: "IV",
          field: "PE.impliedVolatility",
          width: 80,
          cellRenderer: NormalCell,
          cellRendererParams: {
            type: "PE",
          },
        },
        {
          headerName: "VOLUME",
          field: "PE.totalTradedVolume",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
          },
        },
        {
          headerName: "CHNG OI",
          field: "PE.changeinOpenInterest",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
          },
        },
        {
          headerName: "OI",
          field: "PE.openInterest",
          width: 90,
          cellRenderer: InrFormat,
          cellRendererParams: {
            type: "PE",
          },
        },
      ],
    },
  ];

  const onBtShowLoading = useCallback(() => {
    gridRef.current.api.showLoadingOverlay();
  }, []);

  useEffect(() => {
    try {
      axios
        .get(
          `https://www.nseindia.com/api/option-chain-indices?symbol=${option}`
        )
        .then((res) => {
          const priceLimit = res.data.records.underlyingValue;
          const strikeData = res.data.records.data;
          const expDate = res.data.records.expiryDates[0];
          gridRef.current.api.hideOverlay();

          dispatch({
            type: ACTIONS.INITIAL,
            payload: {
              allData: res.data,
              underlyingValue: res.data.records.underlyingValue,
              timestamp: res.data.records.timestamp,
              expDates: res.data.records.expiryDates,
              expiry: expDate,
            },
          });

          filterDataHandler(expDate, priceLimit, strikeData);
        });
    } catch (error) {
      console.log(error);
      gridRef.current.api.hideOverlay();
    }
  }, [option, refresh]);

  useEffect(() => {
    const refreshAPI = setInterval(() => {
      setRefresh(!refresh);
    }, 60000);

    return () => {
      clearInterval(refreshAPI);
    };
  });

  const changeExpiry = (e) => {
    dispatch({ type: ACTIONS.EXPIRY, payload: { expiry: e.target.value } });
    filterDataHandler(
      e.target.value,
      state.underlyingValue,
      state.allData?.records.data
    );
  };

  const changeOption = (e) => {
    setOption(e.target.value);
    onBtShowLoading();
  };

  const filterDataHandler = (expDate, priceLimit, data) => {
    const filterData =
      data &&
      data.filter(
        (e) => e.expiryDate === expDate && e.strikePrice > priceLimit - 700
      );
    dispatch({ type: ACTIONS.SET_ROWDATA, payload: { rowData: filterData } });
  };

  const intradayDataBuilder = () => {
    if (state.rowData.length === 0) return [];

    const intradayRowData = [
      { oichange: "Strike Price" },
      { oichange: "Max.Change in OI" },
      { oichange: "Open Interest" },
      { oichange: "Volume" },
      { oichange: "Trend Strength" },
    ];

    let maxChangeCE = [];
    let maxChangePE = [];
    let maxVolumeCE = [];
    let maxVolumePE = [];
    let maxOICE = [];
    let maxOIPE = [];

    state.rowData.forEach((item) => {
      maxChangeCE.push(item["CE"]["changeinOpenInterest"]);
      maxVolumeCE.push(item["CE"]["totalTradedVolume"]);
      maxOICE.push(item["CE"]["openInterest"]);
    });

    state.rowData.forEach((item) => {
      maxChangePE.push(item["PE"]["changeinOpenInterest"]);
      maxVolumePE.push(item["PE"]["totalTradedVolume"]);
      maxOIPE.push(item["PE"]["openInterest"]);
    });

    // CALLS

    intradayRowData[1]["call"] = Math.max(...maxChangeCE).toLocaleString(
      "en-IN"
    );
    const CEStrikePrice = _.find(state.rowData, function (o) {
      return o["CE"]["changeinOpenInterest"] === Math.max(...maxChangeCE);
    });
    intradayRowData[2]["call"] = Math.max(...maxOICE).toLocaleString("en-IN");
    intradayRowData[3]["call"] = Math.max(...maxVolumeCE).toLocaleString(
      "en-IN"
    );
    intradayRowData[4]["call"] =
      Math.max(...maxVolumeCE) > Math.max(...maxChangeCE) ? "Strong" : "Weak";

    // PUTS

    intradayRowData[1]["put"] = Math.max(...maxChangePE).toLocaleString(
      "en-IN"
    );
    const PEStrikePrice = _.find(state.rowData, function (o) {
      return o["PE"]["changeinOpenInterest"] === Math.max(...maxChangePE);
    });
    intradayRowData[2]["put"] = Math.max(...maxOIPE).toLocaleString("en-IN");
    intradayRowData[3]["put"] = Math.max(...maxVolumePE).toLocaleString(
      "en-IN"
    );
    intradayRowData[4]["put"] =
      Math.max(...maxChangePE) > Math.max(...maxVolumePE) ? "Strong" : "Weak";

    intradayRowData[0]["call"] =
      CEStrikePrice["strikePrice"].toLocaleString("en-IN");
    intradayRowData[0]["put"] =
      PEStrikePrice["strikePrice"].toLocaleString("en-IN");

    // console.log(intradayRowData);
    return intradayRowData;
  };

  return (
    <div className="p-4">
      <Nav />
      <div className="flex justify-between">
        <div className="mb-2 flex space-x-2">
          <select
            name="expiry_date"
            id="expiry_date"
            className="border border-gray-500"
            onChange={changeExpiry}
            value={state.expiry}
          >
            <option value="">-- Expire Date --</option>
            {state.expDates.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="indexes"
            id="indexes"
            className="border border-gray-500"
            onChange={changeOption}
            value={option}
          >
            <option value="NIFTY">NIFTY</option>
            <option value="BANKNIFTY">BANKNIFTY</option>
          </select>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="border border-gray-500 px-3 bg-gray-200"
          >
            Reload
          </button>
        </div>

        {/* FIELDS END */}
        <div className="space-x-2">
          <span className="text-sm font-semibold text-green-600">
            Total CALLS OI:
          </span>
          <input
            id="total_oi"
            type="text"
            className="border border-gray-300"
            value={
              state.allData?.filtered
                ? state.allData?.filtered?.["CE"]?.totOI.toLocaleString("en-IN")
                : ""
            }
            disabled
          />
          <span className="text-sm font-semibold text-red-600">
            Total PUTS OI:
          </span>
          <input
            id="total_vol"
            type="text"
            className="border border-gray-300"
            value={
              state.allData?.filtered
                ? state.allData?.filtered?.["PE"]?.totOI.toLocaleString("en-IN")
                : ""
            }
            disabled
          />
        </div>
      </div>

      <div className="flex justify-center mb-2">
        <h3>
          {option} WEEKLY EXPIRY AS ON
          <span className="text-orange-500 font-bold"> {state.expiry}</span> -
          <span className="font-bold">{` ${
            state.underlyingValue &&
            state.underlyingValue.toLocaleString("en-IN")
          } `}</span>
          <span>{state.timestamp}</span>
        </h3>
      </div>

      {state.rowData.length > 0 && <Intraday rowData={intradayDataBuilder()} />}

      <div
        className="ag-theme-balham mb-4"
        style={{ width: "100%", height: "500px" }}
      >
        <AgGridReact
          ref={gridRef}
          enableCellChangeFlash={true}
          rowData={state.rowData}
          columnDefs={columnDefs}
          defaultColDef={{ suppressMovable: true }}
        />
      </div>
    </div>
  );
};

export default ViewTable;
