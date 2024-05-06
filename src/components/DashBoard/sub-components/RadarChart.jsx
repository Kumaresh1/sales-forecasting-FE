import { Radar } from "react-chartjs-2";
import { categories } from "../../../constants";

// eslint-disable-next-line react/prop-types
const SalesRadarChart = ({ salesData = [] }) => {
  const maleSalesByCategory = Array(categories.length).fill(0);
  const femaleSalesByCategory = Array(categories.length).fill(0);

  salesData?.forEach((item) => {
    const categoryIndex = categories.indexOf(item["Product line"]);
    if (categoryIndex !== -1) {
      if (item.Gender === "Male") {
        maleSalesByCategory[categoryIndex] += parseFloat(item.Total);
      } else if (item.Gender === "Female") {
        femaleSalesByCategory[categoryIndex] += parseFloat(item.Total);
      }
    }
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Male Purchases",
        data: maleSalesByCategory,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Female Purchases",
        data: femaleSalesByCategory,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };
  return (
    <div className="h-[80vh] flex justify-center">
      <Radar data={data} />
    </div>
  );
};

export default SalesRadarChart;
