'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Modal, Steps, Form, Upload, message, Avatar, Button } from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  UserOutlined,
  FileTextOutlined,
  ReadOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const { Title, Text } = Typography;
const { Step } = Steps;

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const LOCAL_STORAGE_KEY = 'profileData';

const ProfilePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [shortBio, setShortBio] = useState('');
  const [longBio, setLongBio] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfileData(parsed);
      setShortBio(parsed.shortBio || '');
      setLongBio(parsed.longBio || '');

      if (parsed.images?.length) {
        setFileList(
          parsed.images.map((url: string, idx: number) => ({
            uid: `saved-${idx}`,
            name: `Image-${idx + 1}`,
            status: 'done',
            url,
          }))
        );
      }
    }
  }, []);

  useEffect(() => {
    if (modalOpen && profileData) {
      form.setFieldsValue({
        shortBio: profileData.shortBio || '',
        longBio: profileData.longBio || '',
      });
      setShortBio(profileData.shortBio || '');
      setLongBio(profileData.longBio || '');

      if (profileData.images?.length) {
        setFileList(
          profileData.images.map((url: string, idx: number) => ({
            uid: `saved-${idx}`,
            name: `Image-${idx + 1}`,
            status: 'done',
            url,
          }))
        );
      } else {
        setFileList([]);
      }
    }
    if (!modalOpen) {
      setCurrentStep(0);
    }
  }, [modalOpen, profileData, form]);

  const steps = [
    {
      title: 'Short Bio',
      icon: <FileTextOutlined />,
      content: (
        <Form.Item
          name="shortBio"
          label="Short Bio"
          rules={[{ required: true, message: 'Please enter a short bio' }]}
        >
          <ReactQuill
            value={shortBio}
            onChange={(val) => {
              setShortBio(val);
              form.setFieldValue('shortBio', val);
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Long Bio',
      icon: <ReadOutlined />,
      content: (
        <Form.Item
          name="longBio"
          label="Long Bio"
          rules={[{ required: true, message: 'Please enter a long bio' }]}
        >
          <ReactQuill
            value={longBio}
            onChange={(val) => {
              setLongBio(val);
              form.setFieldValue('longBio', val);
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Upload Photos',
      icon: <CameraOutlined />,
      content: (
        <Form.Item label="Upload Photos">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList.slice(-1))}
            maxCount={1}
            accept="image/*"
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      ),
    },
  ];

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  const getBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();

      const images: string[] = [];
      for (const file of fileList) {
        if (file.url) {
          images.push(file.url);
        } else if (file.originFileObj) {
          const base64 = await getBase64(file.originFileObj);
          images.push(base64 as string);
        }
      }

      const dataToSave = {
        ...values,
        shortBio,
        longBio,
        images,
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      setProfileData(dataToSave);
      message.success('Profile saved successfully!');
      setModalOpen(false);
    } catch {
      message.error('Please fill all required fields before saving');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-4xl mx-auto rounded-3xl overflow-hidden">
        <div className="relative  h-36 flex justify-center items-end pb-4">
          {profileData?.images?.[0] ? (
            <Avatar
              size={120}
              src={profileData.images[0]}
              className="border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300"
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
              }}
            />
          ) : (
            <Avatar
              size={120}
              icon={<UserOutlined />}
              className="border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300"
              style={{
                backgroundColor: '#fff',
                color: '#3A57E8',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
              }}
            />
          )}
        </div>

        <div className="p-8 bg-white">
          <div className="flex justify-between items-center mb-8">
            <Title level={2} className="text-gray-800">
              Your Profile
            </Title>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setModalOpen(true)}
              className="rounded-lg shadow hover:shadow-md transition-all duration-300"
              style={{
                background: '#3A57E8',
                border: 'none',
                padding: '8px 20px',
                height: 'auto',
                fontWeight: 500,
              }}
            >
              {profileData ? 'Edit Profile' : 'Create Profile'}
            </Button>
          </div>

          {profileData ? (
            <>
              <div className="mb-8">
                <Text strong className="block mb-2 text-lg text-gray-700">
                  Short Bio
                </Text>
                <div
                  className="prose max-w-none border p-4 rounded-lg bg-gradient-to-tr from-sky-50 to-indigo-50"
                  dangerouslySetInnerHTML={{ __html: profileData.shortBio }}
                />
              </div>

              <div className="mb-8">
                <Text strong className="block mb-2 text-lg text-gray-700">
                  Long Bio
                </Text>
                <div
                  className="prose max-w-none border p-4 rounded-lg bg-gradient-to-tr from-sky-50 to-indigo-50"
                  dangerouslySetInnerHTML={{ __html: profileData.longBio }}
                />
              </div>
            </>
          ) : (
            <Text type="secondary">
              No profile information available. Click create profile to add.
            </Text>
          )}
        </div>
      </Card>

      <Modal
        title={profileData ? 'Edit Profile' : 'Create Profile'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={720}
        destroyOnClose
        className="rounded-xl"
      >
        <Steps current={currentStep} className="mb-6">
          {steps.map((s) => (
            <Step key={s.title} title={s.title} icon={s.icon} />
          ))}
        </Steps>

        <Form form={form} layout="vertical" autoComplete="off">
          {steps[currentStep].content}

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button
                onClick={prev}
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
            <div className="ml-auto">
              {currentStep < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={next}
                  className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                  style={{
                    background: '#3A57E8',
                    border: 'none',
                    padding: '8px 20px',
                    height: 'auto',
                    fontWeight: 500,
                  }}
                >
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleFinish}
                  className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                  style={{
                    background: '#3A57E8',
                    border: 'none',
                    padding: '8px 20px',
                    height: 'auto',
                    fontWeight: 500,
                  }}
                >
                  Save Profile
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
