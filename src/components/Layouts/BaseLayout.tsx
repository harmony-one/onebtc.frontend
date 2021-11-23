import { Box } from 'grommet';
import React from 'react';
import { Head } from '../Head/Head';
import { Sidebar } from './Sidebar';

interface Props {}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      fill
      background={{
        image: "url('/harmony_logo_background.svg')",
        position: '0 100%',
        repeat: 'no-repeat',
        size: 'initial',
        color: '#F2F3F8',
      }}
    >
      <Box direction="row" fill>
        <Box className="LeftSide">
          <Sidebar />
        </Box>
        <Box direction="column" className="RightSide" flex="grow">
          <Head />
          <Box pad="medium">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

BaseLayout.displayName = 'BaseLayout';
