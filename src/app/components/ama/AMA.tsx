'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Tabs, Modal, Avatar } from 'antd';
import {
  VideoCameraOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  PauseCircleOutlined,
  PlayCircleFilled,
  BulbOutlined,
  SoundOutlined,
  CameraOutlined,
  ClockCircleOutlined,
  FileImageOutlined,
} from '@ant-design/icons';

const AMA = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeTab, setActiveTab] = useState('preview');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isPermissionModalVisible, setIsPermissionModalVisible] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const showPermissionModal = () => {
    setIsPermissionModalVisible(true);
  };

  const handlePermissionModalOk = () => {
    setIsPermissionModalVisible(false);
    startVideoPreview();
  };

  const handlePermissionModalCancel = () => {
    setIsPermissionModalVisible(false);
  };

  // Function to reset recording state
  const resetRecordingState = () => {
    setRecordedVideo(null);
    setRecordingTime(0);
    setIsPaused(false);
    setActiveTab('preview');
    chunksRef.current = [];
  };

  // Function to start the video preview
  const startVideoPreview = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setHasPermission(false);
      showPermissionModal();
    }
  }, []);

  // Start video preview when component mounts
  useEffect(() => {
    startVideoPreview();

    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startVideoPreview]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      try {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      } catch (error) {
        console.error('Error pausing recording:', error);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      try {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } catch (error) {
        console.error('Error resuming recording:', error);
      }
    }
  };

  const startRecording = async () => {
    try {
      // Reset previous recording state
      resetRecordingState();

      if (!streamRef.current) {
        await startVideoPreview();
      }

      if (!hasPermission) {
        showPermissionModal();
        return;
      }

      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(streamRef.current!, {
        mimeType: 'video/webm;codecs=vp9,opus',
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        setRecordedVideo(videoURL);
        setActiveTab('recorded');
        setIsPaused(false);
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Error starting recording:', error);
      showPermissionModal();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setIsPaused(false);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };

  const items = [
    {
      key: 'preview',
      label: (
        <span>
          <VideoCameraOutlined />
          Preview
        </span>
      ),
      children: (
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
          {hasPermission === false ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Avatar
                  icon={<SettingOutlined />}
                  size={64}
                  style={{
                    backgroundColor: '#1890ff',
                    marginBottom: '16px',
                  }}
                />
                <p className="text-red-500 mb-2">Camera access is required</p>
                <Button
                  type="primary"
                  onClick={showPermissionModal}
                  icon={<SettingOutlined />}
                  style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                >
                  Enable Camera
                </Button>
              </div>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          )}
          {isRecording && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-mono">{formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'recorded',
      label: (
        <span>
          <PlayCircleOutlined />
          Recorded Video
        </span>
      ),
      children: recordedVideo ? (
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <video src={recordedVideo} controls className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Avatar
              icon={<FileImageOutlined />}
              size={64}
              style={{
                backgroundColor: '#1890ff',
                marginBottom: '16px',
              }}
            />
            <p className="text-gray-500">No recorded video available</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex items-center">
                <Avatar
                  icon={isRecording ? <VideoCameraOutlined /> : <CameraOutlined />}
                  style={{
                    backgroundColor: isRecording ? '#ff4d4f' : '#1890ff',
                    marginRight: '12px',
                  }}
                />
                {!isRecording && !recordedVideo
                  ? 'Record Your Question'
                  : isRecording
                  ? isPaused
                    ? 'Recording Paused'
                    : 'Recording in Progress'
                  : 'Your Recorded Question'}
              </div>
            }
            className="h-full"
          >
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} className="mb-2" />
            <div className="flex justify-end gap-4">
              {!isRecording && !recordedVideo ? (
                <Button
                  type="primary"
                  onClick={startRecording}
                  size="large"
                  style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                  disabled={hasPermission === false}
                  icon={<VideoCameraOutlined />}
                >
                  Start Recording
                </Button>
              ) : isRecording ? (
                <div className="flex gap-4">
                  {isPaused ? (
                    <Button
                      type="primary"
                      onClick={resumeRecording}
                      size="large"
                      icon={<PlayCircleFilled />}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                    >
                      Resume
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={pauseRecording}
                      size="large"
                      icon={<PauseCircleOutlined />}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                    >
                      Pause
                    </Button>
                  )}
                  <Button
                    danger
                    onClick={stopRecording}
                    size="large"
                    style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                  >
                    Stop Recording
                  </Button>
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={startRecording}
                  size="large"
                  style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                  disabled={hasPermission === false}
                  icon={<VideoCameraOutlined />}
                >
                  Record Again
                </Button>
              )}
            </div>
          </Card>
        </Col>

        {/* Tips Card - Only show during recording */}
        {isRecording && (
          <Col xs={24} lg={8}>
            <Card
              title={
                <div className="flex items-center">
                  <Avatar
                    icon={<BulbOutlined />}
                    style={{
                      backgroundColor: '#faad14',
                      marginRight: '12px',
                    }}
                  />
                  Recording Tips
                </div>
              }
              className="h-full"
            >
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li className="flex items-center">
                  <Avatar
                    icon={<CameraOutlined />}
                    size="small"
                    style={{
                      backgroundColor: '#1890ff',
                      marginRight: '8px',
                    }}
                  />
                  Make sure you&apos;re in a well-lit area
                </li>
                <li className="flex items-center">
                  <Avatar
                    icon={<SoundOutlined />}
                    size="small"
                    style={{
                      backgroundColor: '#52c41a',
                      marginRight: '8px',
                    }}
                  />
                  Speak clearly and at a good pace
                </li>
                <li className="flex items-center">
                  <Avatar
                    icon={<ClockCircleOutlined />}
                    size="small"
                    style={{
                      backgroundColor: '#722ed1',
                      marginRight: '8px',
                    }}
                  />
                  Keep your question concise and focused
                </li>
                <li className="flex items-center">
                  <Avatar
                    icon={<SettingOutlined />}
                    size="small"
                    style={{
                      backgroundColor: '#fa8c16',
                      marginRight: '8px',
                    }}
                  />
                  Test your microphone before starting
                </li>
              </ul>
            </Card>
          </Col>
        )}
      </Row>

      <Modal
        title={
          <div className="flex items-center">
            <Avatar
              icon={<SettingOutlined />}
              style={{
                backgroundColor: '#1890ff',
                marginRight: '12px',
              }}
            />
            Enable Camera and Microphone
          </div>
        }
        open={isPermissionModalVisible}
        onOk={handlePermissionModalOk}
        onCancel={handlePermissionModalCancel}
        okText="Try Again"
        cancelText="Close"
        width={600}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            To record your question, we need access to your camera and microphone. Here how to
            enable them:
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Note: If you do not see the permission prompt, you may need to check your system
            settings to ensure your browser has permission to access your camera and microphone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AMA;
