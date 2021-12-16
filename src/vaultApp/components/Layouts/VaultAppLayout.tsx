import React from 'react';
import { CommonLayout } from '../../../components/Layouts/CommonLayout';
import { SidebarMenu } from './SidebarMenu';

interface Props {}

export const VaultAppLayout: React.FC<Props> = ({ children }) => {
  return <CommonLayout leftMenu={<SidebarMenu />}>{children}</CommonLayout>;
};

VaultAppLayout.displayName = 'VaultAppLayout';
