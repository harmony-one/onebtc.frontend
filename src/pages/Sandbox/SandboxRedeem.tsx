import React from 'react';
import { Box } from 'grommet';

import { Divider } from '../../components/Base';

type Props = {};

export const SandboxRedeem: React.FC<Props> = ({ children }) => {
  /*
  fail
  Transaction has been reverted by the EVM 123
  0xbbddad4a454943c86b91f50f72529a948ce6b492448172f9b29db73bf24a4a41
   */
  return (
    <Box gap="medium">
      <Divider />
    </Box>
  );
};
