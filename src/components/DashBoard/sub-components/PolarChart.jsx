import { PolarArea } from "react-chartjs-2";
import { categories } from "../../../constants";

// eslint-disable-next-line react/prop-types
const SalesPolarChart = ({ salesData = [] }) => {
  const salesByCategory = Array(categories.length).fill(0);

  salesData.forEach((item) => {
    const categoryIndex = categories.indexOf(item["Product line"]);
    if (categoryIndex !== -1) {
      salesByCategory[categoryIndex] += parseFloat(item.Total);
    }
  });
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Sales",
        data: salesByCategory,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="h-[60vh] flex justify-center">
      <PolarArea data={data} />;
    </div>
  );
};

export default SalesPolarChart;
