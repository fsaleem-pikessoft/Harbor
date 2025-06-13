'use client';

import { Card, Row, Col, Typography, Tag } from 'antd';
import { useState } from 'react';
import Image from 'next/image';

const { Title } = Typography;

interface Folder {
  id: number;
  name: string;
  cover: string;
  images: string[];
}

const Library = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const folders: Folder[] = [
    {
      id: 1,
      name: 'Nature',
      cover: '/images/nature-cover.jpg',
      images: ['/images/Harbor.01.jpg', '/images/Harbor.01.jpg'],
    },
    {
      id: 2,
      name: 'Architecture',
      cover: '',
      images: ['/images/cards.jpg', '/images/cards.jpg'],
    },
    {
      id: 3,
      name: 'People',
      cover: '',
      images: ['/images/blackWalpaper.jpg', '/images/blackWalpaper.jpg'],
    },
    {
      id: 4,
      name: 'Travel',
      cover: '',
      images: ['/images/Harbor.01.jpg', '/images/Harbor.01.jpg'],
    },
  ];

  const selectedFolder = folders.find((f) => f.id === selected);

  return (
    <div className="p-8">
      <Row gutter={24}>
        {/* Folders as vertical list */}
        <Col span={12}>
          <Title level={4}>Folders</Title>
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
                    <span>{folder.name}</span>
                    <Tag color="blue" style={{ borderRadius: '50%', padding: '0 8px' }}>
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
              {selectedFolder ? `${selectedFolder.name} Images` : 'Select a folder'}
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
                <p className="text-gray-500">Select a folder to view images</p>
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Library;
