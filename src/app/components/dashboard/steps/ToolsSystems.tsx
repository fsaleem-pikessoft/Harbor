'use client';
import React from 'react';
import { Form, Select, Checkbox, Row, Col, Card, Typography } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const platformOptions = [
  { label: 'MLS', value: 'mls' },
  { label: 'Zillow', value: 'zillow' },
  { label: 'Redfin', value: 'redfin' },
  { label: 'Realtor.com', value: 'realtor_com' },
  { label: 'DocuSign / eSignature tools', value: 'docusign' },
  { label: 'Transaction management tools', value: 'transaction_management' },
];

const ToolsSystems = ({ initialValues }: { initialValues?: any }) => {
  const [form] = Form.useForm();

  return (
    <div>
      <div className="text-center mb-8">
        <Title level={3} className="text-gray-800 mb-2">
          Current Tools & Systems
        </Title>
        <Text className="text-gray-500">
          Please provide information about your existing software and tools
        </Text>
      </div>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Form form={form} layout="vertical" initialValues={initialValues}>
          {/* CRM Multi-select */}
          <Form.Item
            name="crmSystems"
            label={
              <Text strong>
                What CRM system (if any) do you currently use?{' '}
                <span className="text-red-500">*</span>
              </Text>
            }
            rules={[{ required: true, message: 'Please select at least one CRM system' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select CRM systems"
              allowClear
              className="transition-colors duration-300"
            >
              <Option value="none">No CRM</Option>
              <Option value="followupboss">Follow Up Boss</Option>
              <Option value="kvcore">KVCore</Option>
              <Option value="chime">Chime</Option>
              <Option value="wiseagent">Wise Agent</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          {/* Platforms section */}
          <div className="mt-8 mb-4">
            <Title level={5}>Do you use any of the following platforms?</Title>
          </div>

          <Form.Item
            name="platforms"
            rules={[{ required: true, message: 'Please select at least one platform' }]}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Row gutter={[24, 24]}>
                {platformOptions.map(({ label, value }) => (
                  <Col xs={24} sm={12} md={8} key={value}>
                    <Card
                      hoverable
                      className="transition-all rounded-lg border border-gray-200 cursor-pointer"
                      bodyStyle={{ padding: 10 }}
                    >
                      <Checkbox value={value} style={{ fontSize: 14, fontWeight: 500 }}>
                        {label}
                      </Checkbox>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ToolsSystems;
