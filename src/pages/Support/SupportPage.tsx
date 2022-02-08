import React from 'react';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { Box } from 'grommet';
import { Divider, Title } from '../../components/Base';

interface Props {}

export const SupportPage: React.FC<Props> = () => {
  return (
    <BaseLayout>
      <Box gap="medium">
        <Box>
          <Title align="center">Support</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
        <Box>
          <iframe
            title="support form"
            sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
            width="100%"
            height="860px"
            style={{ border: 0, overflow: 'hidden', overflowX: 'auto' }}
            src="https://forms.helpdesk.com/?licenseID=1447433401&contactFormID=b801eb35-4b6e-4f88-a861-da0ebe60ea91"
          >
            Your browser does not allow embedded content.{' '}
          </iframe>
        </Box>
      </Box>
    </BaseLayout>
  );
};

SupportPage.displayName = 'SupportPage';
