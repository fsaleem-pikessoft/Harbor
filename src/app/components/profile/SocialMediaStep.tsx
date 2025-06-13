import React from 'react';
import { Form, Input, Card, Row, Col } from 'antd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

const SocialMediaStep = () => {
  return (
    <div className="space-y-4">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card
            className="shadow-sm hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm"
            bodyStyle={{ padding: '24px' }}
          >
            <div className="space-y-4">
              <Form.Item
                name="facebook"
                label={<span className="text-gray-800 font-semibold text-sm">Facebook</span>}
                className="mb-0"
              >
                <Input
                  size="large"
                  placeholder="Enter your Facebook profile URL"
                  prefix={<FacebookOutlined className="text-blue-600" />}
                  className="rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                />
              </Form.Item>

              <Form.Item
                name="linkedin"
                label={<span className="text-gray-800 font-semibold text-sm">LinkedIn</span>}
                className="mb-0"
              >
                <Input
                  size="large"
                  placeholder="Enter your LinkedIn profile URL"
                  prefix={<LinkedinOutlined className="text-blue-700" />}
                  className="rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                />
              </Form.Item>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            className="shadow-sm hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm"
            bodyStyle={{ padding: '24px' }}
          >
            <div className="space-y-4">
              <Form.Item
                name="instagram"
                label={<span className="text-gray-800 font-semibold text-sm">Instagram</span>}
                className="mb-0"
              >
                <Input
                  size="large"
                  placeholder="Enter your Instagram profile URL"
                  prefix={<InstagramOutlined className="text-pink-600" />}
                  className="rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                />
              </Form.Item>

              <Form.Item
                name="youtube"
                label={<span className="text-gray-800 font-semibold text-sm">YouTube</span>}
                className="mb-0"
              >
                <Input
                  size="large"
                  placeholder="Enter your YouTube channel URL"
                  prefix={<YoutubeOutlined className="text-red-600" />}
                  className="rounded-xl hover:border-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                />
              </Form.Item>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SocialMediaStep;
