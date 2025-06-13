import React from 'react';
import { Form, Input, Row, Col, Card, Typography } from 'antd';
import { UserOutlined, TagOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface BasicInfoStepProps {
  handleInputChange?: (field: string, value: string) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ handleInputChange }) => {
  return (
    <div className="space-y-4">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card
            className="shadow-sm hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm"
            bodyStyle={{ padding: '24px' }}
          >
            <div className="space-y-4">
              <Form.Item
                name="firstName"
                label={<Text strong>First Name</Text>}
                rules={[{ required: true, message: 'Please enter your first name' }]}
                className="mb-0"
              >
                <Input
                  size="large"
                  placeholder="Enter your first name"
                  prefix={<UserOutlined className="text-blue-500" />}
                  className="rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  onChange={(e) => handleInputChange?.('firstName', e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={<Text strong>Last Name</Text>}
                rules={[{ required: true, message: 'Please enter your last name' }]}
                className="mb-0"
              >
                <Input
                  size="large"
                  placeholder="Enter your last name"
                  prefix={<UserOutlined className="text-blue-500" />}
                  className="rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  onChange={(e) => handleInputChange?.('lastName', e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="tagLine"
                label={<Text strong>Tag Line</Text>}
                rules={[{ required: true, message: 'Please enter your tag line' }]}
                className="mb-0"
              >
                <Input
                  size="large"
                  placeholder="Enter your tag line"
                  prefix={<TagOutlined className="text-blue-500" />}
                  className="rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  onChange={(e) => handleInputChange?.('tagLine', e.target.value)}
                />
              </Form.Item>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            className="shadow-sm hover:shadow-lg transition-all duration-300 border-0 h-full bg-white/50 backdrop-blur-sm"
            bodyStyle={{ padding: '24px' }}
          >
            <div className="space-y-3">
              <div>
                <span className="text-gray-800 font-semibold text-sm block mb-1">About</span>
                <p className="text-gray-600 text-sm mb-2">
                  Tell us about yourself and your experience.
                </p>
              </div>
              <Form.Item
                name="about"
                rules={[{ required: true, message: 'Please tell us about yourself' }]}
                className="mb-0"
              >
                <TextArea
                  rows={12}
                  placeholder="Share your story..."
                  className="resize-none rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  onChange={(e) => handleInputChange?.('about', e.target.value)}
                />
              </Form.Item>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInfoStep;
