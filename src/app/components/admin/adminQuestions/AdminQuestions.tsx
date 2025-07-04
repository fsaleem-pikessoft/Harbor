'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { getAllProfiles } from '@/api/profileApi';
import { toast } from 'react-toastify';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text: string, record: any) => (
      <Link
        href={`/admin/adminQuestions/${record.userId}`}
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
      const safeStatus = typeof status === 'string' ? status.toLowerCase() : '';
      if (safeStatus === 'unpaid') {
        color = '#f04438';
        bg = 'rgba(240, 68, 56, 0.12)';
      } else if (safeStatus === 'pending' || safeStatus === 'panding') {
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
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'}
        </span>
      );
    },
  },
];

const AdminQuestions = () => {
  const [profileData, setProfileData] = useState([]);

  const { mutate: mutateGetAllProfiles, isPending: isProfilesLoading } = useMutation({
    mutationFn: () => getAllProfiles(),
    onSuccess: (res) => {
      setProfileData(res?.data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  useEffect(() => {
    mutateGetAllProfiles();
  }, []);

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Archetypes OS</Breadcrumb.Item>
        <Breadcrumb.Item>Questions</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: 'white', borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Questions</h2>
        <Table
          columns={columns}
          dataSource={profileData.map((item: any) => ({
            ...item,
            key: item.id || item.userId,
          }))}
          pagination={false}
          bordered={false}
          rowClassName={() => 'custom-row'}
          showHeader
          style={{ background: 'white' }}
          loading={isProfilesLoading}
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

export default AdminQuestions;
