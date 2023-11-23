import React from "react";

export function copyClip(value) {
  // let dd = new Date();
  navigator.clipboard.writeText(value);
}

const FormatSymbol = (params) => {
  const isResult = params.result ? "tracking-wide" : "";

  return (
    <div
      onClick={() => copyClip(params.value)}
      className={`font-semibold cursor-pointer ${
        params.type !== "bearish"
          ? `text-green-600 ${isResult}`
          : `text-red-600 ${isResult}`
      }`}
    >
      {params.value}
    </div>
  );
};

export default FormatSymbol;
