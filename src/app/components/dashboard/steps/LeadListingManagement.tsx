'use client';
import React, { useState } from 'react';
import { Card, Typography, Row, Col, Radio } from 'antd';

const { Title, Text } = Typography;

const cardStyle = {
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  height: '100%',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '1px solid #f0f0f0',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    borderColor: '#1890ff',
  },
};

const listingsData = [
  {
    value: 'mls',
    title: 'MLS Only',
    description: 'I rely solely on MLS for listing management.',
  },
  {
    value: 'spreadsheets',
    title: 'Spreadsheets',
    description: 'I track my listings using spreadsheets.',
  },
  {
    value: 'crm',
    title: 'CRM System',
    description: 'I use my CRM to manage listings.',
  },
  {
    value: 'listing_software',
    title: 'Dedicated Listing Software',
    description: 'I use specialized software for listing management.',
  },
  {
    value: 'manual',
    title: 'Manual Tracking',
    description: 'I manage listings manually without software.',
  },
];

const leadsData = [
  {
    value: 'referrals',
    title: 'Referrals',
    description: 'I primarily rely on referrals from past clients.',
  },
  {
    value: 'online_marketing',
    title: 'Online Marketing',
    description: 'I use digital marketing to generate leads.',
  },
  {
    value: 'lead_services',
    title: 'Lead Generation Services',
    description: 'I purchase leads from third-party services.',
  },
  {
    value: 'networking',
    title: 'Networking Events',
    description: 'I find leads through in-person networking.',
  },
  {
    value: 'traditional',
    title: 'Traditional Advertising',
    description: 'I use print ads, billboards, mailers, etc.',
  },
];

interface Props {
  initialValues: any;
}

const LeadListingManagement: React.FC<Props> = ({ initialValues }) => {
  const [listingMethod, setListingMethod] = useState<string>('');
  const [leadMethod, setLeadMethod] = useState<string>('');

  return (
    <div>
      <div className="text-center mb-8">
        <Title level={3} className="text-gray-800 mb-2">
          Lead & Listing Management
        </Title>
        <Text className="text-gray-500">
          Provide insights into how you manage listings and leads.
        </Text>
      </div>
      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Title level={4} className="text-gray-700 mb-4">
          How do you currently manage your listings? *
        </Title>
        <Radio.Group
          value={listingMethod}
          onChange={(e) => setListingMethod(e.target.value)}
          className="w-full"
        >
          <Row gutter={[24, 24]}>
            {listingsData.map((item) => (
              <Col xs={24} md={12} lg={8} key={item.value}>
                <Card
                  style={cardStyle}
                  className="hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                  bodyStyle={{ padding: '12px' }}
                >
                  <Radio value={item.value} className="w-full">
                    <div className="flex flex-col">
                      <Title level={5} className="mb-1 text-gray-800">
                        {item.title}
                      </Title>
                      <Text type="secondary" className="text-sm">
                        {item.description}
                      </Text>
                    </div>
                  </Radio>
                </Card>
              </Col>
            ))}
          </Row>
        </Radio.Group>

        <Title level={4} className="text-gray-700 mt-10 mb-4">
          How do you currently generate and track leads? *
        </Title>
        <Radio.Group
          value={leadMethod}
          onChange={(e) => setLeadMethod(e.target.value)}
          className="w-full"
        >
          <Row gutter={[24, 24]}>
            {leadsData.map((item) => (
              <Col xs={24} md={12} lg={8} key={item.value}>
                <Card
                  style={cardStyle}
                  className="hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                  bodyStyle={{ padding: '12px' }}
                >
                  <Radio value={item.value} className="w-full">
                    <div className="flex flex-col">
                      <Title level={5} className="mb-1 text-gray-800">
                        {item.title}
                      </Title>
                      <Text type="secondary" className="text-sm">
                        {item.description}
                      </Text>
                    </div>
                  </Radio>
                </Card>
              </Col>
            ))}
          </Row>
        </Radio.Group>

        <div className="mt-10">
          <Title level={4} className="text-gray-700">
            Would you like to import existing listings?
          </Title>
          <Text type="secondary">You can always import listings later from your dashboard.</Text>
        </div>

        <div className="mt-6">
          <Title level={4} className="text-gray-700">
            Would you like to auto-sync with MLS or another listing platform?
          </Title>
          <Text type="secondary">
            You can enable automatic synchronization later from your settings.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LeadListingManagement;
