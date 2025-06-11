'use client';
import React from 'react';
import { Form, Input, Card, Typography, Row, Col, Checkbox, Slider } from 'antd';

const { Title, Text } = Typography;

interface ProfessionalDetailsProps {
  initialValues?: any;
}

const clientsOptions = [
  { label: 'Buyers', value: 'buyers' },
  { label: 'Sellers', value: 'sellers' },
  { label: 'Investors', value: 'investors' },
  { label: 'Renters', value: 'renters' },
];

const propertiesOptions = [
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Luxury', value: 'luxury' },
  { label: 'Multi-family', value: 'multi_family' },
  { label: 'Land', value: 'land' },
];

const cardStyle = {
  borderRadius: 8,
  border: '1px solid #d9d9d9',
  padding: 16,
  textAlign: 'center' as const,
  cursor: 'pointer',
  userSelect: 'none' as const,
};

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // handle form submission
    console.log(values);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={3} style={{ marginBottom: 8, color: '#1f2937' }}>
          Professional Details
        </Title>
        <Text style={{ color: '#6b7280' }}>
          Please provide your professional experience and qualifications
        </Text>
      </div>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={initialValues}>
          {/* Slider for Years of Experience */}
          <Form.Item
            name="experienceYears"
            label={<Text strong>How many years have you been a licensed Realtor</Text>}
            rules={[{ required: true, message: 'Please select your experience years' }]}
          >
            <Slider min={1} max={50} step={1} tooltip={{ open: true }} />
          </Form.Item>

          <Row gutter={24}>
            {/* Regions / Neighborhoods */}
            <Col xs={24} md={24}>
              <Form.Item
                name="specializeRegions"
                label={<Text strong>What regions/neighborhoods do you specialize in</Text>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter regions or neighborhoods you specialize in',
                  },
                ]}
              >
                <Input placeholder="Enter regions or neighborhoods" />
              </Form.Item>
            </Col>
          </Row>

          {/* Clients Section */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5} style={{ marginBottom: 16 }}>
              What types of clients do you typically serve? <span style={{ color: 'red' }}>*</span>
            </Title>
            <Form.Item
              name="clientTypes"
              rules={[
                {
                  required: true,
                  message: 'Please select at least one client type',
                  type: 'array',
                  min: 1,
                },
              ]}
            >
              <Checkbox.Group>
                <Row gutter={16}>
                  {clientsOptions.map(({ label, value }) => (
                    <Col xs={24} sm={12} md={6} key={value}>
                      <Card
                        hoverable
                        style={cardStyle}
                        bodyStyle={{ padding: '1px 0', textAlign: 'center' }}
                      >
                        <Checkbox value={value} style={{ fontWeight: 500 }}>
                          {label}
                        </Checkbox>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>

          {/* Properties Section */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5} style={{ marginBottom: 16 }}>
              What types of properties do you specialize in
            </Title>
            <Form.Item name="propertyTypes">
              <Checkbox.Group>
                <Row gutter={16}>
                  {propertiesOptions.map(({ label, value }) => (
                    <Col xs={24} sm={12} md={6} key={value}>
                      <Card
                        hoverable
                        style={cardStyle}
                        bodyStyle={{ padding: '1px 0', textAlign: 'left' }}
                        className="mt-2"
                      >
                        <Checkbox value={value} style={{ fontWeight: 500 }}>
                          {label}
                        </Checkbox>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ProfessionalDetails;
