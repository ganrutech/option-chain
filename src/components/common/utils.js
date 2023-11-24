export function generateCsvData(data) {
  const arr = [];
  data.forEach((item) => {
    arr.push([item.symbol]);
  });
  return arr;
}
