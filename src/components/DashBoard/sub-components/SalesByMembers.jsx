import { BarChart } from "@mui/x-charts";
import Typography from "antd/es/typography";

// eslint-disable-next-line react/prop-types
const MemberSalesByTypeBarChart = ({ salesData = [] }) => {
  const salesByBranchA = salesData.filter((sale) => sale["Branch"] === "A");
  const salesByBranchB = salesData.filter((sale) => sale["Branch"] === "B");
  const salesByBranchC = salesData.filter((sale) => sale["Branch"] === "C");

  const memberSalesCountA = salesByBranchA.filter(
    (sale) => sale["Customer type"] === "Member"
  ).length;
  const nonMemberSalesCountA = salesByBranchA.filter(
    (sale) => sale["Customer type"] !== "Member"
  ).length;

  const memberSalesCountB = salesByBranchB.filter(
    (sale) => sale["Customer type"] === "Member"
  ).length;
  const nonMemberSalesCountB = salesByBranchB.filter(
    (sale) => sale["Customer type"] !== "Member"
  ).length;

  const memberSalesCountC = salesByBranchC.filter(
    (sale) => sale["Customer type"] === "Member"
  ).length;
  const nonMemberSalesCountC = salesByBranchC.filter(
    (sale) => sale["Customer type"] !== "Member"
  ).length;

  return (
    <>
      <Typography.Title level={4}>Sales by Member Type</Typography.Title>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Member", "Non-Member"] }]}
        series={[
          {
            data: [memberSalesCountA, nonMemberSalesCountA],
            label: "Branch A",
          },
          {
            data: [memberSalesCountB, nonMemberSalesCountB],
            label: "Branch B",
          },
          {
            data: [memberSalesCountC, nonMemberSalesCountC],
            label: "Branch C",
          },
        ]}
        // width={500}
        height={300}
      ></BarChart>
    </>
  );
};

export default MemberSalesByTypeBarChart;
