import React from 'react';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { Box } from 'grommet';
import { Divider, Title } from '../../components/Base';
import { HelpItem } from './components/HelpItem';

interface Props {}

export const HelpPage: React.FC<Props> = () => {
  return (
    <BaseLayout>
      <Box gap="medium">
        <Box>
          <Title align="center">Help</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
        <Box gap="small">
          <ul>
            <li>
              <a href="https://docs.harmony.one/home/general/bitcoin-bridge">
                Documentation
              </a>
            </li>
            <li>
              <a href="https://docs.harmony.one/home/general/bitcoin-bridge/user-guide">
                User guide
              </a>
            </li>
          </ul>

          {/*<HelpItem label="Bridge docs">*/}
          {/*  <a href="https://docs.harmony.one/home/general/bitcoin-bridge">*/}
          {/*    Documentation*/}
          {/*  </a>*/}
          {/*</HelpItem>*/}
          {/*<HelpItem label="User guide">Content</HelpItem>*/}
        </Box>
      </Box>
    </BaseLayout>
  );
};

HelpPage.displayName = 'HelpPage';
