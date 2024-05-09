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
import RatingLineChart from "./sub-components/LineChart";
import ProductRatingDoughnutChart from "./sub-components/DoughnutChart";
import GroupedBarChart from "./sub-components/GroupedBarChart";
import BubbleChart from "./sub-components/BubbleChart";
import ScatterPlot from "./sub-components/ScatterPlot";

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
    <Card className="mt-3 overflow-scroll">
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
            <Typography.Text>
              This describes the sales across each branches
            </Typography.Text>
          </div>
          <Divider />
          <Typography.Title level={4}>
            Total Sales across Categories
          </Typography.Title>

          <SalesPolarChart salesData={salesData} />
          <Typography.Text>
            This describes the total sale value across various categories. Eg:
            Health and Beauty category has 54,000+ sales approx.
          </Typography.Text>
          <Divider />
          <MemberSalesByGenderBarChart salesData={salesData} />
          <Typography.Text>
            This describes the sales across the branch gender wise. Like we can
            say that branch A has more male shoppers.
          </Typography.Text>
          <Divider />

          <Typography.Title level={4}>
            Total Sales across Categories by Gender
          </Typography.Title>

          <SalesRadarChart salesData={salesData} />

          <Typography.Text>
            This describes the total sales across each category gender wise. We
            can evidently see that female purchasers are targeting food and
            fashion accessories.
          </Typography.Text>
          <Divider />
          <MemberSalesByTypeBarChart salesData={salesData} />
          <Typography.Text>
            This describes the sales across the branch member/non-member wise.
            Like we can say that branch A has more non-member shoppers.
          </Typography.Text>
          <Divider />

          <RatingLineChart salesData={salesData} />
          <Typography.Text>
            Branch B has the lowest rating among all other branches and Branch A
            and C have equal rating
          </Typography.Text>
          <Divider />

          <ProductRatingDoughnutChart salesData={salesData} />
          <Typography.Text>
            Health and Beauty and food and beverages have higher rating as
            compared to other products. The least rating was observed for
            electronic accessories and sport and travel items
          </Typography.Text>
          <Divider />

          <GroupedBarChart salesData={salesData} />
          <Typography.Text>
            This depicts that members and normal customers dont want to
            compromise on the quality of sports and travel products as well as
            food and beverages products, so they are buying these products in
            maximum even though these products have higher unit price.
          </Typography.Text>
          <Divider />

          <BubbleChart salesData={salesData} />
          <Typography.Text>
            This depicts sales are peak at start of the afternoon and evenings.
          </Typography.Text>
          <Divider />

          <ScatterPlot salesData={salesData} />
          <Typography.Text>
            This depicts sales are peak at start of the afternoon and evenings.
          </Typography.Text>
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
              <Typography.Text>
                This describes the sales count across each categories
              </Typography.Text>
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
              <Typography.Text>
                This describes the members and non-members count .
              </Typography.Text>
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
