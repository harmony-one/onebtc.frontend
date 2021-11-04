import { Title } from '../Base';
import { Box, Button, Header, Image, Nav, Sidebar } from 'grommet';
import React from 'react';
import { Head } from '../Head/Head';
import { PowerCycle, BarChart, Iteration } from 'grommet-icons';

interface Props {}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  const SidebarHead = (
    <Box direction="row" gap="xsmall" align="center">
      <Image height="32" src="/one.svg" />
      <Title size="small" color="BlackTxt" bold>
        1BTC By Harmony
      </Title>
    </Box>
  );
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
          <Sidebar header={SidebarHead}>
            <Nav align="start">
              <Button plain label="Bridge" icon={<PowerCycle />} />
              <Button plain label="My transactions" icon={<Iteration />} />
              <Button plain label="Dashboard" icon={<BarChart />} />
            </Nav>
          </Sidebar>
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
