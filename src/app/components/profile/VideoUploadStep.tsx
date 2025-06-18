'use client';
import React from 'react';
import { Form, Upload, message, Typography, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';

const { Text } = Typography;
const { Dragger } = Upload;

interface VideoUploadStepProps {
  videoList: UploadFile[];
  setVideoList: (list: UploadFile[]) => void;
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
    multiple: false,
    showUploadList: true,
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <div className="text-center">
          <Form.Item name="video" className="mb-0 flex justify-center">
            <Dragger
              {...uploadProps}
              style={{
                background: '#f5f9ff',
                border: '2px dashed #a0c4f7',
                borderRadius: '24px',
                minHeight: 320,
                minWidth: 420,
                maxWidth: 520,
                margin: '0 auto',
                boxShadow: '0 4px 24px 0 rgba(80, 120, 200, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.3s',
              }}
            >
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-white rounded-full shadow p-5 flex items-center justify-center border border-blue-200">
                    <UploadOutlined style={{ fontSize: 38, color: '#2563eb' }} />
                  </div>
                </div>
                <Text className="text-lg font-semibold text-gray-700 mb-1">
                  Drop files here to upload
                </Text>
                <Text className="text-sm text-gray-500">
                  or click to select a video (max 100MB)
                </Text>
              </div>
            </Dragger>
          </Form.Item>
        </div>
      </Col>
    </Row>
  );
};

export default VideoUploadStep;
