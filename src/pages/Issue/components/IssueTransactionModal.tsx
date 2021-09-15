import React from 'react';
import { Box } from 'grommet';
import { Title, Text, Divider, Button } from 'components/Base';
import { PriceView } from '../../Explorer/Components';
import { DepositModalContent } from './DepositModal';
import { useStores } from '../../../stores';
import { useObserver } from 'mobx-react';
import { formatWithSixDecimals } from '../../../utils';
import { cutText } from '../../../services/cutText';

const IssueTransactionDetails = ({
  bitcoinAddress,
  bridgeFee,
  vaultId = '',
  totalReceived,
  totalReceivedUsd,
}) => {
  const { user } = useStores();
  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Title>{totalReceived} OneBTC</Title>
        <Text color="#748695" size="small" inline>
          ≈ ${formatWithSixDecimals(totalReceivedUsd)}
        </Text>
      </Box>
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Bridge Fee</Text>
        </Box>
        <Box>
          <PriceView tokenName="BTC" value={bridgeFee} rate={user.btcRate} />
        </Box>
      </Box>

      <Divider fullwidth />

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Total Deposit</Text>
        </Box>
        <Box>
          <PriceView
            tokenName="OneBTC"
            value={totalReceived}
            rate={user.btcRate}
          />
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Destination Address</Text>
        </Box>
        <Box>
          <Text bold>{cutText(bitcoinAddress)}</Text>
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Parachain Block</Text>
        </Box>
        <Box>
          <Text bold>439396</Text>
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Vault Account</Text>
        </Box>
        <Box>
          <Text bold>{cutText(vaultId)}</Text>
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Vault BTC Address</Text>
        </Box>
        <Box>
          <Text bold>{cutText(vaultId)}</Text>
        </Box>
      </Box>

      <Box alignSelf="start" margin={{ bottom: 'small' }}>
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          interBTC is a fully decentralized system. Please make sure you send
          the right amount of BTC, we cannot guarantee that the vault will
          return the additional BTC that you sent by mistake.
        </Text>
      </Box>
    </Box>
  ));
};

export const IssueTransactionModalContent = props => {
  const {
    sendAmount,
    sendUsdAmount,
    bitcoinAddress,
    bridgeFee,
    issueId,
    totalReceived,
    totalReceivedUsd,
    vaultId,
  } = props;
  return (
    <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
      <Text style={{ overflowWrap: 'break-word', textAlign: 'center' }}>
        ISSUE # {issueId}
      </Text>
      <Divider fullwidth colorful />
      <Box direction="row-responsive" gap="medium" basis="full" align="start">
        <Box basis="1/2">
          <IssueTransactionDetails
            bitcoinAddress={bitcoinAddress}
            bridgeFee={bridgeFee}
            vaultId={vaultId}
            totalReceived={totalReceived}
            totalReceivedUsd={totalReceivedUsd}
          />
        </Box>
        <Box basis="1/2">
          <DepositModalContent
            sendAmount={sendAmount}
            sendUsdAmount={sendUsdAmount}
            bitcoinAddress={bitcoinAddress}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const IssueTransactionModal = props => {
  const { transactionHash } = props.actionData.data;
  const { issuePageStore, user } = useStores();
  const issue = issuePageStore.issuesMap[transactionHash];

  const sendAmount = Number(issue.issueAmount) / 1e9;
  const sendUsdAmount = sendAmount * user.btcRate;
  const issueId = issue.issueEvent.issue_id;
  const vaultId = issue.issueEvent.vault_id;
  const bitcoinAddress = issue.btcAddress;
  const bridgeFee = Number(issue.issueEvent.fee) / 1e9;
  const totalReceived = Number(issue.issueEvent.amount) / 1e9;
  const totalReceivedUsd = totalReceived * user.btcRate;

  return useObserver(() => (
    <IssueTransactionModalContent
      bitcoinAddress={bitcoinAddress}
      sendAmount={sendAmount}
      sendUsdAmount={sendUsdAmount}
      bridgeFee={bridgeFee}
      issueId={issueId}
      vaultId={vaultId}
      totalReceived={totalReceived}
      totalReceivedUsd={totalReceivedUsd}
    />
  ));
};
