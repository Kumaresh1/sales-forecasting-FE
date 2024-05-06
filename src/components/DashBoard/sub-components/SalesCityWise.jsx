import { Bar } from "react-chartjs-2";

// eslint-disable-next-line react/prop-types
const SalesBarChart = ({ salesData = [] }) => {
  const salesByCity = {};

  salesData.forEach((item) => {
    const city = item.City;
    if (!salesByCity[city]) {
      salesByCity[city] = item.Total;
    } else {
      salesByCity[city] += item.Total;
    }
  });

  const cities = Object.keys(salesByCity);
  const sales = Object.values(salesByCity);
  console.log(cities, sales);
  const data = {
    labels: cities,
    datasets: [
      {
        label: "Sales",
        data: sales,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales",
        },
      },
      x: {
        title: {
          display: true,
          text: "City",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesBarChart;
