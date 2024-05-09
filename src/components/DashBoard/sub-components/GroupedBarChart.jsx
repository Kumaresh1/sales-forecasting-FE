import React from "react";
import { Bar } from "react-chartjs-2";

const GroupedBarChart = ({ salesData }) => {
  const unitPrices = salesData.map((sale) => sale["Unit price"]);
  const customerTypes = [
    ...new Set(salesData.map((sale) => sale["Customer type"])),
  ];
  const productLines = [
    ...new Set(salesData.map((sale) => sale["Product line"])),
  ];

  const dataByCustomerType = {};
  customerTypes.forEach((type) => {
    dataByCustomerType[type] = new Array(productLines.length).fill(0);
  });

  salesData.forEach((sale) => {
    const productLineIndex = productLines.indexOf(sale["Product line"]);
    const customerTypeIndex = customerTypes.indexOf(sale["Customer type"]);
    if (!dataByCustomerType[sale["Customer type"]][productLineIndex])
      dataByCustomerType[sale["Customer type"]][productLineIndex] = 0;
    dataByCustomerType[sale["Customer type"]][productLineIndex] += parseInt(
      sale["Unit price"]
    );
  });

  const datasets = customerTypes.map((type, index) => ({
    label: type,
    data: dataByCustomerType[type],
    backgroundColor: `rgba(${index * 50}, ${255 - index * 50}, ${
      Math.random() * 255
    }, 0.6)`,
    borderWidth: 1,
  }));
  const data = {
    labels: productLines,
    datasets: datasets,
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Unit Price",
        },
      },
      y: {
        title: {
          display: true,
          text: "Product Line",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Grouped Bar Chart: Product Line vs. Unit Price by Customer Type",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GroupedBarChart;
