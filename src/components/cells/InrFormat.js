import React from "react";

const InrFormat = (api) => {
  return api.type === "CE" ? (
    <div
      className={`w-full ${
        api.data.strikePrice <= api.data["CE"].underlyingValue
          ? "bg-orange-50"
          : ""
      }`}
    >
      <span
        className={`${
          api.isBold ? "font-semibold text-blue-900 underline" : ""
        }`}
      >
        {api.value.toLocaleString("en-IN")}
      </span>
    </div>
  ) : (
    <div
      className={`w-full ${
        api.data.strikePrice >= api.data["PE"].underlyingValue
          ? "bg-orange-50"
          : ""
      }`}
    >
      <span
        className={`${
          api.isBold ? "font-semibold text-blue-900 underline" : ""
        }`}
      >
        {api.value.toLocaleString("en-IN")}
      </span>
    </div>
  );
};

export default InrFormat;
