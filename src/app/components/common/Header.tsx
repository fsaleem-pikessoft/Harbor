'use client';

import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout, Space, Avatar, Dropdown, Input, MenuProps, message } from 'antd';
import { SearchOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
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

interface ApiError {
  response?: {
    data: string;
  };
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

  const { mutate: mutateMe } = useMutation({
    mutationFn: () => meAuth(),
    onSuccess: (res) => {
      setUserInfo(res?.data?.info);
    },
    onError: (error: ApiError) => {
      message.error(error?.response?.data);
    },
  });

  useEffect(() => {
    mutateMe();
  }, [mutateMe]);

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
        allowClear
        size="large"
        onKeyDown={onSearch}
        style={{
          width: 300,
          borderRadius: 10,
          fontFamily: 'Manrope',
          backgroundColor: 'rgb(243 244 246)',
          border: 'none',
        }}
        prefix={
          <SearchOutlined
            style={{ color: 'rgba(0,0,0,.45)', backgroundColor: 'rgb(243 244 246)' }}
          />
        }
        className="custom-search-input"
      />

      <Space size="large">
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
          trigger={['hover', 'click']}
        >
          <Space style={{ cursor: 'pointer', fontFamily: 'Manrope' }}>
            <Avatar src="/images/avatar.svg" />
            <span style={{ marginRight: 4 }}>
              {userInfo?.firstName} {userInfo?.lastName}
            </span>
            <DownOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
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
