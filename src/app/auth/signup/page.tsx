'use client';

import { useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Form, Input, Button, Card, Typography, message, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { signUp } from '@/api/authApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { Title, Text } = Typography;

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ApiError {
  response?: {
    data: string;
  };
}

const queryClient = new QueryClient();

function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: mutateSignup, isPending } = useMutation({
    mutationFn: (data: SignupFormValues) => signUp(data),
    onSuccess: () => {
      message.success('Account Created Successfully');
      router.push('/auth/login');
    },
    onError: (error: ApiError) => {
      message.error(error?.response?.data);
      setLoading(false);
    },
  });

  const handleSignup = (values: SignupFormValues) => {
    setLoading(true);
    mutateSignup(values);
  };

  return (
    <div className="w-full min-h-screen">
      <Row style={{ minHeight: '100vh', margin: 0, padding: 0 }} className="w-full m-0 p-0">
        {/* Left Side - Title and Form */}
        <Col xs={24} md={11} className="flex flex-col justify-center items-center py-8">
          {/* Title Section */}
          <div className="w-full pl-[50px] mb-8">
            <Title
              level={4}
              className="text-secondary-dark font-bold mb-1"
              style={{ fontSize: '20px', fontWeight: '500' }}
            >
              I M APP
            </Title>
            <Text className="text-[rgb(75 85 99)] text-[11px] block">
              Transforms identity into a living platform
            </Text>
            <Text className="text-[rgb(75 85 99)] text-[11px] block">
              It makes your story, commerce, and collaborations verifiable and valuable
            </Text>
          </div>

          {/* Signup Card */}
          <Card className="w-full max-w-[500px]">
            <Title
              level={2}
              className="text-center mb-6 text-secondary-dark"
              style={{ fontSize: '20px', fontWeight: '500' }}
            >
              Sign Up
            </Title>
            <Form name="signup" onFinish={handleSignup} layout="vertical" requiredMark={false}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
                style={{ marginBottom: '10px' }}
              >
                <Input
                  suffix={<UserOutlined className="text-secondary" style={{ fontWeight: '100' }} />}
                  placeholder="Enter your first name"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
                style={{ marginBottom: '10px' }}
              >
                <Input
                  suffix={<UserOutlined className="text-secondary" style={{ fontWeight: '100' }} />}
                  placeholder="Enter your last name"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>

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
                  suffix={<MailOutlined className="text-secondary" style={{ fontWeight: '100' }} />}
                  placeholder="Enter your email"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' },
                ]}
              >
                <Input.Password
                  suffix={<LockOutlined className="text-secondary" />}
                  placeholder="Enter your password"
                  size="large"
                  className="rounded-lg pt-2 pb-2"
                />
              </Form.Item>

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
                  Sign Up
                </Button>
              </Form.Item>

              <div className="text-center text-secondary">
                <Text
                  style={{ fontWeight: '300', fontSize: '12px' }}
                  className="text-[rgb(75 85 99)] text-[11px]"
                >
                  Already have an account?{' '}
                </Text>
                <Link href="/auth/login">
                  <Text className="text-primary hover:text-primary-dark cursor-pointer">Login</Text>
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
              height: '100%',
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

export default function SignupPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignupForm />
    </QueryClientProvider>
  );
}
