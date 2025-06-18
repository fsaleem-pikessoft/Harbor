import React from 'react';
import { Form, Input, Row, Col } from 'antd';
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
          <div className="space-y-4">
            <Form.Item name="facebook" label="Facebook" style={{ marginBottom: '10px' }}>
              <Input
                suffix={
                  <FacebookOutlined className="text-secondary" style={{ fontWeight: '100' }} />
                }
                placeholder="Enter your Facebook profile URL"
                size="large"
                className="rounded-lg pt-2 pb-2"
              />
            </Form.Item>

            <Form.Item name="linkedin" label="LinkedIn" style={{ marginBottom: '10px' }}>
              <Input
                suffix={
                  <LinkedinOutlined className="text-secondary" style={{ fontWeight: '100' }} />
                }
                placeholder="Enter your LinkedIn profile URL"
                size="large"
                className="rounded-lg pt-2 pb-2"
              />
            </Form.Item>
          </div>
        </Col>

        <Col span={12}>
          <div className="space-y-4">
            <Form.Item name="instagram" label="Instagram" style={{ marginBottom: '10px' }}>
              <Input
                suffix={
                  <InstagramOutlined className="text-secondary" style={{ fontWeight: '100' }} />
                }
                placeholder="Enter your Instagram profile URL"
                size="large"
                className="rounded-lg pt-2 pb-2"
              />
            </Form.Item>

            <Form.Item name="youtube" label="YouTube" style={{ marginBottom: '10px' }}>
              <Input
                suffix={
                  <YoutubeOutlined className="text-secondary" style={{ fontWeight: '100' }} />
                }
                placeholder="Enter your YouTube channel URL"
                size="large"
                className="rounded-lg pt-2 pb-2"
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SocialMediaStep;
