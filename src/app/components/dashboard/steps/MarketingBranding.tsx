'use client';
import React from 'react';
import { Form, Input, Card, Typography, Checkbox, Button, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface MarketingBrandingProps {
  initialValues?: any;
}

const MarketingBranding: React.FC<MarketingBrandingProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3} className="text-gray-800 mb-1">
            Marketing & Branding
          </Title>
          <Text className="text-gray-500">
            Please provide information about your marketing strategies and brand identity
          </Text>
        </div>
      </div>

      <Card
        className="mb-10 shadow-md rounded-xl"
        bordered={false}
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: 12 }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <div className="flex justify-end space-x-2 mb-4">
              <Button icon={<UploadOutlined />} className="rounded-lg">
                Upload Headshot
              </Button>
              <Button icon={<UploadOutlined />} className="rounded-lg">
                Upload Brand Logo
              </Button>
            </div>
          </Col>
        </Row>

        <Form form={form} layout="vertical" initialValues={initialValues} className="space-y-4">
          <Form.Item
            name="personalSlogan"
            label={<Text strong>Do you have a personal brand or slogan?</Text>}
          >
            <Input.TextArea
              placeholder="Enter your personal brand or slogan"
              rows={3}
              className="hover:border-blue-400 focus:border-blue-400 transition-colors duration-300"
            />
          </Form.Item>

          <Form.Item
            name="activeChannels"
            label={<Text strong>What marketing channels do you actively use?</Text>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Email', value: 'email' },
                { label: 'Social Media', value: 'social_media' },
                { label: 'Paid Ads', value: 'paid_ads' },
                { label: 'Direct Mail', value: 'direct_mail' },
              ].map((item) => (
                <Card
                  key={item.value}
                  className="hover:shadow-md transition cursor-pointer"
                  bodyStyle={{ padding: 12 }}
                >
                  <Checkbox value={item.value} style={{ fontWeight: 500 }}>
                    {item.label}
                  </Checkbox>
                </Card>
              ))}
            </div>
          </Form.Item>

          <Form.Item
            name="automatedMarketing"
            label={<Text strong>Would you be interested in automated marketing tools?</Text>}
          >
            <Checkbox>
              Our platform can automatically create and distribute marketing materials for your
              listings
            </Checkbox>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default MarketingBranding;
