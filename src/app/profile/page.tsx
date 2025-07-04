'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Tabs, Button, Row, Col, Timeline, Tag } from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  EyeOutlined,
  TagsOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { getProfile } from '@/api/profileApi';
import { toast } from 'react-toastify';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

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
  interests?: string[];
  industries?: string[];
  avatar?: string;
  introVideo?: string;
  introText?: string;
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);

  const { mutate: mutateGetProfile } = useMutation({
    mutationFn: () => getProfile(),
    onSuccess: (res) => {
      debugger;
      setProfileData(res?.data?.entity);
      setVideoLink(res?.data?.videoLink);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  useEffect(() => {
    mutateGetProfile();
  }, []);

  return (
    <div className="min-h-screen  py-10 px-6">
      <Row gutter={[24, 24]} className="max-w-6xl mx-auto">
        {/* Left Column */}
        <Col xs={24} sm={24} md={8}>
          {/* Profile Summary Card */}
          <Card
            style={{
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Avatar
              size={96}
              src={profileData?.avatar || '/images/avatar.svg'}
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
              {profileData ? `${profileData.firstName || ''} ${profileData.lastName || ''}` : ''}
            </Title>
            <Text type="secondary" className="block mb-4">
              {profileData?.tagLine || ''}
            </Text>

            <div className="flex justify-center gap-4 mb-6">
              <a href={profileData?.facebook || ''} target="_blank" rel="noopener noreferrer">
                <Avatar
                  icon={<FacebookOutlined />}
                  className="bg-[#1877F2] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                />
              </a>
              <a href={profileData?.linkedin || ''} target="_blank" rel="noopener noreferrer">
                <Avatar
                  icon={<LinkedinOutlined />}
                  className="bg-[#0A66C2] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                />
              </a>
              <a href={profileData?.instagram || ''} target="_blank" rel="noopener noreferrer">
                <Avatar
                  icon={<InstagramOutlined />}
                  className="bg-gradient-to-tr from-[#FD5949] to-[#D6249F] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                />
              </a>
              <a href={profileData?.youtube || ''} target="_blank" rel="noopener noreferrer">
                <Avatar
                  icon={<YoutubeOutlined />}
                  className="bg-[#FF0000] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                />
              </a>
            </div>

            <Button
              type="primary"
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg"
              loading={loading}
              onClick={() => {
                setLoading(true);
                window.open('/auth/I-M-Profile', '_blank');
                setTimeout(() => setLoading(false), 1000);
              }}
              icon={<EyeOutlined />}
            >
              View Profile
            </Button>
          </Card>

          {/* Interests and Industries Card */}
          <Card
            style={{
              borderRadius: 16,
              marginTop: 24,
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            }}
            title={
              <div className="flex items-center gap-2">
                <Avatar
                  size={24}
                  icon={<TagsOutlined />}
                  style={{
                    backgroundColor: '#3A57E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <span style={{ fontWeight: 600 }}>Interests & Industries</span>
              </div>
            }
          >
            <div className="mb-6">
              <div className="mb-3 font-semibold text-gray-700">Interests</div>
              <div className="flex flex-wrap gap-2">
                {profileData &&
                Array.isArray(profileData.interests) &&
                profileData.interests.length > 0 ? (
                  profileData.interests.map((interest: string) => (
                    <Tag color="blue" key={interest} className="px-3 py-1 rounded-md text-sm">
                      {interest}
                    </Tag>
                  ))
                ) : (
                  <Text type="secondary">No interests set</Text>
                )}
              </div>
            </div>
            <div>
              <div className="mb-3 font-semibold text-gray-700">Industries</div>
              <div className="flex flex-wrap gap-2">
                {profileData &&
                Array.isArray(profileData.industries) &&
                profileData.industries.length > 0 ? (
                  profileData.industries.map((industry: string) => (
                    <Tag color="green" key={industry} className="px-3 py-1 rounded-md text-sm">
                      {industry}
                    </Tag>
                  ))
                ) : (
                  <Text type="secondary">No industries set</Text>
                )}
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Column */}
        <Col xs={24} sm={24} md={16}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: 16,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                }}
              >
                <Tabs defaultActiveKey="1" size="large">
                  <TabPane tab="About Me" key="1">
                    <Paragraph className="text-gray-700 text-base leading-7 whitespace-pre-wrap">
                      {profileData?.about || profileData?.introText || 'No about info set.'}
                    </Paragraph>
                  </TabPane>

                  <TabPane tab="Video Intro" key="2">
                    <div className="flex w-full">
                      <div className="relative w-full pb-[56.25%]">
                        {videoLink ? (
                          <iframe
                            src={videoLink}
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                            style={{ border: 0 }}
                            allowFullScreen
                            title="Intro video"
                          />
                        ) : (
                          <Text type="secondary">No video intro set.</Text>
                        )}
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>

            {/* Activity Timeline Card */}
            <Col span={24}>
              <Card
                style={{
                  borderRadius: 16,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                }}
                title={
                  <div className="flex items-center gap-2">
                    <Avatar
                      size={24}
                      icon={<HistoryOutlined />}
                      style={{
                        backgroundColor: '#3A57E8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                    <span style={{ fontWeight: 600 }}>Activity Timeline</span>
                  </div>
                }
              >
                <Timeline className="px-4">
                  <Timeline.Item color="green">Profile created - 2024-05-01</Timeline.Item>
                  <Timeline.Item color="blue">Updated About section - 2024-05-03</Timeline.Item>
                  <Timeline.Item color="orange">Added LinkedIn - 2024-05-05</Timeline.Item>
                  <Timeline.Item color="red">Video intro uploaded - 2024-05-07</Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
