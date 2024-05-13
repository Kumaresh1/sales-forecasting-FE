import React from "react";
import { Card, Divider, Table, Typography } from "antd";
import { dataSource } from "./performanceData";

const columns = [
  {
    title: "",
    dataIndex: "key",
    key: "sNo",
  },
  {
    title: "Models",
    dataIndex: "models",
    key: "models",
  },
  {
    title: "MSE",
    dataIndex: "MSE",
    key: "MSE",
  },
  {
    title: "RMSE",
    dataIndex: "RMSE",
    key: "RMSE",
  },
  {
    title: "MAE",
    dataIndex: "MAE",
    key: "MAE",
  },
  {
    title: "R2",
    dataIndex: "R2",
    key: "R2",
  },
  {
    title: "Accuracy",
    dataIndex: "Accuracy",
    key: "Accuracy",
  },
];

const PerformanceAnalytics = () => {
  return (
    <Card className="my-8">
      <Typography.Title level={4}>Performance Analysis</Typography.Title>
      <Table dataSource={dataSource} columns={columns} />
    </Card>
  );
};

export default PerformanceAnalytics;
