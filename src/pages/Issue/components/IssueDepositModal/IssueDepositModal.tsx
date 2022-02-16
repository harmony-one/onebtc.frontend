import React, { useEffect } from 'react';
import { Box } from 'grommet';
import { Divider, Title } from 'components/Base';
import { observer } from 'mobx-react';
import { TActionModalProps } from '../../../../components/ActionModals';
import { IssueDepositModalContent } from './IssueDepositModalContent';
import { useIssueWatcher } from '../../../../hooks/useIssueWatcher';
import { useStores } from '../../../../stores';

export const IssueDepositModal: React.FC<TActionModalProps> = observer(
  props => {
    const { issueStore } = useStores();
    const { issueId } = props.actionData.data;

    const issueInfo = issueStore.getIssueInfo(issueId);

    useIssueWatcher({ issueId });

    useEffect(() => {
      if (issueInfo && issueInfo.btcTx && issueInfo.btcTx.hash) {
        props.config.options.onApply();
      }
    }, [issueInfo, props.config.options]);

    return (
      <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
        <Title align="center">Deposit</Title>
        <Divider colorful fullwidth />
        <IssueDepositModalContent issueId={issueId} />
      </Box>
    );
  },
);

IssueDepositModal.displayName = 'IssueDepositModal';
