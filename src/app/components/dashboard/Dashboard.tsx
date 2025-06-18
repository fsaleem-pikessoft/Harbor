'use client';

import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Modal,
  Avatar,
  Steps,
  Form,
  message,
  Tag,
  Input,
} from 'antd';
import { useState, useEffect } from 'react';
import {
  RocketOutlined,
  CalendarOutlined,
  GlobalOutlined,
  ShopOutlined,
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  BulbOutlined,
  RiseOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  ShareAltOutlined,
  CheckCircleFilled,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import BasicInfoStep from '../profile/BasicInfoStep';
import SocialMediaStep from '../profile/SocialMediaStep';
import VideoUploadStep from '../profile/VideoUploadStep';
import type { UploadFile } from 'antd';

const { Title, Text } = Typography;
const { Step } = Steps;

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

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [videoList, setVideoList] = useState<UploadFile[]>([]);
  const [profileSetupComplete, setProfileSetupComplete] = useState(false);
  const [letsGoModalOpen, setLetsGoModalOpen] = useState(false);
  const [letsGoStep, setLetsGoStep] = useState(0);
  const [letsGoForm] = Form.useForm();
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

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

  const getBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleInputChange = (field: string, value: string) => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    let currentData: ProfileData = {};

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

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();

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

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      message.success('Profile saved successfully!');
      setModalOpen(false);
      setCurrentStep(0);
      setVideoList([]);
      setProfileSetupComplete(true);
    } catch (error) {
      console.error('Form submission error:', error);
      message.error('Please fill all required fields before saving');
    }
  };

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  const getStepIcon = (index: number) => {
    const isCompleted = index < currentStep;
    const isCurrent = index === currentStep;

    const icons = [
      {
        icon: <FileTextOutlined />,
        color: '#1890ff',
      },
      {
        icon: <ShareAltOutlined />,
        color: '#52c41a',
      },
      {
        icon: <VideoCameraOutlined />,
        color: '#722ed1',
      },
    ];

    return (
      <Avatar
        icon={isCompleted ? <CheckCircleFilled /> : icons[index].icon}
        style={{
          backgroundColor: isCompleted ? '#52c41a' : icons[index].color,
          marginRight: '8px',
          opacity: isCurrent ? 1 : 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  };

  const steps = [
    {
      title: 'Basic Info',
      icon: getStepIcon(0),
      content: <BasicInfoStep handleInputChange={handleInputChange} />,
    },
    {
      title: 'Intro Video',
      icon: getStepIcon(2),
      content: <VideoUploadStep videoList={videoList} setVideoList={setVideoList} />,
    },
  ];

  useEffect(() => {
    steps.forEach((step, index) => {
      step.icon = getStepIcon(index);
    });
  }, [currentStep, steps, getStepIcon]);

  useEffect(() => {
    const loadInitialData = () => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed: ProfileData = JSON.parse(saved);

          if (parsed.videos && parsed.videos.length > 0) {
            setVideoList([
              {
                uid: '-1',
                name: 'Uploaded Video',
                status: 'done' as const,
                url: parsed.videos[0],
              },
            ]);
          }

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

  const handleSetupProfile = () => {
    setModalOpen(true);
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
  };

  // Hobbies tag input handlers
  const handleHobbyInputConfirm = () => {
    if (inputValue && !hobbies.includes(inputValue)) {
      setHobbies([...hobbies, inputValue]);
    }
    setInputValue('');
  };
  const handleHobbyClose = (removedTag: string) => {
    setHobbies(hobbies.filter((tag) => tag !== removedTag));
  };

  return (
    <div className="min-h-screen ">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card bodyStyle={{ padding: '14px' }} className="mb-6">
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
          </Card>
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
                Upcoming Events
              </span>
            }
            className="mt-4"
          >
            <ul className="list-none p-0 m-0">
              <li className="mb-4 pb-4 border-b border-gray-100">
                <Text strong className="block">
                  <TeamOutlined className="mr-2" />
                  Web Development Workshop
                </Text>
                <Text type="secondary" className="text-sm">
                  March 15, 2024 • 2:00 PM
                </Text>
                <Text className="block text-sm mt-1">
                  Learn the fundamentals of modern web development
                </Text>
              </li>
              <li className="mb-4 pb-4 border-b border-gray-100">
                <Text strong className="block">
                  <BulbOutlined className="mr-2" />
                  UI/UX Design Masterclass
                </Text>
                <Text type="secondary" className="text-sm">
                  March 20, 2024 • 3:30 PM
                </Text>
                <Text className="block text-sm mt-1">
                  Advanced techniques for creating beautiful interfaces
                </Text>
              </li>
              <li>
                <Text strong className="block">
                  <RiseOutlined className="mr-2" />
                  Career Development Session
                </Text>
                <Text type="secondary" className="text-sm">
                  March 25, 2024 • 1:00 PM
                </Text>
                <Text className="block text-sm mt-1">
                  Tips and strategies for career growth in tech
                </Text>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={12} className="mt-4">
          {/* Conditionally render Welcome or Let's Go card */}
          {!profileSetupComplete ? (
            <Card>
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
                assisting you in completing your I AM Profile. This is your first step towards an
                amazing journey.
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
            </Card>
          ) : (
            <Card>
              <div className="mb-6 h-full">
                <Title
                  level={3}
                  className="text-secondary-dark mb-4 text-left font-[700] tracking-wide"
                >
                  You&apos;re All Set!
                </Title>
                <div className="h-1 w-20 bg-primary mb-6"></div>
              </div>
              <Text className="block text-gray-700 text-base leading-relaxed mb-4">
                Get help setting up your social media profiles to reflect your personal or
                professional brand. In this session, you can also share your hobbies and interests
                so we can tailor your online presence to showcase what makes you unique. Lets build
                a profile that truly represents you.
              </Text>
              <Text className="block text-gray-700 text-base leading-relaxed mb-4">
                Please set up your social media accounts. Add your hobbies and interests to complete
                your profile!
              </Text>
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
                    icon={<RocketOutlined />}
                    onClick={() => setLetsGoModalOpen(true)}
                  >
                    Let&apos;s Go
                  </Button>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
        <Col span={24}>
          <Row gutter={16}>
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
              >
                <Row gutter={16} className="flex-grow">
                  <Col span={24}>
                    <Text className="text-sm">
                      Schedule a personalized session with our expert to get the guidance, support,
                      or feedback you need—whether it&apos;s for strategy, setup, or brainstorming.
                      Choose a time that works best for you and let&apos;s move your goals forward.
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

      {/* Profile Setup Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <div className="mt-2">
          <Steps current={currentStep} className="mb-4">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} icon={step.icon} />
            ))}
          </Steps>

          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <div className="min-h-[400px]">{steps[currentStep].content}</div>

            <div className="flex justify-between mt-2">
              <Button
                onClick={prev}
                disabled={currentStep === 0}
                style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                icon={<ArrowLeftOutlined />}
              >
                Back
              </Button>
              <div>
                {currentStep < steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={next}
                    style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                    className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                    icon={<ArrowRightOutlined />}
                  >
                    Next
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={handleFinish}
                    style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                    className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                    icon={<CheckCircleOutlined />}
                  >
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Let's Go Modal */}
      <Modal
        open={letsGoModalOpen}
        onCancel={() => setLetsGoModalOpen(false)}
        footer={null}
        width={600}
        centered
      >
        <Steps current={letsGoStep} className="mb-4 mt-4">
          <Step title="Personal Info" />
          <Step title="Social Media" />
        </Steps>
        <Form form={letsGoForm} layout="vertical">
          {letsGoStep === 0 && (
            <>
              <Form.Item
                name="interest"
                label="Interest"
                rules={[{ required: true, message: 'Please enter your interest' }]}
                style={{ marginBottom: '10px' }}
              >
                <Input
                  placeholder="Enter your interest"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>
              <Form.Item
                name="domain"
                label="Domain"
                rules={[{ required: true, message: 'Please enter your domain' }]}
                style={{ marginBottom: '10px' }}
              >
                <Input
                  placeholder="Enter your domain"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>
              <Form.Item label="Hobbies">
                <div className="border rounded-lg p-2 min-h-[48px] flex flex-wrap gap-2 bg-white">
                  {hobbies.map((tag) => (
                    <Tag key={tag} closable onClose={() => handleHobbyClose(tag)}>
                      {tag}
                    </Tag>
                  ))}
                  <Input
                    type="text"
                    size="small"
                    style={{ minWidth: 100, border: 'none', outline: 'none', boxShadow: 'none' }}
                    className="focus:ring-0"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleHobbyInputConfirm}
                    onBlur={handleHobbyInputConfirm}
                    placeholder="Add hobby"
                  />
                </div>
              </Form.Item>
            </>
          )}
          {letsGoStep === 1 && <SocialMediaStep />}
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setLetsGoStep(letsGoStep - 1)}
              disabled={letsGoStep === 0}
              style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
              icon={<ArrowLeftOutlined />}
            >
              Back
            </Button>
            {letsGoStep < 1 ? (
              <Button
                type="primary"
                onClick={() => setLetsGoStep(letsGoStep + 1)}
                style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                icon={<ArrowRightOutlined />}
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => setLetsGoModalOpen(false)}
                style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                icon={<CheckCircleOutlined />}
              >
                Finish
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
