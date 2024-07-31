import React, { useState, useEffect } from "react";
import { Button, Typography, Card, Row, Col } from 'antd';
import DefaultLayout from "./../components/DefaultLayout";
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import 'antd/dist/antd.css'; // Import Ant Design styles

const { Title, Text } = Typography;

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        console.log(data); // Debugging line
      } catch (err) {
        setError(err.message);
        console.log(err.message); // Debugging line
      }
    };
    getAllItems();
  }, []);

  const analyticsData = {
    totalSales: 5000,
    salesTrends: [
      { month: "January", amount: 1000 },
      { month: "February", amount: 1200 },
      { month: "March", amount: 1500 },
      { month: "April", amount: 1300 }
    ]
  };

  return (
    <DefaultLayout>
      <Title level={2}>Welcome to BDPOS</Title>
      <Button type="primary" size="large" href="/items" style={{ marginBottom: '20px' }}>
        Create New Order
      </Button>
      
      {error && <Text type="danger">Error: {error}</Text>}  {/* Display error if it exists */}
      
      <Title level={3} style={{ marginTop: '20px' }}>Sales Analytics</Title>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Total Sales" bordered={false} style={{ marginBottom: '20px' }}>
            <Title level={4}>${analyticsData.totalSales}</Title>
            {/* Bar chart to show total sales */}
            <BarChart
              width={600}
              height={300}
              data={[{ name: 'Total Sales', totalSales: analyticsData.totalSales }]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Sales Trends" bordered={false}>
            <LineChart
              width={600}
              height={300}
              data={analyticsData.salesTrends}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
