import { Doughnut } from "react-chartjs-2";

const ProductRatingDoughnutChart = ({ salesData }) => {
  const productLines = salesData.map((sale) => sale["Product line"]);
  const ratings = salesData.map((sale) => parseInt(sale.Rating).toFixed(0));

  const data = {
    labels: [...new Set(productLines)],
    datasets: [
      {
        label: "Rating",
        data: [...new Set(ratings)],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Product Line Ratings",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      subtitle: {
        display: true,
        text: "Doughnut chart showing ratings for each product line",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };

  return (
    <div className="h-[40vw] flex items-center justify-center">
      <Doughnut data={data} options={options} />;
    </div>
  );
};

export default ProductRatingDoughnutChart;
