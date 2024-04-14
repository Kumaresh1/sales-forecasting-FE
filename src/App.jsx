import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { PredictSales } from "./components/PredictSales";
import { VendorsTable } from "./components/Vendors";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [activeKey, setactiveKey] = useState("1");
  const items = [
    getItem("Predict Sales", "1", <PieChartOutlined />),
    getItem("Vendors", "2", <DesktopOutlined />),
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => setactiveKey(key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            // padding: 30,
            // margin: "20px 30px",

            background: colorBgContainer,
          }}
          className="text-lg font-bold  "
        >
          <div className="mt-2 -ml-4">
            {activeKey === "1" ? "Sales Forecasting" : "Vendors"}
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {activeKey === "1" ? <PredictSales /> : <VendorsTable />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
