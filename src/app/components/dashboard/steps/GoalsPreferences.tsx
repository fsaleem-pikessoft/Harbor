'use client';
import React from 'react';
import { Form, Input, Card, Typography, Select, Radio, Row, Col } from 'antd';
import { DollarOutlined, RiseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface GoalsPreferencesProps {
  initialValues?: any;
}

const primaryGoalOptions = [
  {
    value: 'leads',
    title: 'Generate more leads',
    description: 'Find new potential clients and expand your business',
  },
  {
    value: 'communication',
    title: 'Simplify client communication',
    description: 'Streamline how you interact with clients',
  },
  {
    value: 'listings',
    title: 'Manage listings more efficiently',
    description: 'Better organize and track your property listings',
  },
  {
    value: 'performance',
    title: 'Track sales performance',
    description: 'Monitor your business metrics and growth',
  },
  {
    value: 'automation',
    title: 'Automate workflows',
    description: 'Reduce manual tasks and save time',
  },
];

const GoalsPreferences: React.FC<GoalsPreferencesProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  return (
    <div>
      <div className="text-center mb-8">
        <Title level={3} className="text-gray-800 mb-2">
          Goals & Preferences
        </Title>
        <Text className="text-gray-500">Please share your career objectives and preferences</Text>
      </div>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Form form={form} layout="vertical" initialValues={initialValues}>
          {/* Primary Goal Section */}
          <Form.Item
            name="primaryGoal"
            label={
              <Text strong>
                What is your primary goal using this platform?{' '}
                <span className="text-red-500">*</span>
              </Text>
            }
            rules={[{ required: true, message: 'Please select your primary goal' }]}
          >
            <Radio.Group>
              <Row gutter={[16, 16]}>
                {primaryGoalOptions.map((goal) => {
                  const selected = form.getFieldValue('primaryGoal') === goal.value;
                  return (
                    <Col xs={24} md={12} key={goal.value}>
                      <Card
                        hoverable
                        onClick={() => form.setFieldsValue({ primaryGoal: goal.value })}
                        className={`transition-all rounded-xl ${
                          selected ? 'border-blue-500 border-2 shadow' : 'border border-gray-200'
                        }`}
                      >
                        <Radio value={goal.value} checked={selected} style={{ display: 'block' }}>
                          <Text strong>{goal.title}</Text>
                          <br />
                          <Text type="secondary">{goal.description}</Text>
                        </Radio>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Radio.Group>
          </Form.Item>

          {/* Monthly Clients Section */}
          <Form.Item
            name="monthlyClients"
            label={<Text strong>How many clients do you typically work with per month?</Text>}
            rules={[{ required: true, message: 'Please select one option' }]}
          >
            <Radio.Group>
              {['1+', '5+', '10+', '15+', '20+', '30+', '40+', '50+'].map((count) => (
                <Radio key={count} value={count} style={{ marginRight: 16 }}>
                  {count}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          {/* Team vs Independent Section */}
          <Form.Item
            name="workType"
            label={<Text strong>Do you work as part of a team or independently?</Text>}
            rules={[{ required: true, message: 'Please select one option' }]}
          >
            <Radio.Group>
              <Radio value="team" style={{ marginRight: 16 }}>
                Team
              </Radio>
              <Radio value="independent">Independent</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Interested in Leads Section */}
          <Form.Item
            name="interestedInLeads"
            label={<Text strong>Are you interested in receiving leads from the platform?</Text>}
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <>
              <Text type="secondary" className="block mb-2">
                You can always change this preference later in your account settings.
              </Text>
              <Radio.Group>
                <Radio value="yes" style={{ marginRight: 16 }}>
                  Yes
                </Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default GoalsPreferences;
