'use client';

import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
  GlobalOutlined,
  BankOutlined,
  RadarChartOutlined,
  WalletOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { BsPersonVcard } from 'react-icons/bs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState('/tickers');

  useEffect(() => {
    setSelectedKey(pathname);
  }, [pathname]);

  const items = [
    { key: '/dashboard', icon: <BsPersonVcard />, label: 'Dashboard' },
    { key: '/profile', icon: <UserOutlined />, label: 'Profile' },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={220}
      trigger={null}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        height: '100vh',
        overflow: 'auto',
        background: '#FFFFFF',
        paddingTop: 16,
        borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        fontFamily: 'Manrope',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          marginBottom: 16,
        }}
      >
        {!collapsed && (
          <div style={{ fontSize: '20px', fontWeight: 600, textAlign: 'center' }}>Harbor</div>
        )}
        <div
          onClick={() => onCollapse(!collapsed)}
          style={{
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => router.push(key)}
        items={items}
        style={{
          fontFamily: 'Manrope',
          fontWeight: 'bold',
          fontSize: '12px',
        }}
      />
    </Sider>
  );
};

export default Sidebar;
