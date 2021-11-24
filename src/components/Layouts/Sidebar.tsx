import React from 'react';
import { Nav, Sidebar as GSidebar } from 'grommet';
import { SidebarMenu } from './SidebarMenu';
import { BridgeLogo } from '../BridgeLogo';

interface Props {}

export const Sidebar: React.FC<Props> = React.memo(() => {
  return (
    <GSidebar header={<BridgeLogo />}>
      <Nav align="start">
        <SidebarMenu />
      </Nav>
    </GSidebar>
  );
});

Sidebar.displayName = 'Sidebar';
