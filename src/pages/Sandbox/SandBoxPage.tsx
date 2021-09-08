import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Button, Text } from '../../components/Base';
import { BaseContainer, PageContainer } from '../../components';
import { useStores } from '../../stores';
import { observer } from 'mobx-react-lite';
import {
  DepositModal,
  DepositModalContent,
} from '../CreateIssuePage/components/DepositModal';
import {
  TransactionModal,
  TransactionModalContent,
} from '../CreateIssuePage/components/TransactionModal';
import {
  ProgressModal,
  ProgressModalContent,
} from '../CreateIssuePage/components/ProgressModal';
import { ReceivedModal } from '../CreateIssuePage/components/ReceivedModal';
import * as bitcoin from 'bitcoinjs-lib';

export const SandBoxPage: React.FC = observer(({ children }) => {
  const { actionModals } = useStores();

  const openProgressModal = useCallback(() => {
    actionModals.open(ReceivedModal, {
      title: 'Some Title',
      applyText: 'Continue',
      initData: {
        total: '13123123',
      },
      closeText: '',
      noValidation: true,
      width: '320px',
      showOther: false,
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }, [actionModals]);

  const openTransactionModal = useCallback(() => {
    actionModals.open(TransactionModal, {
      title: 'Some Title',
      initData: {
        issueId:
          '94720111882553504141518871593598895140913742168115403955140274340127851896228',
        amount: 13123123,
        vaultId: 'tb1q7d7jemxrl7zcqrgmr2pr36ask4n3fmjmq5c4fg',
        total: Number(13123123) / 1e8,
        bitcoinAddress: 'tb1q7d7jemxrl7zcqrgmr2pr36ask4n3fmjmq5c4fg',
        bridgeFee: Number(13123123) / 1e8,
      },
      applyText: 'Close',
      closeText: '',
      noValidation: true,
      width: '80%',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }, [actionModals]);

  const openDepositModal = useCallback(() => {
    actionModals.open(DepositModal, {
      title: 'Some Title',
      initData: {
        issueId: 12312312321,
        amount: 1000312,
        bitcoinAddress: 'tb1q7d7jemxrl7zcqrgmr2pr36ask4n3fmjmq5c4fg',
      },
      applyText: 'I have made the payment',
      closeText: 'Cancel',
      noValidation: true,
      width: '500px',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.reject();
      },
    });
  }, [actionModals]);

  const btc = '0x88f99184FE19a8C118E802f249a08a1C60F87e28';
  const btcBase58Address = bitcoin.address.toBase58Check(
    Buffer.from(btc.slice(2), 'hex'),
    0,
  );

  const btc2 = bitcoin.address.toBech32(
    Buffer.from(btc.slice(2), 'hex'),
    0,
    'tb',
  );

  console.log('### btcBase58Address', btcBase58Address);
  console.log('### toBech32', btc2);

  // tb1ql23zvjyrhz76u2c2pdnmxvyc76gemdnjq60tya
  // tb1q3ruerp87rx5vzx8gqteyngy2r3s0sl3gsxzpsw
  return (
    <BaseContainer>
      <PageContainer>
        <Box>
          <Text>{btcBase58Address}</Text>
          <Text>{btc2}</Text>
        </Box>
        <Box>{Number('0.0001')}</Box>
        <Box>{Number('0.0001') / 1e9}</Box>
        <Box>{(Number('0.0001') / 1e9) * 1e9}</Box>
        <Box>
          <ProgressModalContent />
        </Box>

        <Button
          bgColor="#00ADE8"
          onClick={openProgressModal}
          transparent={false}
        >
          openProgressModal
        </Button>

        <Box>
          <TransactionModalContent
            sendAmount={1}
            sendUsdAmount={100}
            bitcoinAddress="tb1q7d7jemxrl7zcqrgmr2pr36ask4n3fmjmq5c4fg"
            bridgeFee={11111}
            issueId="94720111882553504141518871593598895140913742168115403955140274340127851896228"
            vaultId="tb1q7d7jemxrl7zcqrgmr2pr36ask4n3fmjmq5c4fg"
          />
        </Box>
        <Box>
          <Button
            bgColor="#00ADE8"
            onClick={openTransactionModal}
            transparent={false}
          >
            openDepositModal
          </Button>
        </Box>
        <Box>
          <DepositModalContent
            sendAmount={1231200}
            sendUsdAmount={123}
            bitcoinAddress="tb1q7d7jemxrl7zcqrgmr2pr36ask4n3fmjmq5c4fg"
          />
        </Box>
        <Box>
          <Button
            bgColor="#00ADE8"
            onClick={openDepositModal}
            transparent={false}
          >
            openDepositModal
          </Button>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});

SandBoxPage.displayName = 'SandBoxPage';
