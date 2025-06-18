import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { UserOutlined, TagOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface BasicInfoStepProps {
  handleInputChange?: (field: string, value: string) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ handleInputChange }) => {
  return (
    <div className="space-y-2">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className="space-y-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
              style={{ marginBottom: '10px' }}
            >
              <Input
                suffix={<UserOutlined className="text-secondary" style={{ fontWeight: '100' }} />}
                placeholder="Enter your first name"
                size="large"
                className="rounded-lg pt-2 pb-2"
                onChange={(e) => handleInputChange?.('firstName', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
              style={{ marginBottom: '10px' }}
            >
              <Input
                suffix={<UserOutlined className="text-secondary" style={{ fontWeight: '100' }} />}
                placeholder="Enter your last name"
                size="large"
                className="rounded-lg pt-2 pb-2"
                onChange={(e) => handleInputChange?.('lastName', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="tagLine"
              label="Tag Line"
              rules={[{ required: true, message: 'Please enter your tag line' }]}
              style={{ marginBottom: '10px' }}
            >
              <Input
                suffix={<TagOutlined className="text-secondary" style={{ fontWeight: '100' }} />}
                placeholder="Enter your tag line"
                size="large"
                className="rounded-lg pt-2 pb-2"
                onChange={(e) => handleInputChange?.('tagLine', e.target.value)}
              />
            </Form.Item>
          </div>
        </Col>

        <Col span={12}>
          <div className="space-y-2">
            <div>
              <span className="text-gray-800  text-sm block mb-1" style={{ fontWeight: '500' }}>
                About
              </span>
              <p className="text-[rgb(75 85 99)] text-[11px] mb-2">
                Tell us about yourself and your experience.
              </p>
            </div>
            <Form.Item
              name="about"
              rules={[{ required: true, message: 'Please tell us about yourself' }]}
            >
              <TextArea
                rows={12}
                placeholder="Share your story..."
                className="rounded-lg pt-2 pb-2 resize-none"
                onChange={(e) => handleInputChange?.('about', e.target.value)}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInfoStep;
