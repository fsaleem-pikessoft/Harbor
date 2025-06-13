'use client';
import React from 'react';
import { Form, Radio, Checkbox, Typography, Card } from 'antd';

const { Title, Text } = Typography;

interface SupportTrainingProps {
  initialValues?: any;
}

const SupportTraining: React.FC<SupportTrainingProps> = ({ initialValues }) => {
  const [form] = Form.useForm();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <div className="text-center mb-10">
        <Title level={3} className="text-gray-800 mb-2">
          Support & Training Preferences
        </Title>
        <Text className="text-gray-500">
          Help us tailor your experience by sharing your preferences
        </Text>
      </div>

      <Card
        bordered={false}
        className="rounded-2xl shadow-md transition-all duration-300"
        style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.05)' }}
      >
        <Form form={form} layout="vertical" initialValues={initialValues} className="space-y-8">
          <Form.Item
            name="techExperience"
            label={
              <Text strong className="text-base text-gray-700">
                What level of tech experience do you have?
              </Text>
            }
            rules={[{ required: true, message: 'Please select your experience level' }]}
          >
            <Radio.Group className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <Radio
                    key={level}
                    value={level.toLowerCase()}
                    className="p-4 border rounded-lg w-full text-center hover:border-blue-400 transition"
                  >
                    {level}
                  </Radio>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="onboardingSession"
            label={
              <Text strong className="text-base text-gray-700">
                Would you like to schedule a 1:1 onboarding session?
              </Text>
            }
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <Radio.Group className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Yes', 'No'].map((option) => (
                  <Radio
                    key={option}
                    value={option.toLowerCase()}
                    className="p-4 border rounded-lg w-full text-center hover:border-blue-400 transition"
                  >
                    {option}
                  </Radio>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="supportPreference"
            label={
              <Text strong className="text-base text-gray-700">
                What kind of support do you prefer?
              </Text>
            }
            rules={[{ required: true, message: 'Please select at least one support type' }]}
          >
            <Checkbox.Group className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Live chat', value: 'live_chat' },
                  { label: 'Help articles', value: 'help_articles' },
                  { label: 'Video tutorials', value: 'video_tutorials' },
                  { label: 'Phone support', value: 'phone_support' },
                ].map((item) => (
                  <Checkbox
                    key={item.value}
                    value={item.value}
                    className="p-4 border rounded-lg hover:border-blue-400 transition w-full"
                  >
                    {item.label}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SupportTraining;
