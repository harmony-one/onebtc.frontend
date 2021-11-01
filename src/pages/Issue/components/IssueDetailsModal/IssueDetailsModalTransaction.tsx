import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Divider, Text, Title } from '../../../../components/Base';
import { formatWithSixDecimals } from '../../../../utils';
import { PriceView } from '../../../../components/PriceView';
import React from 'react';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import { LinkHarmony } from '../../../../components/LinkHarmony';

interface Props {
  issueId: string;
}

export const IssueDetailsModalTransaction: React.FC<Props> = ({ issueId }) => {
  const { user, issueStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Title>{issueInfo.totalReceived} 1BTC</Title>
        <Text color="#748695" size="small" inline>
          ≈ ${formatWithSixDecimals(issueInfo.totalReceivedUsd)}
        </Text>
      </Box>
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Bridge Fee</Text>
        </Box>
        <Box>
          <PriceView
            tokenName="BTC"
            value={issueInfo.bridgeFee}
            rate={user.btcRate}
          />
        </Box>
      </Box>

      <Divider fullwidth />

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Total Deposit</Text>
        </Box>
        <Box>
          <PriceView
            tokenName="1BTC"
            value={issueInfo.totalReceived}
            rate={user.btcRate}
          />
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Destination Address</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkHarmony hash={issueInfo.requester} type="address" />
          </Text>
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Vault Account</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkHarmony hash={issueInfo.vaultId} type="address" />
          </Text>
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Vault BTC Address</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkBitcoin type="wallet" hash={issueInfo.bitcoinAddress} />
          </Text>
        </Box>
      </Box>

      <Box alignSelf="start" margin={{ bottom: 'small' }}>
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          1BTC is a fully decentralized system. Please make sure you send the
          right amount of BTC, we cannot guarantee that the vault will return
          the additional BTC that you sent by mistake.
        </Text>
      </Box>
    </Box>
  ));
};

IssueDetailsModalTransaction.displayName = 'IssueDetailsModalTransaction';
