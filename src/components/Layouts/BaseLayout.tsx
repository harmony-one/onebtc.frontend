import { Box, Header, ResponsiveContext } from 'grommet';
import React, { useContext, useState } from 'react';
import * as s from './BaseLayout.styl';
import { Head } from '../Head/Head';
import { Sidebar } from './Sidebar';
import { Menu } from 'grommet-icons';
import { Button } from 'grommet/components/Button';
import { Drawer } from './Drawer';
import { BridgeLogo } from '../BridgeLogo';

interface Props {}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  const size = useContext(ResponsiveContext);
  const [isOpen, setOpen] = useState(false);

  const isMobileSize = size === 'small';

  return (
    <Box fill>
      <div className={s.bgImage} />
      {isOpen && <Drawer onClose={() => setOpen(false)} />}
      <Box direction="row" fill>
        {!isMobileSize && (
          <Box className={s.sidebarContainer}>
            <Sidebar />
          </Box>
        )}
        <Box direction="column" className={s.rightContent}>
          {!isMobileSize && <Head />}
          {isMobileSize && (
            <Header pad="medium">
              <BridgeLogo />
              <Button onClick={() => setOpen(true)} icon={<Menu />} />
            </Header>
          )}
          <Box pad="medium">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

BaseLayout.displayName = 'BaseLayout';
