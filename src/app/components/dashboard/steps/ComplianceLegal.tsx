'use client';
import React, { useState } from 'react';
import { Form, Upload, Checkbox, Typography, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
  initialValues: any;
}

const ComplianceLegal: React.FC<Props> = ({ initialValues }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleSubmit = (values: any) => {
    if (fileList.length === 0) {
      message.error('Please upload your real estate license');
      return;
    }
    console.log('Submitted values:', values);
    // Submission logic here
  };

  return (
    <div>
      <div className="text-center mb-8">
        <Title level={3} className="text-gray-800 mb-2">
          Compliance & Legal
        </Title>
        <Text className="text-gray-500">
          Please upload your license and agree to the required policies
        </Text>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label={<Text strong>Upload Real Estate License</Text>} required>
            <div className="flex justify-end">
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                onChange={handleUploadChange}
                accept=".pdf,.jpg,.jpeg,.png"
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
            <Text type="secondary" className="block mt-2 text-sm">
              Accepted formats: PDF, JPG, PNG
            </Text>
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('You must agree to the Terms & Conditions')),
              },
            ]}
          >
            <Checkbox>
              I agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="consent"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('You must consent to receive communications')),
              },
            ]}
          >
            <Checkbox>I consent to receive communications and updates</Checkbox>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ComplianceLegal;
