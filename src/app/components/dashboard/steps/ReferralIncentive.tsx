'use client';
import React from 'react';
import { Form, Input, Card, Typography, Select, InputNumber, Switch, Row, Col } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface ReferralIncentiveProps {
  initialValues?: any;
}

const ReferralIncentive: React.FC<ReferralIncentiveProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={3} style={{ marginBottom: 8, color: '#1f2937' }}>
          Referral & Incentive Programs
        </Title>
        <Text style={{ color: '#6b7280' }}>
          Please provide information about your referral and incentive preferences
        </Text>
      </div>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Form form={form} layout="vertical" initialValues={initialValues}>
          <Form.Item
            name="interestedInReferral"
            label={<Text strong>Interested in Referral Program</Text>}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="referralType"
                label={<Text strong>Preferred Referral Type</Text>}
                rules={[{ required: true, message: 'Please select referral type' }]}
              >
                <Select placeholder="Select referral type">
                  <Option value="client">Client Referrals</Option>
                  <Option value="agent">Agent Referrals</Option>
                  <Option value="both">Both Client & Agent</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="referralIncentive"
                label={<Text strong>Referral Incentive</Text>}
                rules={[{ required: true, message: 'Please enter referral incentive' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  prefix={<PercentageOutlined className="text-gray-400" />}
                  suffix="%"
                  className="w-full"
                  placeholder="Enter referral percentage"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="incentivePrograms"
            label={<Text strong>Incentive Programs</Text>}
            rules={[{ required: true, message: 'Please select incentive programs' }]}
          >
            <Select mode="multiple" placeholder="Select incentive programs">
              <Option value="performance">Performance Bonuses</Option>
              <Option value="milestone">Milestone Rewards</Option>
              <Option value="team">Team Incentives</Option>
              <Option value="recognition">Recognition Programs</Option>
              <Option value="training">Training & Development</Option>
              <Option value="travel">Travel Incentives</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="incentiveStructure"
            label={<Text strong>Incentive Structure</Text>}
            rules={[{ required: true, message: 'Please describe incentive structure' }]}
          >
            <Input.TextArea
              placeholder="Describe your preferred incentive structure and rewards"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="additionalIncentives"
            label={<Text strong>Additional Incentive Ideas</Text>}
            rules={[{ required: true, message: 'Please describe additional incentive ideas' }]}
          >
            <Input.TextArea
              placeholder="Share any additional incentive ideas or preferences"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ReferralIncentive;
