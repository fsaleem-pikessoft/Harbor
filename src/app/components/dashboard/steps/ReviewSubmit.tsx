'use client';
import React from 'react';
import { Button, Card, Typography, Descriptions } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ReviewSubmitProps {
  onPrev: () => void;
  onSubmit: () => void;
  formData: any;
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ onPrev, onSubmit, formData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <Title level={3} className="text-gray-800 mb-2">
          Review and Submit
        </Title>
        <Text className="text-gray-500">Please review your information before submitting</Text>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="space-y-8">
          <div>
            <Title level={4} className="text-gray-700 mb-4">
              Basic Information
            </Title>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Full Name">{formData.fullName}</Descriptions.Item>
              <Descriptions.Item label="Email">{formData.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{formData.phone}</Descriptions.Item>
              <Descriptions.Item label="License Number">{formData.licenseNumber}</Descriptions.Item>
              <Descriptions.Item label="Issuing State">{formData.licenseState}</Descriptions.Item>
              <Descriptions.Item label="Company/Agency">{formData.companyName}</Descriptions.Item>
              <Descriptions.Item label="Office Location">
                {formData.officeAddress}
              </Descriptions.Item>
              {formData.website && (
                <Descriptions.Item label="Website/Social Media">
                  {formData.website}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>

          <div>
            <Title level={4} className="text-gray-700 mb-4">
              Professional Details
            </Title>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Years of Experience">
                {formData.yearsOfExperience}
              </Descriptions.Item>
              <Descriptions.Item label="Specialization">
                {formData.specialization}
              </Descriptions.Item>
              <Descriptions.Item label="Average Transaction Value">
                {formData.averageTransactionValue}
              </Descriptions.Item>
              <Descriptions.Item label="Team Size">{formData.teamSize}</Descriptions.Item>
              <Descriptions.Item label="Notable Achievements">
                {formData.achievements}
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div>
            <Title level={4} className="text-gray-700 mb-4">
              Service Areas
            </Title>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Primary Service Area">
                {formData.primaryServiceArea}
              </Descriptions.Item>
              <Descriptions.Item label="Coverage Radius">
                {formData.coverageRadius}
              </Descriptions.Item>
              <Descriptions.Item label="Additional Areas">
                {formData.additionalAreas}
              </Descriptions.Item>
              <Descriptions.Item label="Services Offered">
                {formData.serviceTypes?.join(', ')}
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              onClick={onPrev}
              className="w-1/2 h-10 text-base font-medium hover:opacity-90 transition-opacity duration-300"
            >
              Previous
            </Button>
            <Button
              type="primary"
              onClick={onSubmit}
              icon={<CheckCircleOutlined />}
              className="w-1/2 h-10 text-base font-medium hover:opacity-90 transition-opacity duration-300"
            >
              Submit Application
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReviewSubmit;
