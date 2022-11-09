import React from "react";

const NormalCell = (api) => {
  // console.log(api.data.strikePrice);

  return api.type === "CE" ? (
    <div
      className={`${
        api.data.strikePrice <= api.data["CE"].underlyingValue
          ? "bg-orange-50"
          : ""
      }`}
    >
      {api.value.toFixed(2)}
    </div>
  ) : (
    <div
      className={`${
        api.data.strikePrice >= api.data["PE"].underlyingValue
          ? "bg-orange-50"
          : ""
      }`}
    >
      {api.value.toFixed(2)}
    </div>
  );
};

export default NormalCell;
