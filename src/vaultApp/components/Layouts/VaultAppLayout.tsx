import React from 'react';
import { CommonLayout } from '../../../components/Layouts/CommonLayout';
import { SidebarMenu } from './SidebarMenu';
import { useStores } from '../../../stores';

interface Props {}

export const VaultAppLayout: React.FC<Props> = ({ children }) => {
  const { vaultAppStore } = useStores().vaultApp;

  const enableMenu =
    vaultAppStore.vaultInfo && vaultAppStore.vaultInfo.registered;

  const leftMenu = enableMenu ? <SidebarMenu /> : null;

  return <CommonLayout leftMenu={leftMenu}>{children}</CommonLayout>;
};

VaultAppLayout.displayName = 'VaultAppLayout';
