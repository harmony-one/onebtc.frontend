import React, { useEffect } from 'react';
import { Box } from 'grommet';
import { Divider, Title } from 'components/Base';
import { useStores } from '../../../../stores';
import { observer, useObserver } from 'mobx-react';
import { TActionModalProps } from '../../../../components/ActionModals';
import { useBtcWalletVaultIncomeWatcher } from '../../../../hooks/useBtcWalletVaultIncomeWatcher';
import { config } from '../../../../config';
import { IssueDepositModalContent } from './IssueDepositModalContent';

export const IssueDepositModal: React.FC<TActionModalProps> = observer(
  props => {
    const { issueId } = props.actionData.data;
    const { issuePageStore } = useStores();

    const issueInfo = issuePageStore.getIssueInfo(issueId);

    const btcTx = useBtcWalletVaultIncomeWatcher({
      bitcoinAddress: issueInfo.bitcoinAddress,
      confirmations: config.bitcoin.waitConfirmations,
    });

    useEffect(() => {
      if (btcTx && btcTx.hash) {
        props.config.options.onApply();
      }
    }, [btcTx, props.config.options]);

    return useObserver(() => (
      <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
        <Title align="center">Deposit</Title>
        <Divider colorful fullwidth />
        <IssueDepositModalContent issueId={issueId} />
      </Box>
    ));
  },
);

IssueDepositModal.displayName = 'IssueDepositModal';
