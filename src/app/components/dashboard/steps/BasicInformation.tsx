'use client';
import React from 'react';
import { Form, Input, Typography, Row, Col, Card } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  BankOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface BasicInformationProps {
  initialValues?: any;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    // submission logic
  };

  return (
    <div>
      <div className="text-center mb-8">
        <Title level={3} className="text-gray-800 mb-2">
          Basic Information
        </Title>
        <Text className="text-gray-500">
          Please provide your basic personal and contact information
        </Text>
      </div>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={initialValues}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label={<Text strong>Full Name</Text>}
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your full name"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label={<Text strong>Email Address</Text>}
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email address"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label={<Text strong>Phone Number</Text>}
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="Enter your phone number"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="licenseNumber"
                label={<Text strong>License Number</Text>}
                rules={[{ required: true, message: 'Please enter your license number' }]}
              >
                <Input
                  prefix={<IdcardOutlined className="text-gray-400" />}
                  placeholder="Enter your license number"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="licenseState"
                label={<Text strong>Issuing State</Text>}
                rules={[{ required: true, message: 'Please enter the issuing state' }]}
              >
                <Input
                  prefix={<IdcardOutlined className="text-gray-400" />}
                  placeholder="Enter the state that issued your license"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyName"
                label={<Text strong>Company/Agency Name</Text>}
                rules={[{ required: true, message: 'Please enter your company/agency name' }]}
              >
                <Input
                  prefix={<BankOutlined className="text-gray-400" />}
                  placeholder="Enter your company or agency name"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="officeAddress"
            label={<Text strong>Office Location</Text>}
            rules={[{ required: true, message: 'Please enter your office address' }]}
          >
            <Input.TextArea
              placeholder="Enter your office address"
              rows={3}
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="website"
            label={<Text strong>Website or Social Media Profiles (Optional)</Text>}
          >
            <Input
              prefix={<GlobalOutlined className="text-gray-400" />}
              placeholder="Enter your website or social profiles"
              className="rounded-lg"
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BasicInformation;
