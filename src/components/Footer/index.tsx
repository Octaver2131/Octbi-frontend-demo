import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '欧可可出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Yupi',
          title: 'Yupi',
          href: 'https://code.yupi.icu/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Octaver2131',
          blankTarget: true,
        },
        {
          key: 'Octaver',
          title: 'Octaver',
          href: 'https://github.com/Octaver2131',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
