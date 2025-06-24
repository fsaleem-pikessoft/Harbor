'use client';

import { FileFilled, MessageFilled, HomeOutlined } from '@ant-design/icons';
import { Col, Row, Card, Avatar, Typography, Breadcrumb } from 'antd';
import { useRouter } from 'next/navigation';

const { Text } = Typography;
const AdminDashboard = () => {
  const router = useRouter();

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title={
              <span>
                <Avatar
                  icon={<FileFilled />}
                  size={24}
                  style={{ backgroundColor: '#52c41a', marginRight: 8 }}
                />
                Archetypes OS
              </span>
            }
          >
            <Row gutter={16}>
              <Col span={6}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push('/admin/adminProfile')}
                >
                  <Avatar icon={<FileFilled />} size={40} style={{ backgroundColor: '#52c41a' }} />
                  <Text style={{ fontSize: '12px', marginTop: '5px' }}>Profile</Text>
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push('/admin/adminAma')}
                >
                  <Avatar
                    icon={<MessageFilled />}
                    size={40}
                    style={{ backgroundColor: '#52c41a' }}
                  />
                  <Text style={{ fontSize: '12px', marginTop: '5px' }}>AMA</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
