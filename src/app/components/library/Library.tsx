'use client';

import { Card, Row, Col, Typography, Tag, Avatar } from 'antd';
import { useState } from 'react';
import Image from 'next/image';
import {
  FolderOutlined,
  PictureOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  GlobalOutlined,
  FileImageOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

// Function to convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Function to generate lighter color
const getLighterColor = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  // Increase brightness by 40%
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * 0.4));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * 0.4));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * 0.4));

  return `rgb(${r}, ${g}, ${b})`;
};

interface Folder {
  id: number;
  name: string;
  cover: string;
  images: string[];
  icon: React.ReactNode;
  color: string;
}

const Library = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const folders: Folder[] = [
    {
      id: 1,
      name: 'Nature',
      cover: '/images/nature-cover.jpg',
      images: ['/images/Harbor.01.jpg', '/images/Harbor.01.jpg'],
      icon: <EnvironmentOutlined />,
      color: '#52c41a', // green
    },
    {
      id: 2,
      name: 'Architecture',
      cover: '',
      images: ['/images/cards.jpg', '/images/cards.jpg'],
      icon: <PictureOutlined />,
      color: '#1890ff', // blue
    },
    {
      id: 3,
      name: 'People',
      cover: '',
      images: ['/images/blackWalpaper.jpg', '/images/blackWalpaper.jpg'],
      icon: <TeamOutlined />,
      color: '#722ed1', // purple
    },
    {
      id: 4,
      name: 'Travel',
      cover: '',
      images: ['/images/Harbor.01.jpg', '/images/Harbor.01.jpg'],
      icon: <GlobalOutlined />,
      color: '#fa8c16', // orange
    },
  ];

  const selectedFolder = folders.find((f) => f.id === selected);

  return (
    <div className="p-4">
      <Row gutter={24}>
        {/* Folders as vertical list */}
        <Col span={12}>
          <Title level={4}>
            <Avatar
              icon={<FolderOutlined />}
              style={{
                backgroundColor: '#1890ff',
                marginRight: '12px',
              }}
            />
            Folders
          </Title>
          <Row gutter={[0, 2]}>
            {folders.map((folder) => (
              <Col span={24} key={folder.id}>
                <Card
                  hoverable
                  onClick={() => setSelected(folder.id)}
                  className={selected === folder.id ? 'ring-2 ring-primary' : ''}
                  style={{ marginBottom: 12 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div className="flex items-center">
                      <Avatar
                        icon={folder.icon}
                        style={{
                          backgroundColor: folder.color,
                          marginRight: '12px',
                        }}
                      />
                      <span>{folder.name}</span>
                    </div>
                    <Tag
                      style={{
                        borderRadius: '50%',
                        padding: '0 8px',
                        backgroundColor: getLighterColor(folder.color),
                        color: '#ffffff',
                        borderColor: folder.color,
                      }}
                    >
                      {folder.images.length}
                    </Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Images Column */}
        <Col span={12}>
          <Card>
            <Title level={4} className="mb-6">
              {selectedFolder ? (
                <>
                  <Avatar
                    icon={selectedFolder.icon}
                    style={{
                      backgroundColor: selectedFolder.color,
                      marginRight: '12px',
                    }}
                  />
                  {selectedFolder.name} Images
                </>
              ) : (
                <>
                  <Avatar
                    icon={<FileImageOutlined />}
                    style={{
                      backgroundColor: '#1890ff',
                      marginRight: '12px',
                    }}
                  />
                  Select a folder
                </>
              )}
            </Title>
            {selectedFolder ? (
              <Row gutter={[16, 16]}>
                {selectedFolder.images.map((img, idx) => (
                  <Col span={12} key={idx}>
                    <Card
                      cover={
                        <Image
                          src={img}
                          alt={`img-${idx}`}
                          width={300}
                          height={180}
                          style={{ objectFit: 'cover' }}
                        />
                      }
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Card className="h-64 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <Avatar
                    icon={<FileImageOutlined />}
                    size={64}
                    style={{
                      backgroundColor: '#1890ff',
                      marginBottom: '16px',
                    }}
                  />
                  <p className="text-gray-500">Select a folder to view images</p>
                </div>
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Library;
