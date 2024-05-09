import React from "react";
import { Bubble } from "react-chartjs-2";

const BubbleChart = ({ salesData }) => {
  const timeData = salesData.map((sale) => {
    const [hour, minute] = sale.Time.split(":").map(Number);
    return { hour, totalHours: parseInt(sale.Total) };
  });

  const groupedTimeData = timeData.reduce((acc, { hour, totalHours }) => {
    if (!acc[hour]) {
      acc[hour] = { total: 0, count: 0 };
    }
    acc[hour].total += totalHours;
    acc[hour].count++;
    return acc;
  }, {});

  const averageTimeData = Object.keys(groupedTimeData).map((hour) => ({
    hour: parseInt(hour),
    totalHours: groupedTimeData[hour].total / groupedTimeData[hour].count,
  }));

  const data = {
    labels: averageTimeData.map((data) => data.hour),
    datasets: [
      {
        label: "Hour",
        data: averageTimeData.map((data) => ({
          x: data.hour,
          y: data.totalHours,
          r: 20,
        })),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Take Hour from Time",
        },
      },
      x: {
        title: {
          display: true,
          text: "Hour",
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Bubble Chart: Hour vs. Total Sales ",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };

  return <Bubble data={data} options={options} />;
};

export default BubbleChart;
