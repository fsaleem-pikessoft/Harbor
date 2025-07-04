'use client';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Avatar,
  Tabs,
  Button,
  Breadcrumb,
  Modal,
  Select,
  Form,
  Timeline,
  Tag,
  Row,
  Col,
} from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  TagsOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { getProfileById } from '@/api/profileApi';
import { toast } from 'react-toastify';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

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

const ARCHETYPES = [
  'Ruler',
  'Creator/Artist',
  'Sage',
  'Innocent',
  'Explorer',
  'Rebel',
  'Hero',
  'Wizard',
  'Jester',
  'Everyman',
  'Lover',
  'Caregiver',
];

const MOCK_INTERESTS = ['Web Development', 'UI/UX', 'Mentoring'];
const MOCK_INDUSTRIES = ['Technology', 'Education'];

const MOCK_SOCIAL_MEDIA = {
  facebook: '',
  linkedin: '',
  instagram: '',
  youtube: '',
};

const AdminDetailPage = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [archetype, setArchetype] = useState<string | undefined>(undefined);

  const { mutate: mutateGetProfileById } = useMutation({
    mutationFn: (id: any) => getProfileById(id),
    onSuccess: (res) => {
      setProfileData(res?.data?.entity);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  useEffect(() => {
    mutateGetProfileById(id);
  }, [id]);

  return (
    <>
      <div className="min-h-screen ">
        <div className="container mx-auto px-4 ">
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Breadcrumb>
                <Breadcrumb.Item href="/">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>Archetypes OS</Breadcrumb.Item>
                <Breadcrumb.Item>Profile</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>

          <Row gutter={[24, 24]} className="mt-6">
            {/* Left Column */}
            <Col xs={24} md={8}>
              {/* Profile Summary Card */}
              <Card
                className="shadow-lg rounded-2xl"
                style={{
                  padding: 24,
                  textAlign: 'center',
                }}
              >
                <div className="relative inline-block">
                  <Avatar
                    size={120}
                    src="/images/avatar.svg"
                    style={{
                      backgroundColor: '#3A57E8',
                      fontSize: 40,
                      marginBottom: 16,
                      border: '4px solid white',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                    }}
                    className="hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    {profileData?.firstName}
                    {profileData?.lastName}
                  </Avatar>
                  <div className="absolute bottom-5 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <Title level={3} className="mb-1">
                  {profileData?.firstName} {profileData?.lastName}
                </Title>
                <Text type="secondary">{profileData?.tagLine}</Text>

                <div className="flex justify-center gap-4 mt-6">
                  <a
                    href={profileData?.facebook || MOCK_SOCIAL_MEDIA.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      icon={<FacebookOutlined />}
                      className="bg-[#1877F2] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                    />
                  </a>
                  <a
                    href={profileData?.linkedin || MOCK_SOCIAL_MEDIA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      icon={<LinkedinOutlined />}
                      className="bg-[#0A66C2] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                    />
                  </a>
                  <a
                    href={profileData?.instagram || MOCK_SOCIAL_MEDIA.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      icon={<InstagramOutlined />}
                      className="bg-gradient-to-tr from-[#FD5949] to-[#D6249F] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                    />
                  </a>
                  <a
                    href={profileData?.youtube || MOCK_SOCIAL_MEDIA.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      icon={<YoutubeOutlined />}
                      className="bg-[#FF0000] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                    />
                  </a>
                </div>

                <Button
                  type="primary"
                  className="mt-6 w-full custom-yellow-btn rounded-lg"
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setModalOpen(true);
                      setLoading(false);
                    }, 1000); // Simulate async action
                  }}
                  icon={<EyeOutlined />}
                >
                  Review Profile
                </Button>
              </Card>

              {/* Interests and Industries Card */}
              <Card
                className="shadow-lg rounded-2xl mt-6"
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
                    <span className="font-semibold">Interests & Industries</span>
                  </div>
                }
              >
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 font-semibold text-gray-700">Interests</div>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_INTERESTS.map((interest) => (
                        <Tag color="blue" key={interest} className="px-3 py-1 rounded-md text-sm">
                          {interest}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 font-semibold text-gray-700">Industries</div>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_INDUSTRIES.map((industry) => (
                        <Tag color="green" key={industry} className="px-3 py-1 rounded-md text-sm">
                          {industry}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Right Column */}
            <Col xs={24} md={16}>
              <Row gutter={[0, 24]}>
                <Col span={24}>
                  <Card className="shadow-lg rounded-2xl">
                    <Tabs defaultActiveKey="1" size="large">
                      <TabPane tab="About Me" key="1">
                        <Paragraph className="text-gray-700 text-base leading-7 whitespace-pre-wrap">
                          {profileData?.about || `No about me`}
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
                </Col>

                <Col span={24}>
                  <Card
                    className="shadow-lg rounded-2xl"
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
                        <span className="font-semibold">Activity Timeline</span>
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
      </div>

      <Modal
        title="Review Profile"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Select Archetype" required>
            <Select placeholder="Select Archetype" value={archetype} onChange={setArchetype}>
              {ARCHETYPES.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={() => setModalOpen(false)}
              className="rounded-md text-sm"
              icon={<CheckCircleOutlined />}
            >
              Approved
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AdminDetailPage;
