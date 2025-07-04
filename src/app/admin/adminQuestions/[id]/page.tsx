'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumb, Row, Col, Card, Avatar, Button, Typography, Modal, Input, Tabs } from 'antd';
import {
  HomeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { getProfileById } from '@/api/profileApi';
import { toast } from 'react-toastify';
import { deleteQuestion, getAnswer, updateAnswer } from '@/api/amaApi';
import { arctypeQuestionsById, getArctypeAnswer } from '@/api/arctypeApi';

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

const AdminQuestionDetail = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [arctypeQuestions, setArctypeQuestions] = useState<any[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isArctypeModalOpen, setIsArctypeModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [answerText, setAnswerText] = useState('');
  const [arctypeAnswerText, setArctypeAnswerText] = useState('');
  const [questionId, setQuestionId] = useState(0);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteTargetQuestion, setDeleteTargetQuestion] = useState<any>(null);

  const handleViewQuestion = (question: any, isArctype = false) => {
    if (isArctype) {
      setSelectedQuestion(question);
      setQuestionId(question?.questionId);
      setArctypeAnswerText('');

      const data = {
        QuestionId: question?.questionId,
        UserId: id,
      };
      mutateGetArctypeAnswer(data);
      setIsArctypeModalOpen(true);
    } else {
      setSelectedQuestion(question);
      setQuestionId(question?.questionId);
      const data = {
        userId: question?.userId,
        questionId: question?.questionId,
      };
      mutateGetAnswer(data);
      setIsViewModalOpen(true);
    }
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

  const { mutate: mutateGetProfileById } = useMutation({
    mutationFn: (id: any) => getProfileById(id),
    onSuccess: (res) => {
      setProfileData(res?.data?.entity);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetArctypeQuestions } = useMutation({
    mutationFn: (data: any) => arctypeQuestionsById(data.ModuleId, data.UserId),
    onSuccess: (res) => {
      debugger;
      if (Array.isArray(res?.data?.result)) {
        setArctypeQuestions(res.data.result);
      } else if (Array.isArray(res?.data)) {
        setArctypeQuestions(res.data);
      } else {
        console.log('No result array found in response. Full response:', res);
        setArctypeQuestions([]);
      }
    },
    onError: (error: any) => {
      console.error('Arctype API error:', error);
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetAmaQuestions } = useMutation({
    mutationFn: (data: any) => arctypeQuestionsById(data.ModuleId, data.UserId),
    onSuccess: (res) => {
      debugger;
      if (Array.isArray(res?.data?.result)) {
        setQuestions(res.data.result);
      } else if (Array.isArray(res?.data)) {
        setQuestions(res.data);
      } else {
        console.log('No result array found in response. Full response:', res);
        setQuestions([]);
      }
    },
    onError: (error: any) => {
      console.error('Arctype API error:', error);
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

  const { mutate: mutateGetArctypeAnswer } = useMutation({
    mutationFn: (data: any) => getArctypeAnswer(data.UserId, data.QuestionId),
    onSuccess: (res) => {
      setArctypeAnswerText(res.data.result.ansText);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  useEffect(() => {
    if (!id) {
      console.log('id is undefined. Skipping calls.');
      return;
    }

    console.log('id is:', id);
    mutateGetProfileById(id);
    debugger;
    const data = {
      ModuleId: '1',
      UserId: id,
    };

    const amaData = {
      ModuleId: '2',
      UserId: id,
    };
    mutateGetAmaQuestions(amaData);
    mutateGetArctypeQuestions(data);
  }, [id]);

  // Debug effect to monitor selectedQuestion changes

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

  const handleArctypeUpdate = () => {
    if (selectedQuestion && arctypeAnswerText.trim()) {
      console.log('Updating Arctype answer for question ID:', questionId);
      console.log('User ID:', id);
      console.log('Answer text:', arctypeAnswerText);
      // Add your Arctype update API call here
      // Example: mutateUpdateArctypeAnswer({ userId: id, questionId: questionId, answer: arctypeAnswerText });
    }
  };

  const handleArctypeApprove = () => {
    if (selectedQuestion) {
      console.log('Approving Arctype answer for question ID:', questionId);
      console.log('User ID:', id);
      // Add your Arctype approve API call here
      // Example: mutateApproveArctypeAnswer({ userId: id, questionId: questionId });
      setIsArctypeModalOpen(false);
      setSelectedQuestion(null);
      setArctypeAnswerText('');
    }
  };

  const renderQuestionsList = (questionsList: any[], isArctype = false) => (
    <div
      style={{
        maxHeight: 500,
        overflowY: 'auto',
        paddingRight: 8,
      }}
    >
      {questionsList.map((q, idx) => {
        // Handle different data structures for AMA vs Arctype questions
        const title = isArctype ? q.questionText : q.question?.title;
        const description = isArctype ? q.videoLink : q.question?.description;

        return (
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
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#666', fontSize: 12 }}>
                {isArctype ? `Video: ${description}` : description}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar
                style={{ backgroundColor: '#ff6b35', cursor: 'pointer' }}
                icon={<EyeOutlined />}
                onClick={() => handleViewQuestion(q, isArctype)}
              />
              <Avatar
                style={{ backgroundColor: '#ff4d4f', cursor: 'pointer' }}
                icon={<DeleteOutlined />}
                onClick={() => handleCardDelete(q)}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );

  const renderAmaQuestionsList = (questionsList: any[], isArctype = false) => (
    <div
      style={{
        maxHeight: 500,
        overflowY: 'auto',
        paddingRight: 8,
      }}
    >
      {questionsList.map((q, idx) => {
        // Handle different data structures for AMA vs Arctype questions
        const title = isArctype ? q.questionText : q.question?.title;
        const description = isArctype ? q.videoLink : q.question?.description;

        return (
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
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#666', fontSize: 12 }}>
                {isArctype ? `Video: ${description}` : description}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar
                style={{ backgroundColor: '#ff6b35', cursor: 'pointer' }}
                icon={<EyeOutlined />}
                onClick={() => handleViewQuestion(q, isArctype)}
              />
              <Avatar
                style={{ backgroundColor: '#ff4d4f', cursor: 'pointer' }}
                icon={<DeleteOutlined />}
                onClick={() => handleCardDelete(q)}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Archetype OS</Breadcrumb.Item>
        <Breadcrumb.Item>Questions</Breadcrumb.Item>
        <Breadcrumb.Item>Question Detail</Breadcrumb.Item>
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
            style={{ borderRadius: 12 }}
            bodyStyle={{ minHeight: 400, background: '#fafcff', padding: 0 }}
          >
            <Tabs
              defaultActiveKey="1"
              style={{ padding: '16px 16px 0 16px' }}
              items={[
                {
                  key: '1',
                  label: `AMA Questions(${questions.length})`,
                  children: renderAmaQuestionsList(questions, true),
                },
                {
                  key: '2',
                  label: `Arctype Questions (${arctypeQuestions.length})`,
                  children: renderQuestionsList(arctypeQuestions, true),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

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

      {/* Arctype Question Modal */}
      <Modal
        title={`Arctype Question`}
        open={isArctypeModalOpen}
        onCancel={() => {
          setIsArctypeModalOpen(false);
          setSelectedQuestion(null);
          setArctypeAnswerText('');
        }}
        footer={null}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>Answer:</div>
          <Input.TextArea
            value={arctypeAnswerText}
            onChange={(e) => setArctypeAnswerText(e.target.value)}
            placeholder="Enter answer text"
            rows={6}
            style={{ marginBottom: 16 }}
            onFocus={() => console.log('TextArea focused, current value:', arctypeAnswerText)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button
            type="primary"
            onClick={handleArctypeUpdate}
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
            onClick={handleArctypeApprove}
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

export default AdminQuestionDetail;
