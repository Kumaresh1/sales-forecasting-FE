import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";


const { Option } = Select;

export const PredictSales = () => {
  const [predictedSales, setPredictedSales] = useState(null);
  const [selectedProductLine, setSelectedProductLine] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);



  const onFinish = (values) => {
    // Perform prediction logic here
    // For simplicity, we'll just set a random predicted sales value
    const randomSales = Math.floor(Math.random() * 10000);
    setPredictedSales(randomSales);
    setSelectedProductLine(values.productLine);
    setSelectedDate(values.date);
  };

  return (
    <div>
      <h1>Sales Prediction Form</h1>
      <Form layout="vertical" name="sales_prediction_form" onFinish={onFinish}>
        <Form.Item
          label="Product Line"
          name="productLine"
          rules={[{ required: true, message: "Please select a product line" }]}
        >
          <Select placeholder="Select a product line">
            <Option value="Health and beauty">Health and beauty</Option>
            <Option value="Electronic accessories">
              Electronic accessories
            </Option>
            <Option value="Home and lifestyle">Home and lifestyle</Option>
            <Option value="Sports and travel">Sports and travel</Option>
            <Option value="Food and beverages">Food and beverages</Option>
            <Option value="Fashion accessories">Fashion accessories</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Predict Sales
          </Button>
        </Form.Item>
      </Form>

      {predictedSales !== null && (
        <div>
          <h2>
            Predicted Sales for {selectedProductLine} on{" "}
            {selectedDate && selectedDate.format("DD/MM/YYYY")}:
          </h2>
          <p>{predictedSales}</p>
        </div>
      )}
    </div>
  );
};
