import React from "react";

export function copyClip(value) {
  let dd = new Date();
  navigator.clipboard.writeText(
    `${value} ${dd
      .toLocaleString("en-us", { month: "short" })
      .toUpperCase()} FUT`
  );
}

const FormatSymbol = (params) => {
  return (
    <div
      onClick={() => copyClip(params.value)}
      className={`font-semibold cursor-pointer ${
        params.type !== "bearish" ? "text-green-600" : "text-red-600"
      }`}
    >
      {params.value}
    </div>
  );
};

export default FormatSymbol;
