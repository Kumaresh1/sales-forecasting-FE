import { useState } from "react";
import {
  DashboardFilled,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Vendors from "./components/Vendors";
import Dashboard from "./components/DashBoard";
import { PredictSales } from "./components/Sales/PredictSales";
const { Header, Content, Sider } = Layout;
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
    token: { colorBgContainer },
  } = theme.useToken();

  const [activeKey, setactiveKey] = useState("0");
  const items = [
    getItem("", "5", <div className="hidden " />),

    getItem("Dashboard", "0", <DashboardFilled />),

    getItem(" Sales", "1", <PieChartOutlined />),
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
        className="sticky"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
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
            {activeKey === "1"
              ? "Sales "
              : activeKey === "0"
              ? "Dashboard"
              : "Vendors"}
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {activeKey === "1" ? (
            <PredictSales />
          ) : activeKey === "0" ? (
            <Dashboard />
          ) : (
            <Vendors />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
