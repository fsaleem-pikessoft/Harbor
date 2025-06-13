'use client';

import { Card, Typography, Button, Row, Col, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RocketOutlined, CalendarOutlined, GlobalOutlined, ShopOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(true);

  const handleClick = () => {
    router.push('/profile');
  };

  const products = [
    {
      id: 1,
      name: 'Storyline Template Pack',
      price: '$29',
    },
    {
      id: 2,
      name: 'Personal Branding eBook',
      price: '$15',
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={600}
        centered
        className="welcome-modal"
      >
        <Row>
          <Col span={24}>
            <div className="p-2">
              <div className="mb-6">
                <Title
                  level={3}
                  className="text-secondary-dark mb-4 text-left font-[700] tracking-wide"
                >
                  Welcome to Harbor
                </Title>
                <div className="h-1 w-20 bg-primary mb-6"></div>
              </div>
              <Text className="block text-gray-700 text-base leading-relaxed mb-6">
                Welcome I see you are new here. I will help you prepare for your arrival by
                assisting you in completing your I AM Profile. This is your first step towards an
                amazing journey.
              </Text>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <span>Personalized guidance</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <span>Step-by-step process</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <span>24/7 support available</span>
                </div>
              </div>
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    className="bg-button hover:bg-button/80 text-xs px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => {
                      setModalOpen(false);
                      handleClick();
                    }}
                    style={{ borderRadius: '10px' }}
                  >
                    Setup Your Profile
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Modal>

      <Row gutter={16}>
        <Col span={24}>
          <Card bodyStyle={{ padding: '14px' }} className="mb-6">
            <Row justify="end" gutter={[16, 16]}>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  style={{ borderRadius: '10px' }}
                  className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  My Launchpad
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<CalendarOutlined />}
                  style={{ borderRadius: '10px' }}
                  className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Schedule
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<GlobalOutlined />}
                  style={{ borderRadius: '10px' }}
                  className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Ecosystem News
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShopOutlined />}
                  style={{ borderRadius: '10px' }}
                  className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Marketplace
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Book a Session" className="flex flex-col">
                <Row gutter={16} className="flex-grow">
                  <Col span={24}>
                    <Text className="text-sm">Schedule a 1-on-1 membership call with me</Text>
                  </Col>
                </Row>
                <Row justify="end" className="mt-auto">
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      style={{ borderRadius: '10px' }}
                      className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      View Calendar
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Products" className="h-full">
                <Row gutter={[16, 16]}>
                  {products.map((product) => (
                    <Col span={24} key={product.id}>
                      <Card bodyStyle={{ padding: '10px' }}>
                        <Row gutter={16}>
                          <Col span={21}>
                            <Text className="text-sm">{product.name}</Text>
                          </Col>
                          <Col span={3}>
                            <Text className="text-sm">{product.price}</Text>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Upcoming Events" className="mt-4 ">
                <ul className="list-none p-0 m-0">
                  <li className="mb-4 pb-4 border-b border-gray-100">
                    <Text strong className="block">
                      Web Development Workshop
                    </Text>
                    <Text type="secondary" className="text-sm">
                      March 15, 2024 • 2:00 PM
                    </Text>
                    <Text className="block text-sm mt-1">
                      Learn the fundamentals of modern web development
                    </Text>
                  </li>
                  <li className="mb-4 pb-4 border-b border-gray-100">
                    <Text strong className="block">
                      UI/UX Design Masterclass
                    </Text>
                    <Text type="secondary" className="text-sm">
                      March 20, 2024 • 3:30 PM
                    </Text>
                    <Text className="block text-sm mt-1">
                      Advanced techniques for creating beautiful interfaces
                    </Text>
                  </li>
                  <li>
                    <Text strong className="block">
                      Career Development Session
                    </Text>
                    <Text type="secondary" className="text-sm">
                      March 25, 2024 • 1:00 PM
                    </Text>
                    <Text className="block text-sm mt-1">
                      Tips and strategies for career growth in tech
                    </Text>
                  </li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
