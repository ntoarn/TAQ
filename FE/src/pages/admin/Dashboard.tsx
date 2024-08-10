import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import instance from '../../apis';
import { IUser } from '../../interfaces/User';
import { IOrder } from '../../interfaces/Order';

const Dashboard = () => {
  const [userData, setUserData] = useState<{ name: string; count: number }[]>([]);
  const [orderData, setOrderData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.get(`/users`);
        console.log('Dữ liệu người dùng:', response.data); // In dữ liệu ra console để kiểm tra
        setUserData(response.data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu người dùng:', error);
      }
    })();
  }, []);

  useEffect(() => {
  (async () => {
    try {
      const response = await instance.get(`/order`);
      // Giả sử mỗi đơn hàng có thuộc tính `status` và mỗi trạng thái có một màu cụ thể
      const formattedData = response.data.reduce((acc: { [key: string]: number }, order: IOrder) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      // Định dạng dữ liệu để phù hợp với cấu trúc của biểu đồ
      const formattedOrderData = Object.keys(formattedData).map((status) => ({
        name: status,
        count: formattedData[status]
      }));
      
      setOrderData(formattedOrderData);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy dữ liệu đơn hàng:', error);
    }
  })();
}, []);


  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Thống Kê Người Dùng">
            <BarChart
              width={500}
              height={300}
              data={userData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Thống Kê Đơn Hàng">
            <BarChart
              width={500}
              height={300}
              data={orderData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
