'use client';
import React, { useState, useEffect } from 'react';
import { Button, message, Card, Row, Col } from 'antd';
import {
  CheckCircleOutlined,
  RightOutlined,
  LeftOutlined,
  UserOutlined,
  SolutionOutlined,
  AimOutlined,
  ToolOutlined,
  BarChartOutlined,
  RiseOutlined,
  ReadOutlined,
  GiftOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import BasicInformation from './steps/BasicInformation';
import ProfessionalDetails from './steps/ProfessionalDetails';
import GoalsPreferences from './steps/GoalsPreferences';
import ToolsSystems from './steps/ToolsSystems';
import LeadListingManagement from './steps/LeadListingManagement';
import MarketingBranding from './steps/MarketingBranding';
import SupportTraining from './steps/SupportTraining';
import ReferralIncentive from './steps/ReferralIncentive';
import ComplianceLegal from './steps/ComplianceLegal';

const RgProfile: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [current]);

  const steps = [
    {
      title: 'Basic Information',
      icon: <UserOutlined />,
      content: <BasicInformation initialValues={formData} />,
    },
    {
      title: 'Professional Details',
      icon: <SolutionOutlined />,
      content: <ProfessionalDetails initialValues={formData} />,
    },
    {
      title: 'Goals & Preferences',
      icon: <AimOutlined />,
      content: <GoalsPreferences initialValues={formData} />,
    },
    {
      title: 'Tools & Systems',
      icon: <ToolOutlined />,
      content: <ToolsSystems initialValues={formData} />,
    },
    {
      title: 'Lead & Listing',
      icon: <BarChartOutlined />,
      content: <LeadListingManagement initialValues={formData} />,
    },
    {
      title: 'Marketing & Branding',
      icon: <RiseOutlined />,
      content: <MarketingBranding initialValues={formData} />,
    },
    {
      title: 'Support & Training',
      icon: <ReadOutlined />,
      content: <SupportTraining initialValues={formData} />,
    },
    {
      title: 'Compliance & Legal',
      icon: <SafetyCertificateOutlined />,
      content: <ComplianceLegal initialValues={formData} />,
    },
    {
      title: 'Referral & Incentive',
      icon: <GiftOutlined />,
      content: <ReferralIncentive initialValues={formData} />,
    },
  ];

  function handleNext() {
    const currentStepData = steps[current].content.props.initialValues;
    setFormData({ ...formData, ...currentStepData });
    setCurrent(current + 1);
  }

  function handlePrev() {
    setCurrent(current - 1);
  }

  function handleSubmit() {
    message.success('Application submitted successfully!');
  }

  return (
    <div className="min-h-screen p-8">
      <Card>
        {/* Step Titles Above */}
        <div className="mb-8">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center transition-all duration-300"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    index === current
                      ? 'bg-blue-600 border-blue-600 text-white scale-110'
                      : index < current
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {index < current ? (
                    <CheckCircleOutlined className="text-sm" />
                  ) : (
                    <span className="text-sm">{step.icon}</span>
                  )}
                </div>
                <div className="text-[10px] md:text-xs font-medium mt-1 text-gray-600 line-clamp-2 h-8">
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div>{steps[current].content}</div>

        {/* Navigation */}
        <Row justify="space-between" className="mt-8 px-4">
          <Col>
            {current > 0 && (
              <Button
                size="small"
                icon={<LeftOutlined />}
                onClick={handlePrev}
                className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                style={{
                  border: '1px solid #E5E7EB',
                  padding: '8px 20px',
                  height: 'auto',
                  fontWeight: 500,
                }}
              >
                Previous
              </Button>
            )}
          </Col>
          <Col>
            {current < steps.length - 1 ? (
              <Button
                size="small"
                icon={<RightOutlined />}
                onClick={handleNext}
                className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                style={{
                  background: 'rgba(226, 213, 255, 0.3)',
                  border: 'none',
                  padding: '8px 20px',
                  height: 'auto',
                  fontWeight: 500,
                  color: 'white',
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                size="small"
                icon={<CheckCircleOutlined />}
                onClick={handleSubmit}
                className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                style={{
                  background: 'rgba(226, 213, 255, 0.3)',
                  border: 'none',
                  padding: '8px 20px',
                  height: 'auto',
                  fontWeight: 500,
                  color: 'white',
                }}
              >
                Complete
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RgProfile;
