'use client';
import { useMutation } from '@tanstack/react-query';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Tabs, Modal, Avatar, Radio, Upload, message } from 'antd';
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
  CheckCircleTwoTone,
  CheckCircleOutlined,
  StopOutlined,
  ArrowRightOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { toast } from 'react-toastify';
import { getUserQuestionById, submitAnswer } from '@/api/amaApi';
import { getProfile } from '@/api/profileApi';

interface Question {
  id: number;
  title: string;
  description: string;
  status?: string;
  answerText?: string;
  answerVideoUrl?: string;
  userId?: number;
  userQuestionId?: number;
  createdOn?: string;
}

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
  const [inputMode, setInputMode] = useState<'record' | 'upload' | 'text'>('record');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [videoList, setVideoList] = useState<UploadFile<any>[]>([]);
  const [userId, setUserId] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<{ [key: number]: boolean }>({});
  const [textAnswer, setTextAnswer] = useState('');

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

  const resetRecordingState = () => {
    setRecordedVideo(null);
    setRecordingTime(0);
    setIsPaused(false);
    setActiveTab('preview');
    chunksRef.current = [];
  };

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

  const { mutate: mutateGetProfile } = useMutation({
    mutationFn: () => getProfile(),
    onSuccess: (res) => {
      if (res && res.data) {
        setUserId(Number(res.data.userId) || 0);
      } else {
        toast.error('No data received from server.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const { mutate: mutateSubmitAnswer } = useMutation({
    mutationFn: (data: any) => submitAnswer(data),
    onSuccess: (res, variables) => {
      toast.success(res?.data?.message);
      mutateGetQuestions(userId);
      setCompletedQuestions((prev) => {
        const updated = { ...prev };
        updated[variables.QuestionId] = true;
        return updated;
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || 'An error occurred while submitting answer.');
    },
  });

  const { mutate: mutateGetQuestions } = useMutation({
    mutationFn: (id: any) => getUserQuestionById(id),
    onSuccess: (res) => {
      if (res && res.data) {
        if (Array.isArray(res.data) && res.data.length === 0) {
          toast.info('No questions found.');
          setQuestions([]);
          return;
        }
        setQuestions(
          res.data.map((item: any) => ({
            id: item.questionId,
            title: item.question?.title || '',
            description: item.question?.description || '',
            status: item.status,
            answerText: item.answerText,
            answerVideoUrl: item.answerVideoUrl,
            userId: item.userId,
            userQuestionId: item.id,
            createdOn: item.createdOn,
          }))
        );

        const completed = res.data.reduce((acc: any, item: any) => {
          if (item.status === 'Submitted') {
            acc[item.questionId] = true;
          }
          return acc;
        }, {});
        setCompletedQuestions(completed);
      } else {
        toast.error('No data received from server.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || 'An error occurred while fetching questions.');
    },
  });

  useEffect(() => {
    mutateGetProfile();
    if (userId) {
      mutateGetQuestions(userId);
    }
  }, [userId]);

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

  const handleSubmitQuestion = async () => {
    const selectedQuestion = questions.find((q) => q.id === currentQuestion);
    if (!selectedQuestion || !userId) return;

    if (inputMode === 'text' && textAnswer.trim()) {
      const formData = new FormData();
      formData.append('UserId', String(userId));
      formData.append('QuestionId', String(selectedQuestion.id));
      formData.append('Text', textAnswer);

      console.log('Sending FormData for text answer');
      mutateSubmitAnswer(formData);
      setTextAnswer('');
    } else if (inputMode === 'record' && recordedVideo) {
      // Send as FormData for video
      const formData = new FormData();
      formData.append('UserId', String(userId));
      formData.append('QuestionId', String(selectedQuestion.id));

      const blob = await fetch(recordedVideo).then((res) => res.blob());
      const file = new File([blob], 'recorded-video.webm', { type: 'video/webm' });
      formData.append('Video', file);

      console.log('Sending FormData for video');
      mutateSubmitAnswer(formData);

      // Reset after submit
      setRecordedVideo(null);
    } else if (inputMode === 'upload' && videoList.length > 0 && videoList[0].originFileObj) {
      // Send as FormData for uploaded video
      const formData = new FormData();
      formData.append('UserId', String(userId));
      formData.append('QuestionId', String(selectedQuestion.id));
      formData.append('Video', videoList[0].originFileObj);

      console.log('Sending FormData for uploaded video');
      mutateSubmitAnswer(formData);

      // Reset after submit
      setVideoList([]);
    } else {
      alert('Please enter a text or upload a video.');
      return;
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
      <Row gutter={[16, 16]} style={{ minHeight: 500 }}>
        <Col xs={24} lg={16} className="h-full">
          <Card
            title={
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
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
                <div>
                  <Radio
                    checked={inputMode === 'record'}
                    onChange={() => setInputMode('record')}
                    style={{ marginRight: 16 }}
                  >
                    Record
                  </Radio>
                  <Radio
                    checked={inputMode === 'upload'}
                    onChange={() => setInputMode('upload')}
                    style={{ marginRight: 16 }}
                  >
                    Upload
                  </Radio>
                  <Radio checked={inputMode === 'text'} onChange={() => setInputMode('text')}>
                    Text
                  </Radio>
                </div>
              </div>
            }
            className="h-full"
            bodyStyle={{
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
            }}
          >
            <div className="flex-1 flex flex-col justify-between h-full">
              {inputMode === 'record' && (
                <>
                  <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={items}
                    className="mb-2"
                  />
                  <div className="pt-6 pb-2 border-t flex justify-center gap-2">
                    {!isRecording && !recordedVideo && inputMode === 'record' && (
                      <Button
                        type="primary"
                        onClick={startRecording}
                        size="large"
                        style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                        disabled={hasPermission === false}
                        icon={<VideoCameraOutlined />}
                      >
                        Record
                      </Button>
                    )}
                    {isRecording && inputMode === 'record' && (
                      <>
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
                          icon={<StopOutlined />}
                          style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                        >
                          Stop
                        </Button>
                      </>
                    )}
                    <Button
                      type="primary"
                      onClick={handleSubmitQuestion}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                      disabled={
                        questions.find((q) => q.id === currentQuestion)?.status === 'Submitted'
                      }
                      icon={<CheckCircleOutlined />}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentQuestion < questions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        }
                      }}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                      disabled={currentQuestion === questions.length - 1}
                      icon={<ArrowRightOutlined />}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {inputMode === 'upload' && (
                <>
                  <Row justify="center" className="w-full">
                    <Col xs={24} sm={20} md={16} lg={20} className="flex flex-col items-center">
                      <Upload.Dragger
                        name="video"
                        fileList={videoList}
                        beforeUpload={(file) => {
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
                        }}
                        onChange={({ fileList }) => setVideoList(fileList.slice(-1))}
                        maxCount={1}
                        accept="video/*"
                        multiple={false}
                        showUploadList={true}
                        style={{
                          background: '#f5f9ff',
                          border: '2px dashed #a0c4f7',
                          borderRadius: '24px',
                          minHeight: 320,
                          minWidth: 320,
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
                          <span className="text-lg font-semibold text-gray-700 mb-1">
                            Drop files here to upload
                          </span>
                          <span className="text-sm text-gray-500">
                            or click to select a video (max 100MB)
                          </span>
                        </div>
                      </Upload.Dragger>
                      {videoList.length > 0 && videoList[0].originFileObj && (
                        <video
                          src={URL.createObjectURL(videoList[0].originFileObj)}
                          controls
                          className="mt-4 rounded shadow max-w-full"
                          style={{ maxHeight: 240 }}
                        />
                      )}
                    </Col>
                  </Row>
                  <div className="pt-6 pb-2 border-t flex justify-center gap-2">
                    <Button
                      type="primary"
                      onClick={handleSubmitQuestion}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                      disabled={
                        questions.find((q) => q.id === currentQuestion)?.status === 'Submitted'
                      }
                      icon={<CheckCircleOutlined />}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentQuestion < questions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        }
                      }}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                      disabled={currentQuestion === questions.length - 1}
                      icon={<ArrowRightOutlined />}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {inputMode === 'text' && (
                <>
                  <div className="flex flex-col h-full justify-center items-center">
                    <textarea
                      className="w-full h-72 p-2 border rounded"
                      placeholder="Type your question here..."
                      value={textAnswer}
                      onChange={(e) => setTextAnswer(e.target.value)}
                    />
                  </div>
                  <div className="pt-6 pb-2 border-t flex justify-center gap-2">
                    <Button
                      type="primary"
                      onClick={handleSubmitQuestion}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                      disabled={
                        questions.find((q) => q.id === currentQuestion)?.status === 'Submitted'
                      }
                      icon={<CheckCircleOutlined />}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentQuestion < questions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        }
                      }}
                      style={{ borderRadius: '5px', fontSize: '10px', height: '30px' }}
                      disabled={currentQuestion === questions.length - 1}
                      icon={<ArrowRightOutlined />}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8} className="h-full">
          <Card
            title="Questions"
            className="h-full"
            bodyStyle={{
              height: '530px',
              overflow: 'hidden',
            }}
          >
            <div
              className="scrollbar-hide"
              style={{
                height: '100%',
                overflowY: 'auto',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {questions.map((q) => (
                <Card
                  key={q.id}
                  className={`mb-2 m-1 cursor-pointer transition-all ${
                    completedQuestions[q.id] ? 'border-green-500 border-2' : ''
                  } ${currentQuestion === q.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                  bodyStyle={{ padding: '10px', position: 'relative' }}
                  size="small"
                  hoverable
                  onClick={() => setCurrentQuestion(q.id)}
                >
                  <div style={{ position: 'relative', width: '100%' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{q.title}</span>
                      <span style={{ color: '#555', fontSize: 13 }}>{q.description}</span>
                    </div>
                    {completedQuestions[q.id] && (
                      <CheckCircleTwoTone
                        twoToneColor="#52c41a"
                        style={{ position: 'absolute', top: 8, right: 8, fontSize: 22 }}
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>
        {/* Tips Card - Only show during recording */}
        {isRecording && inputMode === 'record' && (
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
