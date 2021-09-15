import React from 'react';
import { Box } from 'grommet';

import {
  RedeemTransactionDetails,
  RedeemTransactionModalContent,
} from '../Redeem/components/RedeemTransactionModal';
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
      <RedeemTransactionModalContent
        redeemId="0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581"
        bridgeFee={0.0001}
        vaultId="0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581"
        bitcoinAddress="tb1quqayjeavh584t7nzrtnryv6gtrrwk92ef47nfa"
        totalReceived="0.001"
        totalReceivedUsd="5000"
      />
      <Divider />
      <RedeemTransactionDetails
        bridgeFee={0.0001}
        vaultId="0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581"
        bitcoinAddress="tb1quqayjeavh584t7nzrtnryv6gtrrwk92ef47nfa"
        totalReceived="0.001"
        totalReceivedUsd="5000"
      />
    </Box>
  );
};
