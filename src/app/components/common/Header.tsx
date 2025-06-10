'use client';

import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout, Button, Space, Avatar, Dropdown, Input, MenuProps, message } from 'antd';
import { BellOutlined, UserOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { meAuth } from '@/api/authApi';
import { useEffect, useState } from 'react';

const { Header: AntHeader } = Layout;

const queryClient = new QueryClient();

interface UserInfo {
  firstName: string;
  lastName: string;
}

function HeaderContent() {
  const router = useRouter();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        logout();
      },
    },
  ];

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      const searchTerm = value.trim().toUpperCase();
      if (searchTerm) {
        router.push(`/company/${searchTerm}`);
      }
    }
  };

  const { mutate: mutateMe, isPending } = useMutation({
    mutationFn: () => meAuth(),
    onSuccess: (res) => {
      setUserInfo(res?.data?.info);
    },
    onError: (error: any) => {
      message.error(error?.response?.data);
    },
  });

  useEffect(() => {
    mutateMe();
  }, []);

  return (
    <AntHeader
      style={{
        background: '#fff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: 64,
        fontFamily: 'Manrope',
      }}
    >
      <Input
        type="search"
        placeholder="Enter ticker symbol..."
        allowClear
        size="large"
        onKeyDown={onSearch}
        style={{
          width: 300,
          borderRadius: 8,
          fontFamily: 'Manrope',
        }}
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
      />

      <Space size="large">
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 20 }} />}
          style={{ display: 'flex', alignItems: 'center' }}
        />

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Space style={{ cursor: 'pointer', fontFamily: 'Manrope' }}>
            <Avatar icon={<UserOutlined />} />
            <span>
              {userInfo?.firstName} {userInfo?.lastName}
            </span>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
}

export default function Header() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeaderContent />
    </QueryClientProvider>
  );
}
