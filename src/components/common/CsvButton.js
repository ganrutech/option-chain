import { CSVLink } from "react-csv";

import React from "react";

const CsvButton = ({ csvData, filename }) => {
  return (
    <CSVLink
      data={csvData}
      filename={filename}
      className="px-4 bg-gray-300 font-semibold"
    >
      Download CSV
    </CSVLink>
  );
};

export default CsvButton;
