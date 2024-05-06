import { useState } from "react";
import { Form, Button, Select, Card } from "antd";
import axios from "axios";
import { SERVER_URL } from "../env";
import { categories } from "../constants";
const { Option } = Select;

export const PredictSales = () => {
  const [predictedSales, setPredictedSales] = useState(null);
  const [selectedProductLine, setSelectedProductLine] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const onFinish = async (values) => {
    const payload = {
      "Product Line": values.productLine,
      Branch: values.branch,
      City: values.city,
      "Customer Type": values.customerType,
      Gender: values.gender,
    };
    const { data } = await axios.post(SERVER_URL + "/predict", [
      Object.values(payload),
    ]);

    setPredictedSales(data.predicted_sales_total?.[0] || "Nan");
    setSelectedProductLine(categories[values.productLine]);
    setSelectedDate(values.date);
  };

  return (
    <Card className="my-5">
      {/* <Typography.Title level={4}>Sales Prediction Form</Typography.Title> */}
      <Form layout="vertical" name="sales_prediction_form" onFinish={onFinish}>
        <Form.Item
          label="Product Line"
          name="productLine"
          rules={[{ required: true, message: "Please select a product line" }]}
        >
          <Select placeholder="Select a product line">
            <Option value={1}>Health and beauty</Option>
            <Option value={2}>Electronic accessories</Option>
            <Option value={3}>Home and lifestyle</Option>
            <Option value={4}>Sports and travel</Option>
            <Option value={5}>Food and beverages</Option>
            <Option value={6}>Fashion accessories</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Branch" name="branch" initialValue={2}>
          <Select>
            <Option value={1}>Branch A</Option>
            <Option value={2}>Branch B</Option>
            <Option value={3}>Branch C</Option>
          </Select>
        </Form.Item>

        <Form.Item label="City" name="city" initialValue={1}>
          <Select>
            <Option value={0}>Yangon</Option>
            <Option value={1}>Naypyitaw</Option>
            <Option value={2}>Mandalay</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Customer Type" name="customerType" initialValue={0}>
          <Select>
            <Option value={0}>Member</Option>
            <Option value={1}>Non-Member</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Gender" name="gender" initialValue={0}>
          <Select>
            <Option value={0}>Male</Option>
            <Option value={1}>Female</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker />
        </Form.Item> */}

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
    </Card>
  );
};
