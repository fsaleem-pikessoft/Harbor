'use client';

import { useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { signUp } from '@/api/authApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
    onSuccess: (res) => {
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] shadow-lg bg-background-light">
        <Title level={2} className="text-center mb-8 text-secondary-dark">
          Sign Up
        </Title>
        <Form name="signup" onFinish={handleSignup} layout="vertical" requiredMark={false}>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input your name!' }]}
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
              className="h-12 rounded-lg bg-primary hover:bg-primary-dark text-white"
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
