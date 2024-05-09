import { List, Segmented, Select, Table, Typography } from "antd";
import { useState } from "react";

const findTopVendorsByCategory = (data) => {
  const vendorsByCategory = {};
  data.forEach((vendor) => {
    const category = vendor.vendorware;
    if (!vendorsByCategory[category]) {
      vendorsByCategory[category] = [];
    }
    vendorsByCategory[category].push(vendor);
  });

  const topVendorsByCategory = {};
  for (const category in vendorsByCategory) {
    const vendors = vendorsByCategory[category];
    vendors.sort((a, b) => parseFloat(b.Discount) - parseFloat(a.Discount));
    const topVendors = vendors.slice(0, 5);
    topVendorsByCategory[category] = topVendors;
  }

  return topVendorsByCategory;
};

const TopVendorsList = ({ data }) => {
  const [currentCategory, setCurrentCategory] = useState(Object.keys(data)[0]);

  return (
    <div className="overflow-scroll">
      <Select
        value={currentCategory}
        onChange={(value) => setCurrentCategory(value)}
        style={{ width: 200, marginBottom: 20 }}
      >
        {Object.keys(data).map((category) => (
          <Select.Option key={category} value={category}>
            {category}
          </Select.Option>
        ))}
      </Select>
      {/* <Segmented
        options={Object.keys(data)}
        onChange={(value) => setCurrentCategory(value)}
        defaultValue={currentCategory}
        size="large"
      /> */}

      <Typography.Title level={4}>Our Recommendations</Typography.Title>

      {Object.entries(data)
        .filter(([category]) => category === currentCategory)
        .map(([category, vendors]) => (
          <div key={category}>
            <List
              dataSource={vendors}
              renderItem={(vendor) => (
                <List.Item>
                  <List.Item.Meta
                    title={vendor.vendorname}
                    description={`Discount: ${vendor.Discount}`}
                  />
                  <div>
                    <p>Vendor ID: {vendor.vendorid}</p>
                    <p>Vendor Type: {vendor.vendortype}</p>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ))}
    </div>
  );
};

export const VendorRecommendations = ({ data }) => {
  const topVendorsByCategory = findTopVendorsByCategory(data);

  return (
    <div>
      <TopVendorsList data={topVendorsByCategory} />
    </div>
  );
};
