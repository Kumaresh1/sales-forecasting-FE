import React from "react";
import { Line } from "react-chartjs-2";

const RatingLineChart = ({ salesData }) => {
  const branches = salesData.map((sale) => sale.Branch);
  const ratings = salesData.map((sale) => sale.Rating);

  const data = {
    labels: [...new Set(branches)],
    datasets: [
      {
        label: "Rating",
        data: ratings,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Rating",
        },
      },
      x: {
        title: {
          display: true,
          text: "Branch",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default RatingLineChart;
