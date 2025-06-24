'use client';

import { Breadcrumb, Table } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Archetype',
    dataIndex: 'archetype',
    key: 'archetype',
    render: (text: string) => <span style={{ fontWeight: 300, fontSize: '12px' }}>{text}</span>,
  },
  {
    title: 'Number Of Questions',
    dataIndex: 'questions',
    key: 'questions',
    render: (questions: string[]) => (
      <span style={{ fontWeight: 300, fontSize: '12px' }}>{questions.length} </span>
    ),
  },
];

// Generate random questions for each archetype
function getRandomQuestions() {
  const count = Math.floor(Math.random() * 6); // 0 to 5
  return Array.from({ length: count }, (_, i) => `Question ${i + 1}`);
}

const data = [
  { key: '1', archetype: 'Ruler', questions: getRandomQuestions() },
  { key: '2', archetype: 'Creator/Artist', questions: getRandomQuestions() },
  { key: '3', archetype: 'Sage', questions: getRandomQuestions() },
  { key: '4', archetype: 'Innocent', questions: getRandomQuestions() },
  { key: '5', archetype: 'Explorer', questions: getRandomQuestions() },
  { key: '6', archetype: 'Rebel', questions: getRandomQuestions() },
  { key: '7', archetype: 'Hero', questions: getRandomQuestions() },
  { key: '8', archetype: 'Wizard', questions: getRandomQuestions() },
  { key: '9', archetype: 'Jester', questions: getRandomQuestions() },
  { key: '10', archetype: 'Everyman', questions: getRandomQuestions() },
  { key: '11', archetype: 'Lover', questions: getRandomQuestions() },
  { key: '12', archetype: 'Caregiver', questions: getRandomQuestions() },
];

const AdminAma = () => {
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
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>AMA</h2>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered={false}
          rowClassName={() => 'custom-row'}
          showHeader
          style={{ background: 'white' }}
        />
        <style jsx global>{`
          .custom-row td {
            border-bottom: 1px solid #f0f0f0 !important;
          }
          .ant-table-thead > tr > th {
            font-weight: 700;
            color: #555;
            background: #fff;
            border-bottom: 1px solid #f0f0f0 !important;
          }
        `}</style>
      </div>
    </>
  );
};

export default AdminAma;
