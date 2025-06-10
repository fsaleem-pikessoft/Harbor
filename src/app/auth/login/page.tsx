'use client';

import { useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, Space, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { userLogin } from '@/api/authApi';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const queryClient = new QueryClient();

function LoginForm() {
  const router = useRouter();
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] shadow-lg bg-background-light">
        <Title level={2} className="text-center mb-8 text-secondary-dark">
          Login
        </Title>
        <Form name="login" onFinish={handleLogin} layout="vertical" requiredMark={false}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
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
            <Link href="/auth/signup">
              <Text className="text-primary hover:text-primary-dark cursor-pointer">Sign up</Text>
            </Link>
          </div>
        </Form>
      </Card>
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
