'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Card, Checkbox, Row, Col, Select } from 'antd';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { getAllProfiles } from '@/api/profileApi';
import { toast } from 'react-toastify';
import { createQuestion, getAllQuestions } from '@/api/amaApi';
import { assignArctypeQuestions } from '@/api/arctypeApi';

const AdminAma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [checkedQuestions, setCheckedQuestions] = useState<{ [key: number]: boolean }>({});
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const [profiles, setProfiles] = useState<any[]>([]);

  const { mutate: mutateGetAllProfiles, isPending: isProfilesLoading } = useMutation({
    mutationFn: () => getAllProfiles(),
    onSuccess: (res) => {
      setProfiles(res?.data || []);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetAllQuestions } = useMutation({
    mutationFn: () => getAllQuestions(),
    onSuccess: (res) => {
      setQuestions(res?.data || res); // handle both {data:[]} and []
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateCreateQuestions } = useMutation({
    mutationFn: (data: any) => createQuestion(data),
    onSuccess: () => {
      toast.success('uestion create successfully');
      mutateGetAllQuestions();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateAssignAmaQuestions } = useMutation({
    mutationFn: (data: any) => assignArctypeQuestions(data),
    onSuccess: () => {
      toast.success('Questions assigned successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const handleCreateQuestion = (text: string) => {
    const data = {
      questionText: text,
    };
    mutateCreateQuestions(data);
  };

  useEffect(() => {
    mutateGetAllProfiles();
    mutateGetAllQuestions();
  }, []);

  const handleAssignQuestions = (userId: any, questionIds: number[]) => {
    const data = {
      userId: Number(userId),
      questionIds: questionIds,
    };
    mutateAssignAmaQuestions(data);
  };

  useEffect(() => {
    if (assignModalOpen && profiles.length === 0) {
      mutateGetAllProfiles();
    }
  }, [assignModalOpen]);

  useEffect(() => {
    if (assignModalOpen && profiles.length > 0 && !selectedProfile) {
      setSelectedProfile(profiles[0].userId);
    }
  }, [assignModalOpen, profiles, selectedProfile]);

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Archetypes OS</Breadcrumb.Item>
        <Breadcrumb.Item>AMA</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: 'white', borderRadius: 12, padding: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0 }}>AMA</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button
              type="primary"
              style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
              className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Create Question
            </Button>
            <Button
              type="primary"
              style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
              className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => setAssignModalOpen(true)}
            >
              Assign question
            </Button>
          </div>
        </div>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          title="Create Question"
        >
          <Input
            placeholder="Enter your question"
            value={question}
            size="large"
            onChange={(e) => setQuestion(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
              className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => {
                handleCreateQuestion(question);
                setIsModalOpen(false);
                setQuestion('');
              }}
              disabled={!question.trim()}
            >
              Create
            </Button>
          </div>
        </Modal>
        <Modal
          title="Assign Questions"
          open={assignModalOpen}
          footer={null}
          onCancel={() => setAssignModalOpen(false)}
        >
          <Select
            showSearch
            allowClear
            style={{ width: '100%', marginBottom: 16 }}
            placeholder="Select profile to assign"
            value={selectedProfile}
            onChange={setSelectedProfile}
            options={profiles.map((profile: any) => ({
              value: profile.userId,
              label: `${profile.firstName} ${profile.lastName}`,
            }))}
            loading={isProfilesLoading}
            optionFilterProp="label"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
              className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              disabled={!selectedProfile || Object.values(checkedQuestions).every((v) => !v)}
              onClick={() => {
                const selectedIds = Object.entries(checkedQuestions)
                  .filter(([checked]) => checked)
                  .map(([id]) => Number(id));
                handleAssignQuestions(selectedProfile, selectedIds);
                setAssignModalOpen(false);
                setSelectedProfile(undefined);
              }}
            >
              Assign
            </Button>
          </div>
        </Modal>
        <Row gutter={[16, 16]}>
          {questions && questions.length > 0 ? (
            questions.map((q: any) => (
              <Col xs={24} sm={24} md={12} lg={8} key={q.id}>
                <Card
                  style={{ borderRadius: 8, cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setCheckedQuestions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                >
                  <Checkbox
                    checked={!!checkedQuestions[q.id]}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setCheckedQuestions((prev) => ({ ...prev, [q.id]: e.target.checked }))
                    }
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ fontSize: 15 }}>{q.questionText}</span>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div style={{ textAlign: 'center', color: '#888' }}>No questions found.</div>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default AdminAma;
