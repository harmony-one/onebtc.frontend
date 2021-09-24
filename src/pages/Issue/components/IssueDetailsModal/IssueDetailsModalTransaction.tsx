import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Divider, Text, Title } from '../../../../components/Base';
import { formatWithSixDecimals } from '../../../../utils';
import { PriceView } from '../../../../components/PriceView';
import React from 'react';
import LinkBitcoinAddress from '../../../../components/LinkBitcoinAddress';
import LinkHarmonyAddress from '../../../../components/LinkHarmonyAddress';

interface Props {
  issueTxHash: string;
}

export const IssueDetailsModalTransaction: React.FC<Props> = ({
  issueTxHash,
}) => {
  const { user, issuePageStore } = useStores();
  const issueInfo = issuePageStore.getIssueInfo(issueTxHash);

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Title>{issueInfo.totalReceived} OneBTC</Title>
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
            tokenName="OneBTC"
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
            <LinkHarmonyAddress address={issueInfo.requester} />
          </Text>
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
          <Text bold>
            <LinkHarmonyAddress address={issueInfo.vaultId} />
          </Text>
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Vault BTC Address</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkBitcoinAddress address={issueInfo.bitcoinAddress} />
          </Text>
        </Box>
      </Box>

      <Box alignSelf="start" margin={{ bottom: 'small' }}>
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          OneBTC is a fully decentralized system. Please make sure you send the
          right amount of BTC, we cannot guarantee that the vault will return
          the additional BTC that you sent by mistake.
        </Text>
      </Box>
    </Box>
  ));
};

IssueDetailsModalTransaction.displayName = 'IssueDetailsModalTransaction';
