'use client';

import { Avatar, Button, Carousel, Card } from 'antd';
import { YoutubeOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const PublicProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-sans bg-white text-gray-800"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-start text-white px-6 md:px-12 py-12 relative"
        style={{
          backgroundImage: "url('/images/IMProfile.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl font-bold mb-1"
        >
          Rob Boyce
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-lg"
        >
          Creative Developer & Mentor
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full flex justify-center mt-8"
        >
          <div className="w-full max-w-4xl">
            <iframe
              className="w-full h-[220px] sm:h-[300px] md:h-[400px] rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </motion.section>

      {/* Slider Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-10 bg-gray-100"
      >
        <div className="max-w-6xl mx-auto px-4">
          <Carousel autoplay dots className="rounded-xl overflow-hidden">
            {['cards.jpg', 'blackWalpaper.jpg', 'Harbor.01.jpg'].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="h-[300px] sm:h-[400px] md:h-[500px]"
              >
                <img
                  src={`/images/${img}`}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </Carousel>
        </div>
      </motion.section>

      {/* Custom Card Layout */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-4 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="rounded-xl shadow-md overflow-hidden"
          >
            <Card
              bodyStyle={{ padding: 0, margin: 0 }}
              cover={
                <motion.div
                  className="relative h-[300px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/cards.jpg"
                    alt="Influencer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              }
              bordered={false}
              className="bg-transparent"
            />
          </motion.div>

          {/* Top Right Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="rounded-xl shadow-md overflow-hidden"
          >
            <Card
              bodyStyle={{ padding: 0, margin: 0 }}
              cover={
                <motion.div
                  className="relative h-[300px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/IMProfile.jpg"
                    alt="Foundation"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              }
              bordered={false}
              className="bg-transparent"
            />
          </motion.div>

          {/* Full-Width Bottom Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="md:col-span-2 rounded-xl shadow-md overflow-hidden"
          >
            <Card
              bodyStyle={{ padding: 0, margin: 0 }}
              cover={
                <motion.div
                  className="relative h-[400px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/Harbor.01.jpg"
                    alt="Portfolio"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              }
              bordered={false}
              className="bg-transparent"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Second Video Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-50 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <iframe
              className="w-full h-[220px] sm:h-[300px] md:h-[400px] rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/kJQP7kiw5Fk"
              title="YouTube video 2"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* Avatar & Social Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white flex flex-col items-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar size={128} src="https://i.pravatar.cc/300" className="shadow-lg" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-2xl font-semibold"
        >
          Rob Boyce
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-500"
        >
          Building digital experiences
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 mt-4"
        >
          <Button shape="circle" icon={<FacebookOutlined />} />
          <Button shape="circle" icon={<LinkedinOutlined />} />
          <Button shape="circle" icon={<YoutubeOutlined />} />
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default PublicProfilePage;
