'use client';

import { Provider } from 'react-redux';
import { store } from '@/app/redux/store';
import { Layout, ConfigProvider, theme, Spin } from 'antd';
import Sidebar from '@/app/components/common/Sidebar';
import Header from '@/app/components/common/Header';
import Breadcrumbs from '@/app/components/common/Breadcrumbs';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/redux/store';

const { Content } = Layout;

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Simulate loading time for token read
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const sidebarWidth = collapsed ? 80 : 220;

  if (loading) {
    return (
      <Spin spinning={true} size="small">
        <div style={{ minHeight: '100vh', background: '#F5F7F9' }} />
      </Spin>
    );
  }

  const layoutContent = isAuthenticated && !pathname.startsWith('/auth/');
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorBgLayout: '#F5F7FA',
            borderRadius: 12,
            colorPrimary: '#3A57E8',
          },
        }}
      >
        <Spin spinning={loading} size="large">
          {layoutContent ? (
            <LayoutWrapperContent
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              sidebarWidth={sidebarWidth}
            >
              {children}
            </LayoutWrapperContent>
          ) : (
            <div style={{ minHeight: '100vh', background: '#F5F7F9' }}>{children}</div>
          )}
        </Spin>
      </ConfigProvider>
    </Provider>
  );
}

function LayoutWrapperContent({ collapsed, setCollapsed, sidebarWidth, children }: any) {
  const roles = useSelector((state: RootState) => state.role.roles);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout
        style={{
          marginLeft: sidebarWidth,
          height: '100vh',
          overflow: 'hidden',
          transition: `margin-left 0.2s ease-in-out`,
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: sidebarWidth,
            right: 0,
            zIndex: 1000,
            transition: `left 0.2s ease-in-out`,
          }}
        >
          <Header />
        </div>
        <Content
          style={{
            marginTop: 64,
            padding: 24,
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            background: 'rgb(243 244 246)',
          }}
        >
          {!(roles && roles.includes('Admin')) && <Breadcrumbs />}
          {children}
        </Content>
      </Layout>
    </div>
  );
}
