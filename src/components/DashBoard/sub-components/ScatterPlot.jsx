import React from "react";
import { Scatter } from "react-chartjs-2";

const ScatterPlot = ({ salesData }) => {
  const dailySales = Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    totalQuantity: 0,
  }));

  const total = [];
  // console.log(
  //   new Set(salesData.map(({ Date }) => parseInt(Date.split("/")[0])))
  // );
  console.log(total);
  salesData.forEach((sale) => {
    const day = parseInt(sale.Date.split("/")[0]);
    total.push({
      x: Math.floor(Math.random() * 30) + 1,
      y: parseInt(sale.Total),
    });
    // dailySales[day].totalQuantity += parseInt(sale.Quantity);
  });

  const data = {
    datasets: [
      {
        label: "Total Sale Quantity",
        // data: dailySales.map(({ day, totalQuantity }) => ({
        //   x: day,
        //   y: totalQuantity,
        // })),
        data: total,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Month",
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sale Quantity",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Scatter Plot: Day of the Month vs. Total Sale Quantity",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };

  return (
    <div className="h-[50vw]">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ScatterPlot;
