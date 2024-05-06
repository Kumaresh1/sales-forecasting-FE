import { BarChart } from "@mui/x-charts";
import Typography from "antd/es/typography";

// eslint-disable-next-line react/prop-types
const MemberSalesByGenderBarChart = ({ salesData = [] }) => {
  const salesByBranchA = salesData.filter((sale) => sale["Branch"] === "A");
  const salesByBranchB = salesData.filter((sale) => sale["Branch"] === "B");
  const salesByBranchC = salesData.filter((sale) => sale["Branch"] === "C");

  const maleSalesCountA = salesByBranchA.filter(
    (sale) => sale["Gender"] === "Male"
  ).length;
  const femaleSalesCountA = salesByBranchA.filter(
    (sale) => sale["Gender"] === "Female"
  ).length;

  const maleSalesCountB = salesByBranchB.filter(
    (sale) => sale["Gender"] === "Male"
  ).length;
  const femaleSalesCountB = salesByBranchB.filter(
    (sale) => sale["Gender"] === "Female"
  ).length;

  const maleSalesCountC = salesByBranchC.filter(
    (sale) => sale["Gender"] === "Male"
  ).length;
  const femaleSalesCountC = salesByBranchC.filter(
    (sale) => sale["Gender"] === "Female"
  ).length;

  return (
    <>
      <Typography.Title level={4}>Sales by Gender</Typography.Title>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Male", "Female"] }]}
        series={[
          { data: [maleSalesCountA, femaleSalesCountA], label: "Branch A" },
          { data: [maleSalesCountB, femaleSalesCountB], label: "Branch B" },
          { data: [maleSalesCountC, femaleSalesCountC], label: "Branch C" },
        ]}
        // width={500}
        height={300}
      ></BarChart>
    </>
  );
};

export default MemberSalesByGenderBarChart;
