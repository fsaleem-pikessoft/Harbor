'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Modal, Steps, Form, message, Button, Row, Col, Avatar } from 'antd';
import {
  EditOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  ShareAltOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import BasicInfoStep from '../components/profile/BasicInfoStep';
import SocialMediaStep from '../components/profile/SocialMediaStep';
import VideoUploadStep from '../components/profile/VideoUploadStep';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Step } = Steps;

const LOCAL_STORAGE_KEY = 'profileData';

const ProfilePage = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [videoList, setVideoList] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);

  const getBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleInputChange = (field: string, value: string) => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    let currentData = {};

    if (saved) {
      try {
        currentData = JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }

    const updatedData = {
      ...currentData,
      [field]: value,
    };

    console.log('Saving data:', updatedData); // Debug log
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    setProfileData(updatedData); // Update state immediately
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values); // Debug log

      const videos: string[] = [];
      for (const file of videoList) {
        if (file.url) {
          videos.push(file.url);
        } else if (file.originFileObj) {
          const base64 = await getBase64(file.originFileObj);
          videos.push(base64 as string);
        }
      }

      const dataToSave = {
        firstName: values.firstName || '',
        lastName: values.lastName || '',
        tagLine: values.tagLine || '',
        about: values.about || '',
        facebook: values.facebook || '',
        linkedin: values.linkedin || '',
        instagram: values.instagram || '',
        youtube: values.youtube || '',
        videos: videos,
      };

      console.log('Data to save:', dataToSave); // Debug log

      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));

      // Update state
      setProfileData(dataToSave);

      // Show success message
      message.success('Profile saved successfully!');

      // Close modal and reset form
      setModalOpen(false);
      setCurrentStep(0);

      // Force a re-render
      setTimeout(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setProfileData(parsed);
        }
      }, 100);
    } catch (error) {
      console.error('Form submission error:', error);
      message.error('Please fill all required fields before saving');
    }
  };

  // Add a new function to handle form submission
  const handleFormSubmit = () => {
    form.submit();
  };

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  const steps = [
    {
      title: 'Basic Info',
      icon: <FileTextOutlined />,
      content: <BasicInfoStep handleInputChange={handleInputChange} />,
    },
    {
      title: 'Social Media',
      icon: <ShareAltOutlined />,
      content: <SocialMediaStep />,
    },
    {
      title: 'Intro Video',
      icon: <VideoCameraOutlined />,
      content: <VideoUploadStep videoList={videoList} setVideoList={setVideoList} />,
    },
  ];

  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          console.log('Loading initial data:', parsed); // Debug log
          setProfileData(parsed);
          form.setFieldsValue({
            firstName: parsed.firstName || '',
            lastName: parsed.lastName || '',
            tagLine: parsed.tagLine || '',
            about: parsed.about || '',
            facebook: parsed.facebook || '',
            linkedin: parsed.linkedin || '',
            instagram: parsed.instagram || '',
            youtube: parsed.youtube || '',
          });
        } catch (error) {
          console.error('Error loading initial data:', error);
        }
      }
    };

    loadInitialData();
  }, [form]);

  return (
    <div className="min-h-screen p-2">
      <div className="p-8">
        <Card className="flex justify-end mb-6" bodyStyle={{ padding: '14px' }}>
          <Row gutter={16}>
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={() => router.push('/auth/public-profile')}
                style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                className="bg-button hover:bg-button/80  rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                View Profile
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setModalOpen(true);
                  // Load current data into form when opening modal
                  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
                  if (saved) {
                    try {
                      const parsed = JSON.parse(saved);
                      form.setFieldsValue({
                        firstName: parsed.firstName || '',
                        lastName: parsed.lastName || '',
                        tagLine: parsed.tagLine || '',
                        about: parsed.about || '',
                        facebook: parsed.facebook || '',
                        linkedin: parsed.linkedin || '',
                        instagram: parsed.instagram || '',
                        youtube: parsed.youtube || '',
                      });
                    } catch (error) {
                      console.error('Error loading form data:', error);
                    }
                  }
                }}
                style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                className="bg-button hover:bg-button/80  rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Profile Info Card */}
        <Card
          className="mb-6"
          bordered={false}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          bodyStyle={{ padding: '14px' }}
        >
          <div className="flex flex-col items-center">
            <Avatar
              size={80}
              icon={<UserOutlined />}
              className="mb-1"
              style={{ backgroundColor: '#3A57E8' }}
            />
            <Title level={2} className="mb-1 !text-3xl text-center">
              {profileData?.firstName && profileData?.lastName
                ? `${profileData.firstName} ${profileData.lastName}`
                : 'Your Name'}
            </Title>
            <Text className="text-gray-600 text-sm mt-[-16px]  text-center mb-2">
              {profileData?.tagLine || 'Add your tag line'}
            </Text>
          </div>
        </Card>

        {/* Two Column Layout */}
        <Row gutter={24}>
          {/* About Section */}
          <Col xs={24} md={12}>
            <Card
              title="About"
              className="h-full"
              bordered={false}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <Text className="text-gray-600 whitespace-pre-wrap">
                {profileData?.about || 'Add a description about yourself'}
              </Text>
            </Card>
          </Col>

          {/* Media Gallery Section */}
          <Col xs={24} md={12}>
            <Card
              title="Media Gallery"
              className="h-full"
              bordered={false}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              {profileData?.videos?.[0] ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <video
                    src={profileData.videos[0]}
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    style={{
                      backgroundColor: '#000',
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
                  <Text className="text-gray-400">No video uploaded yet</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Social Media Links */}
        {profileData && (
          <div className="flex justify-center gap-4 mt-8">
            {profileData.facebook && (
              <a
                href={profileData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FacebookOutlined style={{ fontSize: '24px' }} />
              </a>
            )}
            {profileData.linkedin && (
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <LinkedinOutlined style={{ fontSize: '24px' }} />
              </a>
            )}
            {profileData.instagram && (
              <a
                href={profileData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <InstagramOutlined style={{ fontSize: '24px' }} />
              </a>
            )}
            {profileData.youtube && (
              <a
                href={profileData.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800"
              >
                <YoutubeOutlined style={{ fontSize: '24px' }} />
              </a>
            )}
          </div>
        )}
      </div>

      <Modal
        title="Edit Profile"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            firstName: profileData?.firstName || '',
            lastName: profileData?.lastName || '',
            tagLine: profileData?.tagLine || '',
            about: profileData?.about || '',
            facebook: profileData?.facebook || '',
            linkedin: profileData?.linkedin || '',
            instagram: profileData?.instagram || '',
            youtube: profileData?.youtube || '',
          }}
        >
          <Steps current={currentStep} className="mb-8">
            {steps.map((item) => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>

          <div className="min-h-[300px]">{steps[currentStep].content}</div>

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button
                onClick={prev}
                className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
              >
                Back
              </Button>
            )}
            <div className="ml-auto">
              {currentStep < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={next}
                  className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                  style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                >
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleFormSubmit}
                  className="rounded-lg shadow hover:shadow-md transition-all duration-300"
                  style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
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
