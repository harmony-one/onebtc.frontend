import React from 'react';
import { Nav, Sidebar as GrommetSidebar } from 'grommet';
import { BridgeLogo } from '../BridgeLogo';

interface Props {}

export const Sidebar: React.FC<Props> = React.memo(({ children }) => {
  return (
    <GrommetSidebar header={<BridgeLogo />}>
      <Nav align="start">{children}</Nav>
    </GrommetSidebar>
  );
});

Sidebar.displayName = 'Sidebar';
