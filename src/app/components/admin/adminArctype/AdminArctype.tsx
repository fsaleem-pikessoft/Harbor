'use client';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Breadcrumb, Button, Modal, Select, Row, Col, Spin } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { arctypeQuestions, assignArctypeQuestions } from '@/api/arctypeApi';
import { getAllProfiles } from '@/api/profileApi';

interface Profile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  tagLine: string | null;
  introVideo: string | null;
  industries: string | null;
  occupations: string | null;
}

const AdminArctype = () => {
  const [questions, setQuestions] = useState([]);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const { mutate: mutateArctypeQuestions, isPending: isQuestionsLoading } = useMutation({
    mutationFn: () => arctypeQuestions(),
    onSuccess: (res) => {
      debugger;
      setQuestions(res?.data || []);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateGetProfile, isPending: isProfilesLoading } = useMutation({
    mutationFn: () => getAllProfiles(),
    onSuccess: (res) => {
      setProfiles(res?.data || []);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateAssignArctypeQuestions, isPending: isAssigning } = useMutation({
    mutationFn: (data: any) => assignArctypeQuestions(data),
    onSuccess: () => {
      toast.success('Questions assigned successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  useEffect(() => {
    mutateArctypeQuestions();
    mutateGetProfile();
  }, []);

  const handleCheck = (id: number) => {
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleAssign = () => {
    if (profiles.length > 0) {
      setSelectedOption(profiles[0].userId.toString());
    } else {
      setSelectedOption(undefined);
    }
    setModalOpen(true);
  };

  const handleAssignArctypeQuestions = () => {
    const data = {
      userId: Number(selectedOption),
      questionIds: checkedIds,
    };
    mutateAssignArctypeQuestions(data);
  };

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>ArctypeOs</Breadcrumb.Item>
        <Breadcrumb.Item>Arctype</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
          className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
          icon={<PlusOutlined />}
          onClick={handleAssign}
          disabled={isQuestionsLoading || isProfilesLoading}
        >
          Assign questions
        </Button>
      </div>
      <Spin spinning={isQuestionsLoading || isProfilesLoading} size="small">
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 24,
            background: '#f5f6fa',
            marginBottom: 32,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Row gutter={[16, 16]}>
            {questions.map((q: any) => (
              <Col key={q.id} span={8}>
                <div
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    padding: 8,
                    background: '#fff',
                    minHeight: 80,
                    height: 110,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCheck(q.id)}
                >
                  <input
                    type="checkbox"
                    checked={checkedIds.includes(q.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleCheck(q.id)}
                    style={{ marginRight: 4, marginLeft: 4 }}
                  />
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 12,
                      display: 'block',
                      wordBreak: 'break-word',
                    }}
                  >
                    {q.questionText}
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Spin>
      <Modal
        title="Assign Questions"
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <div style={{ marginBottom: 16 }}>
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder="Select user to assign"
            value={selectedOption}
            onChange={setSelectedOption}
            options={profiles.map((profile) => ({
              value: profile.userId.toString(),
              label: `${profile.firstName} ${profile.lastName}`,
            }))}
            loading={isProfilesLoading}
          />
        </div>
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
              className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => {
                handleAssignArctypeQuestions();
                setModalOpen(false);
              }}
              loading={isAssigning}
              disabled={checkedIds.length === 0 || !selectedOption}
            >
              Assign
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default AdminArctype;
