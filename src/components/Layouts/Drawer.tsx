import React from 'react';
import { Header, Layer } from 'grommet';
import { Button } from 'grommet/components/Button';
import { Close } from 'grommet-icons';
import { SidebarMenu } from './SidebarMenu';
import { BridgeLogo } from '../BridgeLogo';

interface Props {
  onClose: () => void;
}

export const Drawer: React.FC<Props> = ({ onClose }) => {
  return (
    <Layer position="left" full="vertical">
      <Header pad="medium">
        <BridgeLogo />
        <Button onClick={onClose} icon={<Close />} />
      </Header>
      <SidebarMenu />
    </Layer>
  );
};

Drawer.displayName = 'Drawer';
