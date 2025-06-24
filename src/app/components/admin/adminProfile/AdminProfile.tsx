'use client';

import { Table } from 'antd';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text: string, record: any) => (
      <Link
        href={`/admin/adminProfile/${record.key}`}
        style={{ fontWeight: 300, fontSize: '12px', color: '#1677ff', cursor: 'pointer' }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    align: 'right' as const,
    render: (text: string) => <span style={{ fontWeight: 300, fontSize: '12px' }}>{text}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'right' as const,
    render: (text: string) => <span style={{ fontWeight: 300, fontSize: '12px' }}>{text}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'right' as const,
    render: (status: string) => {
      let color = '#16b364'; // green
      let bg = 'rgba(22, 179, 100, 0.12)'; // light green
      if (status.toLowerCase() === 'unpaid') {
        color = '#f04438';
        bg = 'rgba(240, 68, 56, 0.12)';
      } else if (status.toLowerCase() === 'pending' || status.toLowerCase() === 'panding') {
        color = '#f79009';
        bg = 'rgba(247, 144, 9, 0.12)';
      }
      return (
        <span
          style={{
            color,
            background: bg,
            borderRadius: 16,
            padding: '4px 16px',
            fontWeight: 400,
            display: 'inline-block',
            minWidth: 70,
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
];

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'Active',
  },
  {
    key: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'Panding',
  },
];

const AdminProfile = () => {
  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Archetypes OS</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: 'white', borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Admin Profile</h2>
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

export default AdminProfile;
