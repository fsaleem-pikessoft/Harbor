'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Tabs, Button } from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

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
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: ProfileData = JSON.parse(saved);
        setProfileData(parsed);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }, []);

  const fullName =
    profileData?.firstName && profileData?.lastName
      ? `${profileData.firstName} ${profileData.lastName}`
      : 'Rob Boyce';

  const tagLine = profileData?.tagLine || 'Creative Developer & Mentor';

  return (
    <div className="min-h-screen bg-[#f9f9fb] py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Profile Summary */}
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          }}
        >
          <Avatar
            size={96}
            src="/images/avatar.svg"
            style={{
              backgroundColor: '#3A57E8',
              fontSize: 32,
              marginBottom: 16,
            }}
          >
            {profileData?.firstName?.[0]}
            {profileData?.lastName?.[0]}
          </Avatar>

          <Title level={3} className="mb-1">
            {fullName}
          </Title>
          <Text type="secondary">{tagLine}</Text>

          <div className="flex justify-center gap-4 mt-6">
            {profileData?.facebook && (
              <a href={profileData.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookOutlined className="text-blue-600 text-xl hover:text-blue-800" />
              </a>
            )}
            {profileData?.linkedin && (
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined className="text-blue-700 text-xl hover:text-blue-900" />
              </a>
            )}
            {profileData?.instagram && (
              <a href={profileData.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="text-pink-600 text-xl hover:text-pink-800" />
              </a>
            )}
            {profileData?.youtube && (
              <a href={profileData.youtube} target="_blank" rel="noopener noreferrer">
                <YoutubeOutlined className="text-red-600 text-xl hover:text-red-800" />
              </a>
            )}
          </div>

          <Button
            type="primary"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg"
            loading={loading}
            onClick={() => {
              setLoading(true);
              window.open('/auth/public-profile', '_blank');
              setTimeout(() => setLoading(false), 1000);
            }}
            icon={<EyeOutlined />}
          >
            View Profile
          </Button>
        </Card>

        {/* Info Tabs */}
        <div className="md:col-span-2">
          <Card
            bordered={false}
            style={{ borderRadius: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
          >
            <Tabs defaultActiveKey="1" size="large">
              <TabPane tab="About Me" key="1">
                <Paragraph className="text-gray-700 text-base leading-7 whitespace-pre-wrap">
                  {`I'm a passionate and driven developer with a strong focus on building intuitive and impactful digital experiences. With a deep understanding of modern web technologies and design principles, I take pride in crafting solutions that are both user-friendly and performance-oriented.\n\nI believe in continuous learning, clean code, and the power of collaboration. Whether it's developing a sleek frontend, solving backend challenges, or bringing ideas to life through creative design — I'm always excited to push boundaries and make a difference through technology.`}
                </Paragraph>
              </TabPane>

              <TabPane tab="Video Intro" key="2">
                <div className="flex w-full">
                  <div className="relative w-full pb-[56.25%]">
                    <iframe
                      src="https://www.youtube.com/embed/2X3p_yV19Ms"
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      style={{ border: 0 }}
                      allowFullScreen
                      title="YouTube video"
                    />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
