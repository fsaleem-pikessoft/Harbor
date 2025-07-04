'use client';

import React from 'react';
import { Card, Typography, Button, Row, Col, Avatar, Form, Timeline } from 'antd';
import { useState, useEffect } from 'react';
import {
  RocketOutlined,
  CalendarOutlined,
  GlobalOutlined,
  ShopOutlined,
  BookOutlined,
  ClockCircleOutlined,
  BulbOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { createProfile, getProfile, getProfileActivity } from '@/api/profileApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import SocialMediaStep from '../profile/SocialMediaStep';
import AmaQuestions from './AmaQuestions';
import ArctypeQuestions from './ArctypeQuestions';
import ScheduleMeeting from './ScheduleMeeting';
import ProfileSetup from './ProfileSetup';

const { Text } = Typography;

export interface ProfilePayload {
  id: string;
  firstName: string;
  lastName: string;
  tagLine: string;
  introText: string;
  introVideo: string;
  occupations: string;
  industries: string;
}

const Dashboard = () => {
  const [form] = Form.useForm();
  const [profileData, setProfileData] = useState<ProfilePayload | null>(null);
  const [userId, setUserId] = useState(0);
  const { isAuthenticated } = useAuth();

  // Active task timeline state
  const [timelineStatus, setTimelineStatus] = useState([
    { label: 'Register Account', isComplete: false, activityId: 1 },
    { label: 'Basic Profile', isComplete: false, activityId: 2 },
    { label: 'Schedule call with your account manager', isComplete: false, activityId: 3 },
    { label: 'Review & anaswer ArchType questions', isComplete: false, activityId: 4 },
    { label: 'Answer AMA questions', isComplete: false, activityId: 5 },
    { label: 'Review your IM profile', isComplete: false, activityId: 6 },
  ]);

  const products = [
    {
      id: 1,
      name: 'Storyline Template Pack',
      price: '$29',
    },
    {
      id: 2,
      name: 'Personal Branding eBook',
      price: '$15',
    },
  ];

  const { mutate: mutateCreateProfile } = useMutation({
    mutationFn: () => createProfile(),
    onSuccess: () => {
      mutateGetProfile();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetProfile } = useMutation({
    mutationFn: () => getProfile(),
    onSuccess: (res) => {
      setProfileData(res?.data?.entity);
      setUserId(Number(res?.data?.entity?.userId) || 0);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetProfileActivity } = useMutation({
    mutationFn: () => getProfileActivity(),
    onSuccess: (res) => {
      // Map API response to timelineStatus
      if (Array.isArray(res?.data)) {
        setTimelineStatus(
          res.data.map((item) => ({
            label: item.activityText,
            isComplete: item.isComplete,
            activityId: item.activityId,
          }))
        );
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  // Handler to mark a step as complete and move to the next
  const handleStepComplete = () => {
    // This function is now empty as the statusList state is removed
  };

  useEffect(() => {
    if (userId == 0) {
      mutateCreateProfile();
    }

    mutateGetProfileActivity();
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (profileData && form) {
      form.setFieldsValue({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        tagLine: profileData.tagLine,
        about: profileData.introText,
        video: profileData.introVideo,
        createdOn: '2025-07-01T21:04:52.792Z',
        isAproved: true,
        reviewedBy: 0,
      });
    }
  }, [profileData, form]);

  return (
    <>
      {isAuthenticated && (
        <div className="min-h-screen ">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div>
                <Row justify="end" gutter={[16, 16]}>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                      className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                      icon={<RocketOutlined />}
                    >
                      My Launchpad
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                      className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                      icon={<GlobalOutlined />}
                    >
                      Ecosystem News
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                      className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                      icon={<ShopOutlined />}
                    >
                      Marketplace
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={12} className="mt-4">
              {/* Render the first incomplete activity's component according to timelineStatus */}
              {(() => {
                const firstIncomplete = timelineStatus.find((item) => !item.isComplete);
                if (!firstIncomplete)
                  return (
                    <div className="mt-6">
                      <Card>
                        <b>All steps completed!</b>
                      </Card>
                    </div>
                  );
                switch (firstIncomplete.label) {
                  case 'Basic Profile':
                    return (
                      <div>
                        {/* <Card>
                  <div className="mb-6">
                    <Title
                      level={3}
                      className="text-secondary-dark mb-4 text-left font-[700] tracking-wide"
                    >
                      Welcome to I M APP
                    </Title>
                    <div className="h-1 w-20 bg-primary mb-6"></div>
                  </div>
                  <Text className="block text-gray-700 text-base leading-relaxed mb-3">
                    Welcome I see you are new here. I will help you prepare for your arrival by
                    assisting you in completing your I AM Profile. This is your first step towards
                    an amazing journey.
                  </Text>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>Personalized guidance</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>Step-by-step process</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>24/7 support available</span>
                    </div>
                  </div>
                  <Row justify="end">
                    <Col>
                      <Button
                        type="primary"
                        size="large"
                        className="px-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 text-center custom-yellow-btn"
                        style={{
                          borderRadius: '5px',
                          fontSize: '13px',
                          height: '40px',
                          width: '200px',
                        }}
                        icon={<UserOutlined />}
                        onClick={handleSetupProfile}
                      >
                        Setup Your Profile
                      </Button>
                    </Col>
                  </Row>
                </Card> */}
                        <ProfileSetup />
                      </div>
                    );
                  case 'Schedule call with your account manager':
                    return (
                      <div>
                        <ScheduleMeeting activityId={firstIncomplete.activityId} />
                      </div>
                    );
                  case 'Review & anaswer ArchType questions':
                    return (
                      <div>
                        <ArctypeQuestions activityId={firstIncomplete.activityId} />
                      </div>
                    );
                  case 'Answer AMA questions':
                    return (
                      <div>
                        <AmaQuestions activityId={firstIncomplete.activityId} />
                      </div>
                    );
                  case 'Review your IM profile':
                    return (
                      <div>
                        <Card title="My IM Profile">
                          <SocialMediaStep />
                          <Button
                            type="primary"
                            className="mt-4"
                            onClick={() => handleStepComplete()}
                          >
                            Submit
                          </Button>
                        </Card>
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </Col>
            <Col span={12}>
              <Card
                title={
                  <span className="flex items-center">
                    <Avatar
                      icon={<ClockCircleOutlined />}
                      style={{
                        backgroundColor: '#fa8c16',
                        marginRight: '12px',
                      }}
                    />
                    Account Activity
                  </span>
                }
                className="mt-4"
              >
                <Timeline>
                  {timelineStatus.map((item) => (
                    <Timeline.Item
                      key={item.label}
                      dot={
                        item.isComplete ? (
                          <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        ) : undefined
                      }
                    >
                      {item.label}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>
            <Col span={24}>
              <Row gutter={16} style={{ alignItems: 'stretch' }}>
                <Col span={12}>
                  <Card
                    title={
                      <span className="flex items-center">
                        <Avatar
                          icon={<CalendarOutlined />}
                          style={{
                            backgroundColor: '#52c41a',
                            marginRight: '12px',
                          }}
                        />
                        Book a Session
                      </span>
                    }
                    className="flex flex-col"
                    style={{ height: '100%' }}
                  >
                    <Row gutter={16} className="flex-grow">
                      <Col span={24}>
                        <Text className="text-sm">
                          Schedule a personalized session with our expert to get the guidance,
                          support, or feedback you need—whether it&apos;s for strategy, setup, or
                          brainstorming. Choose a time that works best for you and let&apos;s move
                          your goals forward.
                        </Text>
                      </Col>
                    </Row>
                    <Row justify="end" className="mt-auto" gutter={16}>
                      <Col>
                        <Button
                          type="primary"
                          size="large"
                          style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                          className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                          icon={<CalendarOutlined />}
                        >
                          View Calendar
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          size="large"
                          style={{
                            borderRadius: '5px',
                            fontSize: '13px',
                            height: '30px',
                            backgroundColor: 'rgb(19 194 150)',
                          }}
                          className="custom-green-btn text-xs rounded-none px-6 flex items-center text-white "
                          icon={<CalendarOutlined />}
                        >
                          Schedule
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title={
                      <span className="flex items-center">
                        <Avatar
                          icon={<ShopOutlined />}
                          style={{
                            backgroundColor: '#722ed1',
                            marginRight: '12px',
                          }}
                        />
                        Products
                      </span>
                    }
                    className="h-full"
                    style={{ height: '100%' }}
                  >
                    <Row gutter={[16, 16]}>
                      {products.map((product) => (
                        <Col span={24} key={product.id}>
                          <Card bodyStyle={{ padding: '10px' }}>
                            <Row gutter={16}>
                              <Col span={21}>
                                <Text className="text-sm">
                                  {product.id === 1 ? (
                                    <BookOutlined className="mr-2" />
                                  ) : (
                                    <BulbOutlined className="mr-2" />
                                  )}
                                  {product.name}
                                </Text>
                              </Col>
                              <Col span={3}>
                                <Text className="text-sm">{product.price}</Text>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Dashboard;
