import React from 'react';
import { Box } from 'grommet';
import { Divider, Title, Text } from 'components/Base';
import { useStores } from '../../../stores';
import { useObserver } from 'mobx-react';
import { Spinner } from '../../../ui';
import { UITransactionStatus } from '../../../stores/UITransactionsStore';
import { Link } from 'react-router-dom';
import { cutText } from '../../../services/cutText';
import LinkHarmonyTx from '../../../components/LinkHarmonyTx';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import {
  ActionModalConfig,
  ActionModalOptions,
} from '../../../stores/ActionModalsStore';
import { TActionModalProps } from '../../../components/ActionModals';

function getUITxTitle(status: UITransactionStatus) {
  switch (status) {
    case UITransactionStatus.WAITING_SIGN_IN:
      return `Waiting for sign`;
    case UITransactionStatus.PROGRESS:
      return 'Waiting for transaction';
    case UITransactionStatus.SUCCESS:
      return 'Transaction success';
    case UITransactionStatus.FAIL:
      return 'Transaction fail';
    default:
      return 'Init';
  }
}

export function UITxModalContent({
  txHash = '',
  status,
  errorMessage,
  harmonyErrTxId = '',
}) {
  return (
    <Box align="center" gap="small">
      <Title align="center">{getUITxTitle(status)}</Title>
      <Box align="center">
        <Spinner />
      </Box>
      {txHash && (
        <Box>
          <Text>
            Transaction:&nbsp;
            <LinkHarmonyTx txHash={txHash} />
          </Text>
        </Box>
      )}

      {errorMessage && (
        <Box align="center">
          <Text color="Red500">{errorMessage}</Text>
        </Box>
      )}
      {harmonyErrTxId && (
        <Box>
          <Text>
            Tx:
            <LinkHarmonyTx txHash={harmonyErrTxId} />
          </Text>
        </Box>
      )}
    </Box>
  );
}

function Container({ uiTxId }: { uiTxId: string }) {
  const { uiTransactionsStore } = useStores();
  const uiTx = uiTransactionsStore.map[uiTxId];

  return useObserver(() => {
    if (!uiTx) {
      return null;
    }

    return (
      <UITxModalContent
        txHash={uiTx.txHash}
        status={uiTx.status}
        errorMessage={uiTx.errorMessage}
        harmonyErrTxId={uiTx.harmonyErrTxId}
      />
    );
  });
}

export function UITransactionModal(props: TActionModalProps) {
  const { uiTxId } = props.actionData.data;

  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Container uiTxId={uiTxId} />
    </Box>
  );
}
