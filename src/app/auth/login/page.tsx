'use client';

import { useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Form, Input, Button, Card, Typography, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { userLogin } from '@/api/authApi';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const queryClient = new QueryClient();

function LoginForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: (data: any) => userLogin(data),
    onSuccess: (res) => {
      const token = res?.data?.token || res?.data?.token;
      if (token) {
        login(token);
        message.success('Login Successfully');
      } else {
        message.error('No token returned from server');
      }
    },
    onError: (error: any) => {
      message.error(error?.response?.data);
      setLoading(false);
    },
  });

  const handleLogin = (values: LoginFormValues): void => {
    setLoading(true);
    mutateLogin(values);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Row style={{ height: '100vh', margin: 0, padding: 0 }} className="w-full m-0 p-0">
        {/* Left Side - Title and Form */}
        <Col xs={24} md={10} className="flex flex-col justify-center items-center">
          {/* Title Section */}
          <div className="w-full ml-[190px]" style={{ marginTop: '-100px', marginBottom: '40px' }}>
            <Title level={4} className="text-secondary-dark font-bold mb-1">
              A&A Harbor
            </Title>
            <Text className="text-black text-[11px] font-semibold block">
              Transforms identity into a living platform
            </Text>
            <Text className="text-black text-[11px] font-semibold block mt-[-4px]">
              It makes your story, commerce, and collaborations verifiable and valuable
            </Text>
          </div>

          {/* Login Card */}
          <Card className="w-full max-w-[350px]">
            <Title level={2} className="text-center mb-6 text-secondary-dark">
              Login
            </Title>
            <Form
              name="login"
              onFinish={handleLogin}
              layout="vertical"
              requiredMark={false}
              className="w-full"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
                style={{ marginBottom: '6px' }}
              >
                <Input
                  prefix={<UserOutlined className="text-secondary" />}
                  placeholder="Email"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-secondary" />}
                  placeholder="Password"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading || isPending}
                  className="h-12 rounded-lg bg-primary hover:bg-primary-dark text-white"
                >
                  Login
                </Button>
              </Form.Item>

              <div className="text-center text-secondary">
                <Text>Create a new account? </Text>
                <Link href="/auth/signup">
                  <Text className="text-primary hover:text-primary-dark cursor-pointer">
                    Sign up
                  </Text>
                </Link>
              </div>
            </Form>
          </Card>
        </Col>

        {/* Right Side - Full-Height, Full-Width Image */}
        <Col xs={0} md={14} className="p-0 m-0" style={{ padding: 0, margin: 0 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '112vh',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/IMProfile.jpg"
              alt="Background"
              fill
              style={{
                objectFit: 'cover',
              }}
              priority
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
}
