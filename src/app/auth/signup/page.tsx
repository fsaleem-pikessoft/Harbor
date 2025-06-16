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

const queryClient = new QueryClient();

function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: mutateSignup, isPending } = useMutation({
    mutationFn: (data: any) => signUp(data),
    onSuccess: () => {
      message.success('Account Created Successfully');
      router.push('/auth/login');
    },
    onError: (error: any) => {
      message.error(error?.response?.data);
      setLoading(false);
    },
  });

  const handleSignup = (values: SignupFormValues) => {
    setLoading(true);
    mutateSignup(values);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Row style={{ height: '100vh', margin: 0, padding: 0 }} className="w-full m-0 p-0">
        {/* Left Side - Title and Form */}
        <Col xs={24} md={10} className="flex flex-col justify-center items-center ">
          {/* Title Section */}
          <div className="w-full ml-[190px]" style={{ marginTop: '-100px', marginBottom: '40px' }}>
            <Title level={4} className="text-secondary-dark font-bold mb-1">
              I M APP
            </Title>
            <Text className="text-black text-[11px] font-semibold block">
              Transforms identity into a living platform
            </Text>
            <Text className="text-black text-[11px] font-semibold block mt-[-4px]">
              It makes your story, commerce, and collaborations verifiable and valuable
            </Text>
          </div>

          {/* Signup Card */}
          <Card className="w-full max-w-[350px]">
            <Title level={2} className="text-center mb-6 text-secondary-dark">
              Sign Up
            </Title>
            <Form name="signup" onFinish={handleSignup} layout="vertical" requiredMark={false}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your name!' }]}
                style={{ marginBottom: '6px' }}
              >
                <Input
                  prefix={<UserOutlined className="text-secondary" />}
                  placeholder="First Name"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please input your name!' }]}
                style={{ marginBottom: '6px' }}
              >
                <Input
                  prefix={<UserOutlined className="text-secondary" />}
                  placeholder="Last Name"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
                style={{ marginBottom: '6px' }}
              >
                <Input
                  prefix={<MailOutlined className="text-secondary" />}
                  placeholder="Email"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' },
                ]}
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
                  className="rounded-lg bg-primary hover:bg-primary-dark text-white"
                  style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                >
                  Sign Up
                </Button>
              </Form.Item>

              <div className="text-center text-secondary">
                <Text>Already have an account? </Text>
                <Link href="/auth/login">
                  <Text className="text-primary hover:text-primary-dark cursor-pointer">Login</Text>
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

export default function SignupPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignupForm />
    </QueryClientProvider>
  );
}
