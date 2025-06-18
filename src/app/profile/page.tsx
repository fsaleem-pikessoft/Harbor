'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Form, Button, Row, Col, Avatar } from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

const LOCAL_STORAGE_KEY = 'profileData';

interface ProfileData {
  firstName?: string;
  lastName?: string;
  tagLine?: string;
  about?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  videos?: string[];
}

const ProfilePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed: ProfileData = JSON.parse(saved);
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
    <div className="min-h-screen">
      <div className="p-8">
        <div className="flex justify-end mb-6">
          <Row gutter={16}>
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={() => router.push('/auth/public-profile')}
                style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                className="bg-button hover:bg-button/80  rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                icon={<EyeOutlined />}
              >
                View Profile
              </Button>
            </Col>
          </Row>
        </div>

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
              src="/images/avatar.svg"
              className="mb-1"
              style={{ backgroundColor: '#3A57E8' }}
            />
            <Title level={2} className="mb-1 !text-3xl text-center">
              {profileData?.firstName && profileData?.lastName
                ? `${profileData.firstName} ${profileData.lastName}`
                : 'Rob Boyce'}
            </Title>
            <Text className="text-gray-600 text-sm mt-[-16px]  text-center mb-2">
              {profileData?.tagLine || 'Creative Developer & Mentor'}
            </Text>
          </div>
        </Card>

        {/* Two Column Layout */}
        <Row gutter={24}>
          {/* About Section */}
          <Col xs={24} md={12}>
            <Card
              title={
                <span className="flex items-center">
                  <Avatar
                    icon={<InfoCircleOutlined />}
                    style={{
                      backgroundColor: '#3A57E8',
                      marginRight: '12px',
                    }}
                  />
                  About
                </span>
              }
              className="h-full"
              bordered={false}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <Text className="text-gray-600 whitespace-pre-wrap">
                {profileData?.about ||
                  `Welcome to my professional profile! I am a dedicated professional with a passion for excellence and innovation. With extensive experience in my field, I strive to deliver exceptional results and create meaningful impact.

My expertise spans across various domains, and I am committed to continuous learning and growth. I believe in collaboration, creativity, and maintaining high standards in everything I do.

Feel free to connect with me to explore potential opportunities for collaboration or to learn more about my professional journey.`}
              </Text>
            </Card>
          </Col>

          {/* Media Gallery Section */}
          <Col xs={24} md={12}>
            <Card
              title={
                <span className="flex items-center">
                  <Avatar
                    icon={<PictureOutlined />}
                    style={{
                      backgroundColor: '#1890ff',
                      marginRight: '12px',
                    }}
                  />
                  Media Gallery
                </span>
              }
              className="h-full"
              bordered={false}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              {profileData?.videos?.[0] ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <video
                    key={profileData.videos[0]}
                    src={profileData.videos[0]}
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    style={{
                      backgroundColor: '#000',
                    }}
                    preload="metadata"
                    controlsList="nodownload"
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
    </div>
  );
};

export default ProfilePage;
