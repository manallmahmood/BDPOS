import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from 'axios';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, message } from 'antd';
import 'antd/dist/antd.css'; // Import Ant Design styles

const { Title, Text } = Typography;

const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [error, setError] = useState(null);  // Add error state
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Form instance

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        console.log(data);
      } catch (err) {
        setError(err.message);  // Update error state
        console.log(err.message);  // Log the error
      }
    };
    getAllItems();
  }, []);

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      await axios.post("/api/items/add-item", values);
      message.success('Item added successfully');
      setIsModalVisible(false);
      form.resetFields();
      // Refresh items list
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
    } catch (err) {
      message.error('Failed to add item');
      console.log(err);
    }
  };

  return (
    <DefaultLayout>
      <Title level={2}>Item Page</Title>
      {error && <Text type="danger">Error: {error}</Text>}  {/* Display error if it exists */}
      
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
        Add New Item
      </Button>

      <Row gutter={16}>
        {itemsData.map(item => (
          <Col span={8} key={item._id}>
            <Card
              hoverable
              cover={<img alt={item.Name} src={item.Image} />}
              actions={[
                <Button type="primary">Add to Cart</Button>
              ]}
            >
              <Card.Meta
                title={item.Name}
                description={`Price: $${item.Price}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Add New Item"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            name="Name"
            label="Item Name"
            rules={[{ required: true, message: 'Please input the item name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Price"
            label="Price"
            rules={[{ required: true, message: 'Please input the item price!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Image"
            label="Image URL"
            rules={[{ required: true, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default ItemPage;
