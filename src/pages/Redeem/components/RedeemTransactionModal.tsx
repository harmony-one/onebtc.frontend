import React from 'react';
import { Box } from 'grommet';
import { Title, Text, Divider } from 'components/Base';
import { useStores } from '../../../stores';
import { useObserver } from 'mobx-react';
import { formatWithSixDecimals } from '../../../utils';
import { cutText } from '../../../services/cutText';
import { satoshiToBitcoin } from '../../../services/bitcoin';
import { PriceView } from '../../../components/PriceView';

export const RedeemTransactionDetails = ({
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

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Bitcoin Network Fee</Text>
        </Box>
        <Box>
          <PriceView tokenName="BTC" value={bridgeFee} rate={user.btcRate} />
        </Box>
      </Box>

      <Divider fullwidth />

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>You will receive</Text>
        </Box>
        <Box>
          <PriceView
            tokenName="BTC"
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

export const RedeemTransactionModalContent = props => {
  const {
    bitcoinAddress,
    bridgeFee,
    redeemId,
    totalReceived,
    totalReceivedUsd,
    vaultId,
  } = props;
  return (
    <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
      <Text style={{ overflowWrap: 'break-word', textAlign: 'center' }}>
        ISSUE # {redeemId}
      </Text>
      <Divider fullwidth colorful />
      <Box direction="row-responsive" gap="medium" basis="full" align="start">
        <Box basis="1/2">
          <RedeemTransactionDetails
            bitcoinAddress={bitcoinAddress}
            bridgeFee={bridgeFee}
            vaultId={vaultId}
            totalReceived={totalReceived}
            totalReceivedUsd={totalReceivedUsd}
          />
        </Box>
        <Box basis="1/2" gap="medium" align="center">
          <Title>Pending</Title>
          <Text>
            The Vault has to complete the transaction in: 0 Days 23:55:31
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export const RedeemTransactionModal = props => {
  const { transactionHash } = props.actionData.data;
  const { redeemPageStore, user } = useStores();
  const redeem = redeemPageStore.redeemMap[transactionHash];

  const sendAmount = satoshiToBitcoin(redeem.redeemAmount);
  const sendUsdAmount = sendAmount * user.btcRate;
  const redeemId = redeem.redeemEvent.redeem_id;
  const vaultId = redeem.redeemEvent.vault_id;
  const bitcoinAddress = redeem.btcAddress;
  const bridgeFee = satoshiToBitcoin(redeem.redeemEvent.fee);
  const totalReceived = satoshiToBitcoin(redeem.redeemEvent.amount);
  const totalReceivedUsd = totalReceived * user.btcRate;

  return useObserver(() => (
    <RedeemTransactionModalContent
      bitcoinAddress={bitcoinAddress}
      sendAmount={sendAmount}
      sendUsdAmount={sendUsdAmount}
      bridgeFee={bridgeFee}
      redeemId={redeemId}
      vaultId={vaultId}
      totalReceived={totalReceived}
      totalReceivedUsd={totalReceivedUsd}
    />
  ));
};
