import React from 'react';
import { Box } from 'grommet';
import { UITxModalContent } from '../../modules/uiTransaction/UITransactionModal';
import { UITransactionStatus } from '../../modules/uiTransaction/UITransactionsStore';

type Props = {};

export const SandboxUiTX: React.FC<Props> = ({ children }) => {
  /*
  fail
  Transaction has been reverted by the EVM 123
  0xbbddad4a454943c86b91f50f72529a948ce6b492448172f9b29db73bf24a4a41
   */
  return (
    <Box>
      <UITxModalContent
        status={UITransactionStatus.FAIL}
        onClose={() => Promise.resolve()}
        txHash="231231adas"
        errorMessage="Transaction has been reverted by the EVM"
        harmonyErrTxId="0xbbddad4a454943c86b91f50f72529a948ce6b492448172f9b29db73bf24a4a41"
      />
    </Box>
  );
};
