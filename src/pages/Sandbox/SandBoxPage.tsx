import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Button, Divider } from '../../components/Base';
import { BaseContainer, PageContainer } from '../../components';
import * as bitcoin from 'bitcoinjs-lib';
import { issue_tx_mock } from 'onebtc.sdk/lib/helpers';
import * as agent from 'superagent';
import { getOneBTCClient } from '../../services/oneBtcClient';
import utils from 'web3-utils';
import { SandboxUiTX } from './SandboxUiTX';
import { SandboxRedeem } from './SandboxRedeem';
import { ModalHeader } from '../../components/ActionModals/components/ModalHeader';
import { satoshiToBitcoin } from '../../services/bitcoin';
import { useStores } from '../../stores';
import { IssueConfirmModal } from '../Issue/components/IssueConfirmModal';

export const SandBoxPage: React.FC = () => {
  type TResponse = {
    status: string;
    data: {
      network: string;
      address: string;
      txs: [
        {
          txid: string;
          output_no: 1;
          script_asm: string;
          script_hex: string;
          value: string;
          confirmations: number;
          time: number;
        },
      ];
    };
  };

  /*
btc_address: "0xBD9cb29ba8E32E0F307F3669F5e2CdaF124406e7"
fee: "200"
issue_id: "50135425367742375175424430003476035699384670747228878690484422876500053896398"
requester: "0xC1Cff1Cc2a92355544F31518Bc5b234Adb562751"
vault_id: "0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581"

### btcBase58Address 1JHaRoXUBoLMyBj4YfUKyg3QfodK69pjud
### btcAddress tb1qhkwt9xaguvhq7vrlxe5ltckd4ufygph873d5kl
   */
  const ONE_ADDRESS = '0xc1cff1cc2a92355544f31518bc5b234adb562751';
  const ISSUE_ID =
    '50135425367742375175424430003476035699384670747228878690484422876500053896398';
  const BTC_ADDRESS = 'tb1qhkwt9xaguvhq7vrlxe5ltckd4ufygph873d5kl';
  const BTC_ADDRESS_BASE_58 = '1JHaRoXUBoLMyBj4YfUKyg3QfodK69pjud';

  const API_URL = `https://chain.so/api/v2/get_tx_unspent/BTCTEST/`;

  const executeIssueTxMock = async (
    oneAddress,
    issueId,
    btcBase58Address,
  ) => {};

  const Number2Buffer = (num: number) => {
    // bigendia
    let str = num.toString(16);
    if (str.length & 1) str = '0' + str;
    return Buffer.from(str, 'hex');
  };

  const buildBtcTx = (txData, issueId, btcBase58Address, amount) => {
    const tx = new bitcoin.Transaction();

    const vaultScript = bitcoin.address.toOutputScript(btcBase58Address);
    tx.addInput(
      Buffer.from(txData.txid, 'hex'),
      txData.output_no,
      4294967295,
      Buffer.alloc(32),
    );
    tx.getId();
    tx.addOutput(vaultScript, amount);
    const OpData = Number2Buffer(issueId);
    const embed = bitcoin.payments.embed({ data: [OpData] });
    tx.addOutput(embed.output, 0);
    // tx.setVersion(1);

    // const btcTx = tx.buildIncomplete();

    console.log('### tx.toHex();', tx.toHex());

    return tx;
  };

  const executeIssue = async (oneAddress, issueId, txData) => {};

  const loadWalletTrx = async btcAddress => {
    const response = await agent.get(API_URL + btcAddress);

    console.log('### response', response.body);

    const body = response.body as TResponse;
    const txData = body.data.txs[0];

    if (!txData) {
      throw new Error('has no transaction');
    }

    return txData;
  };

  const handleExecuteIssue = async () => {
    console.log('### handleExecuteIssue');

    const txData = await loadWalletTrx(BTC_ADDRESS);

    console.log('### txData', txData);

    try {
      const result = await executeIssue(ONE_ADDRESS, ISSUE_ID, txData);
      console.log('### res', result);
    } catch (err) {
      console.log('### err', err);
    }
  };

  const handleExecuteIssueMock = async () => {
    console.log('### handleExecuteIssueMock');

    try {
      const txData = await loadWalletTrx(BTC_ADDRESS);

      console.log('### txData', txData);

      const result = await executeIssueTxMock(
        ONE_ADDRESS,
        ISSUE_ID,
        BTC_ADDRESS_BASE_58,
      );

      console.log('### res', result);
    } catch (err) {
      console.log('### err', err);
    }
  };

  const { actionModals, user } = useStores();
  const openModal = useCallback(() => {
    actionModals.open(IssueConfirmModal, {
      initData: {
        total: satoshiToBitcoin(100000),
        txHash: '123',
      },
      applyText: '',
      closeText: '',
      width: '320px',
      noValidation: true,
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
    });
  }, [actionModals]);

  return (
    <BaseContainer>
      <PageContainer>
        <Button onClick={openModal}>open modal</Button>
        <Box gap="medium">
          <Box>
            <ModalHeader onClose={() => {}} title="Deposit" />
          </Box>
          <Box>
            <SandboxRedeem />
          </Box>

          <Divider fullwidth colorful />

          <Box gap="small">
            <SandboxUiTX />
          </Box>

          <Divider fullwidth colorful />

          <Box gap="small">
            <Button onClick={() => handleExecuteIssue()}>executeIssue</Button>
            <Button onClick={() => handleExecuteIssueMock()}>
              executeIssueMock
            </Button>
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

SandBoxPage.displayName = 'SandBoxPage';
