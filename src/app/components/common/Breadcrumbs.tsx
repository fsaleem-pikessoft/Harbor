'use client';

import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const paths = pathname.split('/').filter(Boolean);
    const items = [
      {
        title: <HomeOutlined />,
      },
    ];

    paths.forEach((path) => {
      items.push({
        title: <>{path.charAt(0).toUpperCase() + path.slice(1)}</>,
      });
    });

    return items;
  };

  return <Breadcrumb items={getBreadcrumbItems()} style={{ marginBottom: 16 }} />;
};

export default Breadcrumbs;
