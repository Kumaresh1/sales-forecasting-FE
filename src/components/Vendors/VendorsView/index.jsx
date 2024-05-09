import { Table } from "antd";
import { useEffect, useState } from "react";

export const VendorsTable = ({ columns, data }) => {
  return (
    <div className="overflow-scroll">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
