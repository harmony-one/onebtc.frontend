import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Divider, Text, Title } from '../../../../components/Base';
import { formatWithSixDecimals } from '../../../../utils';
import { PriceView } from '../../../../components/PriceView';
import { cutText } from '../../../../services/cutText';
import React from 'react';

interface IssueTransactionDetailsProps {
  bitcoinAddress: string;
  bridgeFee: number;
  vaultId: string;
  totalReceived: number;
  totalReceivedUsd: number;
}

export const IssueTransactionDetails: React.FC<IssueTransactionDetailsProps> = ({
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
          OneBTC is a fully decentralized system. Please make sure you send the
          right amount of BTC, we cannot guarantee that the vault will return
          the additional BTC that you sent by mistake.
        </Text>
      </Box>
    </Box>
  ));
};

IssueTransactionDetails.displayName = 'IssueTransactionDetails';
