import React from "react";

const FormatSymbol = (params) => {
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

export default FormatSymbol;
