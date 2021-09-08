import React from 'react';
import { Box } from 'grommet';
import { Title, Text, Divider } from 'components/Base';
import { useQRCode } from 'react-qrcodes';
import { formatWithSixDecimals } from '../../../utils';
import { useStores } from '../../../stores';
import { useObserver } from 'mobx-react';
import { Spinner } from '../../../ui';

export function ProgressModalContent() {
  return (
    <Box align="center">
      <Spinner />
    </Box>
  );
}

export function ProgressModal() {
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Title align="center">Waiting for the issue...</Title>
      <ProgressModalContent />
    </Box>
  );
}
