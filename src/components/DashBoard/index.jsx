import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import textfile from "../../assets/dataset/sales.txt";
import { useState, useEffect } from "react";
import { Card, Divider, Spin, Typography } from "antd";
import MemberSalesByGenderBarChart from "./sub-components/SalesByGender";
import MemberSalesByTypeBarChart from "./sub-components/SalesByMembers";
import SalesPolarChart from "./sub-components/PolarChart";

import { Chart, registerables } from "chart.js";
import SalesRadarChart from "./sub-components/RadarChart";

Chart.register(...registerables);

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch(textfile)
      .then((r) => r.text())
      .then((text) => {
        let rows = text.split("\n");
        let columns = rows[0].split(",").map((value) => ({
          title: value,
          dataIndex: value,
          key: value,
          render: (text) => <a>{text}</a>,
        }));
        let rowData = [];
        rows.slice(1).forEach((row) => {
          const rowValues = row.split(",");
          let obj = {};
          rowValues.forEach((value, index) => {
            obj[columns[index].title] = value;
          });
          rowData.push(obj);
        });
        setSalesData(rowData);
      });
  }, []);

  const productLineData = salesData.reduce((acc, curr) => {
    acc[curr["Product line"]] = (acc[curr["Product line"]] || 0) + 1;
    return acc;
  }, {});

  const customerTypeData = salesData.reduce((acc, curr) => {
    acc[curr["Customer type"]] = (acc[curr["Customer type"]] || 0) + 1;
    return acc;
  }, {});

  const branchData = salesData.reduce((acc, curr) => {
    acc[curr["Branch"]] = (acc[curr["Branch"]] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card className="mt-3">
      {salesData.length > 0 ? (
        <div className="my-5 mx-2">
          <div>
            <Typography.Title level={4}>Branch Distribution</Typography.Title>
            <BarChart
              xAxis={[{ scaleType: "band", data: Object.keys(branchData) }]}
              series={[{ data: Object.values(branchData), label: "Sales" }]}
              //   width={500}
              height={300}
            />
          </div>
          <Divider />
          <Typography.Title level={4}>
            Total Sales across Categories
          </Typography.Title>

          <SalesPolarChart salesData={salesData} />
          <Divider />
          <MemberSalesByGenderBarChart salesData={salesData} />
          <Divider />

          <Typography.Title level={4}>
            Total Sales across Categories by Gender
          </Typography.Title>

          <SalesRadarChart salesData={salesData} />
          <Divider />
          <MemberSalesByTypeBarChart salesData={salesData} />

          <Divider />
          <Typography.Title level={4}>
            Total Sales Count across Categories and Members
          </Typography.Title>
          <div className="flex justify-evenly -ml-20 w-[86vw]">
            <div className="w-[60%]">
              <PieChart
                series={[
                  {
                    data: Object.entries(productLineData).map(
                      ([label, value]) => ({ id: label, value, label })
                    ),
                  },
                ]}
                height={300}
              />
            </div>
            <div className="w-[40%]">
              <PieChart
                series={[
                  {
                    data: Object.entries(customerTypeData).map(
                      ([label, value]) => ({ id: label, value, label })
                    ),
                  },
                ]}
                // width={800}
                height={300}
              />
            </div>
          </div>

          <Divider />

          {/* <SalesBarChart salesData={salesData} /> */}
        </div>
      ) : (
        <Spin />
      )}
    </Card>
  );
};

export default Dashboard;
