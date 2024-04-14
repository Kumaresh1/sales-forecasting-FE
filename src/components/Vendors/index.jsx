import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import textfile from "../../assets/dataset/vendors.txt";

export const VendorsTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(textfile)
      .then((r) => r.text())
      .then((text) => {
        console.log("Output");

        let rows = text.split("\n");
        let columns = rows[0].split(",").map((value) => ({
          title: value,
          dataIndex: value,
          key: value,
          render: (text) => <a>{text}</a>,
        }));
        setColumns(columns);
        let rowData = [];
        let uniqueWare = new Set();
        rows.slice(1, rows.length).map((row) => {
          const rowValues = row.split(",");
          console.log(rowValues);
          let obj = {};
          rowValues.map((value, index) => {
            if (index === 5) uniqueWare.add(value);
            obj[columns[index]?.title] = value;
          });
          rowData.push(obj);
        });
        console.log(uniqueWare, "ROW");
        setData(rowData);
      });
  }, []);

  return (
    <div className="overflow-scroll">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
