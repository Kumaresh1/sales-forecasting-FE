import React from "react";
import { Card, Progress, Statistic, Row, Col } from "antd";
import { stock } from "../../assets/dataset/stock";
import { categories } from "../../constants";

const StockRecommendations = ({ salesData = [] }) => {
  const totalQuantitySoldByCategory = {};
  salesData.forEach((sale) => {
    const category = sale["Product line"];
    totalQuantitySoldByCategory[category] =
      (totalQuantitySoldByCategory[category] || 0) + parseInt(sale.Quantity);
  });

  const recommendations = categories.map((category) => {
    const totalSold = totalQuantitySoldByCategory[category] || 0;
    const totalStock = stock[category];
    const excessOrRecess = totalStock - totalSold;
    let status = "success";
    if (excessOrRecess - 50 < 0) {
      status = "exception";
    }
    const percentage = (totalSold / totalStock) * 100;
    return {
      category,
      excessOrRecess,
      status,
      percentage,
    };
  });

  return (
    <div>
      <Row gutter={16}>
        {recommendations.map((recommendation) => (
          <Col span={8} key={recommendation.category}>
            <Card
              title={recommendation.category}
              extra={<Statistic value={recommendation.excessOrRecess} />}
            >
              <p>Total Stock: {stock[recommendation.category]}</p>
              <p>
                Total Quantity Sold:{" "}
                {totalQuantitySoldByCategory[recommendation.category] || 0}
              </p>
              <Progress
                percent={recommendation.percentage}
                status={recommendation.status}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StockRecommendations;
