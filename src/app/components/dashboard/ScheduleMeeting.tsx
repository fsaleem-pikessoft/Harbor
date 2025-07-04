import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Row, Col } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ScheduleMeetingProps {
  activityId?: number;
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = () => {
  const [reviewing, setReviewing] = useState(false);

  const handleScheduleClick = () => {
    window.open('https://calendly.com/bywayapps/hustle-session', '_blank');
    setReviewing(true);
  };

  return (
    <Card
      title={
        <span className="flex items-center">
          <Avatar
            icon={<CalendarOutlined />}
            style={{
              backgroundColor: '#52c41a',
              marginRight: '12px',
            }}
          />
          {reviewing ? 'Your profile in reviewing' : 'Schedule a meeting'}
        </span>
      }
      className="flex flex-col bg-[#FFF7E6] dark:bg-[#2D1B06] shadow-lg border-0 transition-colors duration-300"
      style={{ height: '100%' }}
    >
      <Row gutter={16} className="flex-grow">
        <Col span={24}>
          {reviewing ? (
            <>
              <Text className="text-sm">
                Your profile is currently under review by our team. We appreciate your patience as
                we ensure everything is in order. You will be notified once the review is complete.
              </Text>
              <div className="mt-4">
                <Text className="text-sm block">
                  <b>What happens next?</b> Our experts will carefully review your submitted
                  information and reach out if any further details are needed. This process helps us
                  provide you with the best possible support and guidance.
                </Text>
                <Text className="text-sm block mt-2">
                  <b>Thank you for your cooperation!</b> We are committed to helping you succeed and
                  will keep you updated on your profile status.
                </Text>
                <Text className="text-sm block mt-2">
                  <b>How long does it take?</b> Most reviews are completed within 1-2 business days.
                  If additional information is required, we will contact you promptly to avoid any
                  delays.
                </Text>
              </div>
            </>
          ) : (
            <>
              <Text className="text-sm">
                Schedule a personalized session with our expert to get the guidance, support, or
                feedback you need—whether it&apos;s for strategy, setup, or brainstorming. Choose a
                time that works best for you and let&apos;s move your goals forward.
              </Text>
              <div className="mt-4">
                <Text className="text-sm block">
                  <b>Why book a session?</b> Our experts are here to help you overcome challenges,
                  set clear goals, and accelerate your progress. Whether you need advice on your
                  next steps, want to brainstorm new ideas, or simply need support, this session is
                  tailored for you.
                </Text>
                <Text className="text-sm block mt-2">
                  <b>What to expect:</b> A friendly, one-on-one conversation focused on your needs.
                  We&apos;ll listen, provide actionable insights, and help you create a plan to
                  achieve your objectives.
                </Text>
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row justify="end" className="mt-auto" gutter={16}>
        <Col>
          {/* <Button
            type="primary"
            size="large"
            style={{ borderRadius: '5px', fontSize: '13px', height: '30px' }}
            className="bg-button hover:bg-button/80 text-xs rounded-none px-6 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
            icon={<CalendarOutlined />}
          >
            View Calendar
          </Button> */}
        </Col>
        <Col>
          {!reviewing && (
            <Button
              size="large"
              style={{
                borderRadius: '5px',
                fontSize: '13px',
                height: '30px',
                backgroundColor: 'rgb(19 194 150)',
              }}
              className="custom-green-btn text-xs rounded-none px-6 flex items-center text-white "
              icon={<CalendarOutlined />}
              onClick={handleScheduleClick}
            >
              Schedule
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default ScheduleMeeting;
