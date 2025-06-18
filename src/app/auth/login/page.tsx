'use client';

import { useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Form, Input, Button, Card, Typography, Row, Col, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { userLogin } from '@/api/authApi';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginResponse {
  data: {
    token: string;
  };
}

interface ApiError {
  response?: {
    data: string;
  };
}

const queryClient = new QueryClient();

function LoginForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: (data: LoginFormValues) => userLogin(data),
    onSuccess: (res: LoginResponse) => {
      const token = res?.data?.token || res?.data?.token;
      if (token) {
        login(token);
        toast.success('Login Successfully');
      } else {
        toast.error('No token returned from server');
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data);
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
        <Col xs={24} md={11} className="flex flex-col justify-center items-center">
          {/* Title Section */}
          <div className="w-full pl-[50px]" style={{ marginTop: '-100px', marginBottom: '40px' }}>
            <Title
              level={4}
              className="text-secondary-dark  mb-1"
              style={{ fontSize: '20px', fontWeight: '500' }}
            >
              I M APP
            </Title>
            <Text className="text-[rgb(75 85 99)] text-[11px] block">
              Transforms identity into a living platform
            </Text>
            <Text className="text-[rgb(75 85 99)] text-[11px]  block mt-[-4px]">
              It makes your story, commerce, and collaborations verifiable and valuable
            </Text>
          </div>

          {/* Login Card */}
          <Card className="w-full max-w-[500px]">
            <Title
              level={2}
              className="text-center mb-6 text-secondary-dark"
              style={{ fontSize: '20px', fontWeight: '500' }}
            >
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
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
                style={{ marginBottom: '10px' }}
              >
                <Input
                  suffix={<UserOutlined className="text-secondary" style={{ fontWeight: '100' }} />}
                  placeholder="Enter your email"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  suffix={<LockOutlined className="text-secondary" />}
                  placeholder="Enter your password"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-secondary text-sm" style={{ fontWeight: '500' }}>
                    Remember me
                  </Checkbox>
                </Form.Item>
                <Link href="">
                  <Text
                    className="text-primary hover:text-primary-dark cursor-pointer text-sm"
                    style={{ fontWeight: '500' }}
                  >
                    Forgot password?
                  </Text>
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading || isPending}
                  className="rounded-lg bg-primary hover:bg-primary-dark text-white"
                  style={{ borderRadius: '5px', fontSize: '13px', height: '50px' }}
                >
                  Sign In
                </Button>
              </Form.Item>

              <div className="text-center text-secondary">
                <Text
                  style={{ fontWeight: '300', fontSize: '12px' }}
                  className="text-[rgb(75 85 99)] text-[11px]"
                >
                  Do not have any account?{' '}
                </Text>
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
        <Col xs={0} md={13} className="p-0 m-0" style={{ padding: 0, margin: 0 }}>
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
