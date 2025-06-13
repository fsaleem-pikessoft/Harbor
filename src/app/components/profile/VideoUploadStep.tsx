'use client';
import React from 'react';
import { Form, Upload, message, Button, Typography, Space, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Text } = Typography;

interface VideoUploadStepProps {
  videoList: any[];
  setVideoList: (list: any[]) => void;
}

const VideoUploadStep: React.FC<VideoUploadStepProps> = ({ videoList, setVideoList }) => {
  const uploadProps: UploadProps = {
    name: 'video',
    fileList: videoList,
    beforeUpload: (file) => {
      const isVideo = file.type.startsWith('video/');
      if (!isVideo) {
        message.error('Only video files are allowed.');
        return false;
      }
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isLt100M) {
        message.error('Video must be smaller than 100MB.');
        return false;
      }
      return false;
    },
    onChange: ({ fileList }) => setVideoList(fileList.slice(-1)),
    maxCount: 1,
    accept: 'video/*',
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <div className="p-6 bg-white rounded-md shadow-sm mt-10">
          <Space direction="vertical" size="middle" className="w-full">
            <Text strong className="block text-center">
              Upload a video (max 100MB)
            </Text>
            <Form.Item name="video" className="mb-0 flex justify-center">
              <Upload {...uploadProps} listType="text">
                {videoList.length < 1 && (
                  <Button
                    icon={<UploadOutlined />}
                    type="primary"
                    size="large"
                    className="rounded-lg w-48 h-12 text-base font-medium bg-blue-500 border-none hover:!bg-gradient-to-r hover:!from-blue-500 hover:!to-indigo-600"
                  >
                    Upload Video
                  </Button>
                )}
              </Upload>
            </Form.Item>
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default VideoUploadStep;
