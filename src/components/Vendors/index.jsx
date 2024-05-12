import { Card, Tabs } from "antd";
import { VendorRecommendations } from "./VendorsRecommendations";
import { VendorsTable } from "./VendorsView";
import { useEffect, useState } from "react";

import textfile from "../../assets/dataset/vendors.txt";
import { vendors } from "../../assets/dataset/vendors";

const onChange = (key) => {
  console.log(key);
};

const Vendors = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState(vendors);

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

        columns.push({
          title: "Discount",
          dataIndex: "Discount",
          key: "Discount",
          render: (text) => <a>{text}%</a>,
        });

        setColumns(columns);
        let rowData = [];
        let uniqueWare = new Set();
        rows.slice(1, rows.length).map((row) => {
          const rowValues = row.split(",");
          let obj = { Discount: (Math.random() * 20).toFixed(2) };
          rowValues.map((value, index) => {
            if (index === 5) uniqueWare.add(value);
            obj[columns[index]?.title] = value;
          });
          rowData.push(obj);
        });
        // setData(rowData);
      });
  }, []);

  const items = [
    {
      key: "1",
      label: "Recommendations",
      children: <VendorRecommendations data={data} />,
    },
    {
      key: "2",
      label: "Dataset",
      children: <VendorsTable columns={columns} data={data} />,
    },
  ];
  return (
    <Card className="my-5 overflow-scroll">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="-mt-3"
      />
    </Card>
  );
};
export default Vendors;
