import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Row, Col, Modal, Steps, Form } from 'antd';
import {
  UserOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  ShareAltOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import BasicInfoStep from '../profile/BasicInfoStep';
import VideoUploadStep from '../profile/VideoUploadStep';
import type { UploadFile } from 'antd';
import { addProfile, getProfile, updateProfile } from '@/api/profileApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;
const { Step } = Steps;

type ProfileData = {
  firstName: string;
  lastName: string;
  tagLine: string;
  introText: string;
  introVideo: string;
  // add other fields as needed
};

const ProfileSetup = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [videoList, setVideoList] = useState<UploadFile[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userId, setUserId] = useState(0);
  const [isVideoLink, setVideoLink] = useState('');
  const { isAuthenticated } = useAuth();

  const getStepIcon = (index: number) => {
    const isCompleted = index < currentStep;
    const icons = [
      { icon: <FileTextOutlined />, color: '#1890ff' },
      { icon: <ShareAltOutlined />, color: '#52c41a' },
      { icon: <VideoCameraOutlined />, color: '#722ed1' },
    ];
    return (
      <span>
        <span style={{ marginRight: 8 }}>
          {isCompleted ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : icons[index].icon}
        </span>
      </span>
    );
  };

  const steps = [
    {
      title: 'Basic Info',
      icon: getStepIcon(0),
      content: <BasicInfoStep />,
    },
    {
      title: 'Intro Video',
      icon: getStepIcon(2),
      content: (
        <VideoUploadStep
          videoList={videoList}
          setVideoList={setVideoList}
          mutateUloadFile={() => {
            /* intentionally left blank */
          }}
          defaultVideoUrl={isVideoLink}
        />
      ),
    },
  ];

  const { mutate: mutateGetProfile } = useMutation({
    mutationFn: () => getProfile(),
    onSuccess: (res) => {
      if (res?.data == '') {
        setUserId(0);
      }
      setProfileData(res?.data?.entity);
      setVideoLink(res?.data?.videoLink);
      setUserId(Number(res?.data?.entity?.userId) || 0);
    },
    onError: (error) => {
      const message =
        (error as any)?.response?.data || (error as any)?.message || 'An error occurred';
      toast.error(message);
    },
  });

  const { mutate: mutateAddProfile } = useMutation({
    mutationFn: (data: any) => addProfile(data),
    onSuccess: (res) => {
      setModalOpen(false);
      toast.success(res?.data);
    },
    onError: (error) => {
      const message =
        (error as any)?.response?.data || (error as any)?.message || 'An error occurred';
      toast.error(message);
    },
  });

  const { mutate: mutateUpdateProfile } = useMutation({
    mutationFn: (data: any) => updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      setModalOpen(false);
      window.location.reload();
    },
    onError: (error) => {
      const message =
        (error as any)?.response?.data || (error as any)?.message || 'An error occurred';
      toast.error(message);
    },
  });

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  const handleSetupProfile = () => {
    mutateGetProfile();
    setModalOpen(true);
  };

  const handleFinish = (values: any) => {
    const data = {
      id: 0,
      firstName: values?.firstName,
      lastName: values?.lastName,
      tagLine: values?.tagLine,
      introText: values?.about,
      introVideo: '',
      occupations: '',
      industries: '',
    };
    mutateAddProfile(data);
  };

  const handleUpdate = (values: any) => {
    const data = {
      id: userId,
      firstName: values?.firstName,
      lastName: values?.lastName,
      tagLine: values?.tagLine,
      introText: values?.about,
      introVideo: '',
      occupations: '',
      industries: '',
    };
    mutateUpdateProfile(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      mutateGetProfile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (profileData && form) {
      form.setFieldsValue({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        tagLine: profileData.tagLine,
        about: profileData.introText,
        video: profileData.introVideo,
      });
    }
  }, [profileData, form]);

  return (
    <>
      <Card className="bg-[#FFF7E6] dark:bg-[#2D1B06] shadow-lg border-0 transition-colors duration-300">
        <div className="mb-6">
          <Title level={3} className="text-secondary-dark mb-4 text-left font-[700] tracking-wide">
            Welcome to IM APP
          </Title>
          <div className="h-1 w-20 bg-primary mb-6"></div>
        </div>
        <Text className="block text-gray-700 text-base leading-relaxed mb-3">
          Welcome I see you are new here. I will help you prepare for your arrival by assisting you
          in completing your I AM Profile. This is your first step towards an amazing journey.
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
          <Form form={form} layout="vertical">
            <div className="min-h-[400px]">
              {steps.map((step, idx) => (
                <div key={idx} style={{ display: idx === currentStep ? 'block' : 'none' }}>
                  {step.content}
                </div>
              ))}
            </div>
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
                {currentStep === steps.length - 1 &&
                  (Number(userId) === 0 ? (
                    <Button
                      type="primary"
                      onClick={() => form.validateFields().then(handleFinish)}
                      style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                      className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                      icon={<CheckCircleOutlined />}
                    >
                      Finish
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => form.validateFields().then(handleUpdate)}
                      style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                      className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                      icon={<CheckCircleOutlined />}
                    >
                      Update
                    </Button>
                  ))}
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileSetup;
