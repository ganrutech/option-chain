import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";

const ChangePercentage = (api) => {
  // console.log(api.data.strikePrice);
  // api.data["CE"].underlyingValue

  return api.type === "CE" ? (
    <div
      className={`flex items-center place-content-center ${
        api.value >= 0 ? " text-green-600" : "text-red-500"
      } ${
        api.data.strikePrice <= api.data["CE"].underlyingValue
          ? "bg-orange-50"
          : ""
      }`}
    >
      {api.value.toFixed(2)}
      {api.value >= 0 ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
    </div>
  ) : (
    <div
      className={`flex items-center ${
        api.value >= 0 ? " text-green-600" : "text-red-500"
      } ${
        api.data.strikePrice >= api.data["PE"].underlyingValue
          ? "bg-orange-50"
          : ""
      }`}
    >
      {api.value.toFixed(2)}
      {api.value >= 0 ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
    </div>
  );
};

export default ChangePercentage;
