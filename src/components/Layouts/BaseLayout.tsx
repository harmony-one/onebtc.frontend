import React from 'react';
import { CommonLayout } from './CommonLayout';
import { SidebarMenu } from './SidebarMenu';

interface Props {}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return <CommonLayout leftMenu={<SidebarMenu />}>{children}</CommonLayout>;
};

BaseLayout.displayName = 'BaseLayout';
