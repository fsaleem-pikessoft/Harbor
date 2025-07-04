'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumb, Row, Col, Card, Avatar, Button, Typography, Modal, Form, Input } from 'antd';
import {
  HomeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { getProfileById } from '@/api/profileApi';
import { toast } from 'react-toastify';
import {
  createQuestion,
  deleteQuestion,
  getAnswer,
  getUserQuestionById,
  updateAnswer,
} from '@/api/amaApi';

const { Title, Text } = Typography;

const MOCK_SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/',
  linkedin: 'https://linkedin.com/',
  instagram: 'https://instagram.com/',
  youtube: 'https://youtube.com/',
};

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

const AmaDetailPage = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [answerText, setAnswerText] = useState('');
  const [questionId, setQuestionId] = useState(0);
  const [form] = Form.useForm();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteTargetQuestion, setDeleteTargetQuestion] = useState<any>(null);

  const handleAddQuestion = () => {
    setIsModalOpen(true);
  };

  const handleViewQuestion = (question: any) => {
    setSelectedQuestion(question);
    setQuestionId(question?.questionId);
    const data = {
      userId: question?.userId,
      questionId: question?.questionId,
    };
    mutateGetAnswer(data);
    setIsViewModalOpen(true);
  };

  const handleUpdateAnswer = () => {
    if (selectedQuestion && answerText.trim()) {
      const data = {
        userId: parseInt(id),
        questionId: questionId,
        answer: answerText,
      };
      updateAnswerMutation.mutate(data);
    }
  };

  // const handleDeleteAnswer = () => {
  if (selectedQuestion) {
    console.log('Deleting answer for question ID:', selectedQuestion.questionId);
    // Add your delete API call here
    // Example: deleteAnswer(selectedQuestion.questionId);
    setIsViewModalOpen(false);
    setSelectedQuestion(null);
    setAnswerText('');
  }
  // };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalOpen(false);
        onAddQuestion(values);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const { mutate: mutateGetProfileById } = useMutation({
    mutationFn: (id: any) => getProfileById(id),
    onSuccess: (res) => {
      debugger;
      setProfileData(res?.data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateAddQuestions } = useMutation({
    mutationFn: (data: any) => createQuestion(data),
    onSuccess: (res) => {
      debugger;
      toast.success(res?.data?.message);
      mutateGetQuestions(id);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetQuestions } = useMutation({
    mutationFn: (id: any) => getUserQuestionById(id),
    onSuccess: (res) => {
      if (Array.isArray(res?.data)) {
        setQuestions(res.data);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const updateAnswerMutation = useMutation({
    mutationFn: (data: any) => updateAnswer(data),
    onSuccess: (res) => {
      setIsViewModalOpen(false);
      toast.success(res?.data);
      setSelectedQuestion(null);
      setAnswerText('');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateDeleteQuestion } = useMutation({
    mutationFn: (data: any) => deleteQuestion(data),
    onSuccess: (res) => {
      debugger;
      toast.success(res?.data);
      mutateGetQuestions(id);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetAnswer } = useMutation({
    mutationFn: (data: any) => getAnswer(data),
    onSuccess: (res) => {
      debugger;
      setAnswerText(res?.data?.answerText);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const onAddQuestion = (values: { title: string; description: string }) => {
    const data = {
      title: values?.title,
      description: values?.description,
      assignToUserId: id,
    };
    mutateAddQuestions(data);
  };

  useEffect(() => {
    mutateGetProfileById(id);
    mutateGetQuestions(id);
  }, [id]);

  const handleConfirmDelete = (userId: number, questionId: number) => {
    const data = {
      userId: userId,
      questionId: questionId,
    };

    mutateDeleteQuestion(data);
  };

  const handleCardDelete = (question: any) => {
    setDeleteTargetQuestion(question);
    setIsDeleteConfirmOpen(true);
  };

  const handleApproveAnswer = () => {
    if (selectedQuestion) {
      // Call your approve API here
      // Example: mutateApproveAnswer({ userId: selectedQuestion.userId, questionId: selectedQuestion.questionId });
      console.log('Approved answer for:', selectedQuestion);
      setIsViewModalOpen(false);
      setSelectedQuestion(null);
      setAnswerText('');
    }
  };

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Archetype OS</Breadcrumb.Item>
        <Breadcrumb.Item>AMA</Breadcrumb.Item>
        <Breadcrumb.Item>Questions</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[24, 24]}>
        {/* Left 8 columns: Archetype Cards */}
        <Col xs={24} lg={8}>
          <Card
            className="shadow-lg rounded-2xl"
            style={{
              padding: 24,
              textAlign: 'center',
              position: 'relative',
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
                {profileData?.firstName?.[0]}
                {profileData?.lastName?.[0]}
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
          </Card>
        </Col>
        {/* Right 16 columns: Questions Card */}
        <Col xs={24} lg={16}>
          <Card
            title={<span style={{ fontWeight: 700, fontSize: 20 }}>Questions</span>}
            extra={
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                className="bg-button  text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                onClick={handleAddQuestion}
                icon={<PlusOutlined />}
              >
                Add Question
              </Button>
            }
            style={{ borderRadius: 12 }}
            bodyStyle={{ minHeight: 400, background: '#fafcff' }}
          >
            <div
              style={{
                maxHeight: 500,
                overflowY: 'auto',
                paddingRight: 8,
              }}
            >
              {questions.map((q, idx) => (
                <Card
                  key={idx}
                  size="small"
                  hoverable
                  style={{
                    marginBottom: 12,
                    borderRadius: 8,
                    border: '1px solid #e6e6e6',
                    background: '#fff',
                  }}
                  bodyStyle={{
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{q.question?.title}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>{q.question?.description}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar
                      style={{ backgroundColor: '#ff6b35', cursor: 'pointer' }}
                      icon={<EyeOutlined />}
                      onClick={() => handleViewQuestion(q)}
                    />
                    <Avatar
                      style={{ backgroundColor: '#ff4d4f', cursor: 'pointer' }}
                      icon={<DeleteOutlined />}
                      onClick={() => handleCardDelete(q)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
      <Modal title="Add Question" open={isModalOpen} onCancel={handleModalCancel} footer={null}>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input
              placeholder="Enter question title"
              size="large"
              className="rounded-lg pt-2 pb-2"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea placeholder="Enter question description" rows={4} />
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                onClick={handleModalOk}
                size="large"
                style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
                className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Answer Modal */}
      <Modal
        title={`View Answer - ${selectedQuestion?.question?.title}`}
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          setSelectedQuestion(null);
          setAnswerText('');
        }}
        footer={null}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Question:</div>
          <div style={{ color: '#666', marginBottom: 16 }}>
            {selectedQuestion?.question?.description}
          </div>

          <div style={{ fontWeight: 600, marginBottom: 8 }}>Answer:</div>
          <Input.TextArea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Enter answer text"
            rows={6}
            style={{ marginBottom: 16 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button
            type="primary"
            onClick={handleUpdateAnswer}
            size="large"
            style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
            className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            Update
          </Button>
          <Button
            style={{
              borderRadius: '5px',
              fontSize: '13px',
              height: '30px',
              backgroundColor: 'rgb(19 194 150)',
            }}
            className="custom-green-btn text-xs rounded-none px-6 flex items-center text-white "
            size="large"
            onClick={handleApproveAnswer}
          >
            Approve
          </Button>
        </div>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        footer={null}
      >
        <div style={{ marginBottom: 24 }}>Are you sure you want to delete this answer?</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button
            onClick={() => setIsDeleteConfirmOpen(false)}
            style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              if (deleteTargetQuestion) {
                handleConfirmDelete(deleteTargetQuestion.userId, deleteTargetQuestion.questionId);
                setIsDeleteConfirmOpen(false);
              }
            }}
            style={{
              backgroundColor: '#ff4d4f',
              borderColor: '#ff4d4f',
              color: '#fff',
              borderRadius: '5px',
              fontSize: '13px',
              height: '30px',
            }}
          >
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AmaDetailPage;
