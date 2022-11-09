import React from "react";

const FormatCell = (api) => {
  const condition = ["Strong", "Weak"];

  return condition.includes(api.value) ? (
    <div
      className={`font-bold text-white ${
        api.value === "Strong" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {api.value}
    </div>
  ) : (
    <div
      className={`font-semibold ${
        api.type === "CE" ? "text-green-600 " : "text-red-600"
      }`}
    >
      {api.value}
    </div>
  );
};

export default FormatCell;
