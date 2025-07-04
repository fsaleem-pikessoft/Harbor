import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Row, Col, Modal, Form, Input, Spin, Avatar } from 'antd';
import {
  RocketOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { arctypeAnswers, getVideoUrl, getUserQuestionsById } from '@/api/arctypeApi';
import { getProfile } from '@/api/profileApi';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

interface ArctypeQuestion {
  questionText: string;
  videoLink: string;
  questionId: string;
}

interface ArctypeQuestionsProps {
  activityId?: number;
}

const ArctypeQuestions: React.FC<ArctypeQuestionsProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [arctypeQuestions, setArctypeQuestions] = useState<ArctypeQuestion[]>([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');

  const { mutate: mutateGetVideoUrlById, isPending: isVideoLoading } = useMutation({
    mutationFn: (id: number) => getVideoUrl(id),
    onSuccess: (res) => {
      setVideoUrl(res?.data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || error?.message || 'Failed to load video');
      setIsLoading(false);
    },
  });

  // Fetch userId from profile API on mount
  useEffect(() => {
    setProfileLoading(true);
    getProfile()
      .then((res) => {
        const id = Number(res?.data?.entity?.userId);
        if (id) {
          setUserId(id);
          mutateGetArctypeQuestionsById(1);
        }
      })
      .catch(() => {
        toast.error('Failed to fetch user profile');
      })
      .finally(() => setProfileLoading(false));
  }, []);

  const { mutate: mutateGetArctypeQuestionsById } = useMutation({
    mutationFn: (id: number) => getUserQuestionsById(id),
    onSuccess: (res) => {
      debugger;
      setArctypeQuestions(res?.data || []);
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || error?.message || 'Failed to load questions');
      setIsLoading(false);
    },
  });

  const { mutate: mutateArctypeAnswer } = useMutation({
    mutationFn: (data: any) => arctypeAnswers(data),
    onSuccess: () => {
      toast.success('Answer submitted successfully');
      setIsAnimating(true);
      setTimeout(() => {
        if (currentQuestionIndex < arctypeQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          form.resetFields();
          const nextQ = arctypeQuestions[currentQuestionIndex + 1];
          if (nextQ) {
            mutateGetVideoUrlById(Number(nextQ.questionId));
          }
        } else {
          setModalOpen(false);
          setCurrentQuestionIndex(0);
          form.resetFields();
          window.location.reload();
        }
        setIsAnimating(false);
      }, 300);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || error?.message || 'Failed to submit answer');
    },
  });

  const handleLetsGo = () => {
    if (!userId) {
      toast.error('User ID not found');
      return;
    }
    setIsLoading(true);
    mutateGetArctypeQuestionsById(1);
    setModalOpen(true);
    setCurrentQuestionIndex(0);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const currentQuestion = arctypeQuestions[currentQuestionIndex];
      const ansText = form.getFieldValue('personalResponse');
      if (currentQuestion && ansText && userId) {
        const payload = {
          id: currentQuestion.questionId,
          questionId: currentQuestion.questionId,
          userId: userId,
          ansText: ansText,
          ansVideo: '',
        };
        mutateArctypeAnswer(payload);
      }
    });
  };

  const handleSkip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQuestionIndex < arctypeQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        form.resetFields();
        const nextQ = arctypeQuestions[currentQuestionIndex + 1];
        if (nextQ) {
          mutateGetVideoUrlById(Number(nextQ.questionId));
        }
      } else {
        setModalOpen(false);
        setCurrentQuestionIndex(0);
        form.resetFields();
        window.location.reload();
      }
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (modalOpen && arctypeQuestions.length > 0) {
      const currentQ = arctypeQuestions[currentQuestionIndex];
      if (currentQ) {
        console.log('Current questionId:', currentQ.questionId);
        mutateGetVideoUrlById(Number(currentQ.questionId));
      }
    }
  }, [modalOpen, currentQuestionIndex, arctypeQuestions]);

  if (profileLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Spin size="small" />
      </div>
    );
  }

  return (
    <>
      {arctypeQuestions.length !== 0 ? (
        <Card className="bg-[#FFF7E6] dark:bg-[#2D1B06] shadow-lg border-0 transition-colors duration-300">
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
            Get help setting up your social media profiles to reflect your personal or professional
            brand. In this session, you can also share your hobbies and interests so we can tailor
            your online presence to showcase what makes you unique. Lets build a profile that truly
            represents you.
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
                onClick={handleLetsGo}
                loading={isLoading}
              >
                Let&apos;s Go
              </Button>
            </Col>
          </Row>
        </Card>
      ) : (
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
              Your profile in reviewing
            </span>
          }
          className="bg-[#FFF7E6] dark:bg-[#2D1B06] shadow-lg border-0 transition-colors duration-300"
        >
          <Text className="text-sm">
            Your profile is currently under review by our team. We appreciate your patience as we
            ensure everything is in order. You will be notified once the review is complete.
          </Text>
          <div className="mt-4">
            <Text className="text-sm block">
              <b>What happens next?</b> Our experts will carefully review your submitted information
              and reach out if any further details are needed. This process helps us provide you
              with the best possible support and guidance.
            </Text>
            <Text className="text-sm block mt-2">
              <b>Thank you for your cooperation!</b> We are committed to helping you succeed and
              will keep you updated on your profile status.
            </Text>
            <Text className="text-sm block mt-2">
              <b>How long does it take?</b> Most reviews are completed within 1-2 business days. If
              additional information is required, we will contact you promptly to avoid any delays.
            </Text>
          </div>
        </Card>
      )}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={1100}
        centered
        destroyOnClose
      >
        <div className="mb-4">
          <Text className="mb-2 text-gray-800">Help us in creating your NIL profile</Text>
        </div>
        <Form form={form} layout="vertical">
          <Row gutter={32}>
            <Col span={16}>
              {/* Question */}
              <div
                className={`mb-4 transition-all duration-300 ${
                  isAnimating
                    ? 'opacity-0 transform translate-y-2'
                    : 'opacity-100 transform translate-y-0'
                }`}
              >
                {arctypeQuestions[currentQuestionIndex] && (
                  <Title level={5} className="mb-2 text-gray-800">
                    {arctypeQuestions[currentQuestionIndex].questionText}
                  </Title>
                )}
              </div>
              {/* YouTube Video */}
              <div
                className={`bg-gray-50 rounded-xl p-4 border transition-all duration-300 ${
                  isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
              >
                <div className="aspect-video flex items-center justify-center">
                  {isVideoLoading ? (
                    <Spin size="small" />
                  ) : videoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrl}
                      title={
                        arctypeQuestions[currentQuestionIndex]?.questionText || 'Question Video'
                      }
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg w-full h-full"
                    ></iframe>
                  ) : (
                    <Text className="text-gray-400">No video available for this question.</Text>
                  )}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="h-full flex flex-col justify-between">
                {/* Text Area */}
                <Form.Item
                  name="personalResponse"
                  label={<span className="text-base font-medium mb-2">Your Answer</span>}
                  rules={[{ required: true, message: 'Please share your thoughts' }]}
                  className={`flex-1  transition-all duration-300 ${
                    isAnimating
                      ? 'opacity-0 transform translate-x-2'
                      : 'opacity-100 transform translate-x-0'
                  }`}
                >
                  <Input.TextArea
                    rows={12}
                    className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-full"
                    style={{ resize: 'none', fontSize: '14px', minHeight: '400px' }}
                  />
                </Form.Item>
                {/* Buttons */}
                <div
                  className={`flex gap-3 justify-between transition-all duration-300 ${
                    isAnimating
                      ? 'opacity-0 transform translate-y-2'
                      : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      borderRadius: '5px',
                      fontSize: '13px',
                      height: '30px',
                      minWidth: '100px',
                    }}
                    className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                    icon={<CheckCircleOutlined />}
                    onClick={handleSubmit}
                  >
                    {currentQuestionIndex === arctypeQuestions.length - 1 ? 'Submit' : 'Save'}
                  </Button>
                  <Button
                    type="default"
                    size="large"
                    style={{
                      borderRadius: '5px',
                      fontSize: '13px',
                      height: '30px',
                      minWidth: '100px',
                    }}
                    icon={<ArrowRightOutlined />}
                    onClick={handleSkip}
                  >
                    {currentQuestionIndex === arctypeQuestions.length - 1
                      ? 'Skip & Submit'
                      : 'Skip'}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ArctypeQuestions;
