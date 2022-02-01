import React from 'react';
import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Divider, Text, Title } from '../../../../components/Base';
import {
  formatWithEightDecimals,
  formatWithSixDecimals,
} from '../../../../utils';
import { PriceView } from '../../../../components/PriceView';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import { LinkHarmony } from '../../../../components/LinkHarmony';

export const RedeemDetailsModalTransaction: React.FC<{
  redeemId: string;
}> = props => {
  const { ratesStore, redeemStore } = useStores();

  const redeemInfo = redeemStore.getRedeemInfo(props.redeemId);

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Title>{formatWithEightDecimals(redeemInfo.totalReceived)} 1BTC</Title>
        <Text color="#748695" size="small" inline>
          ≈ ${formatWithSixDecimals(redeemInfo.totalReceivedUsd)}
        </Text>
      </Box>
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Bridge Fee</Text>
        </Box>
        <Box>
          <PriceView
            tokenName="BTC"
            value={redeemInfo.bridgeFee}
            rate={ratesStore.BTC_USDT}
          />
        </Box>
      </Box>

      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Bitcoin Network Fee</Text>
        </Box>
        <Box>
          <PriceView
            tokenName="BTC"
            value={redeemInfo.transferFeeBtc}
            rate={ratesStore.BTC_USDT}
          />
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
            value={redeemInfo.totalReceived}
            rate={ratesStore.BTC_USDT}
          />
        </Box>
      </Box>

      <Box direction="column" width="100%" align="start" justify="between">
        <Box>
          <Text>Destination Address:</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkBitcoin
              mono
              cut={false}
              type="wallet"
              hash={redeemInfo.bitcoinAddress}
            />
          </Text>
        </Box>
      </Box>

      <Box direction="column" width="100%" align="start" justify="between">
        <Box>
          <Text>Requester Address:</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkHarmony
              mono
              cut={false}
              type="address"
              hash={redeemInfo.requester}
            />
          </Text>
        </Box>
      </Box>

      <Box direction="column" width="100%" align="start" justify="between">
        <Box>
          <Text>Vault Account:</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkHarmony
              mono
              cut={false}
              hash={redeemInfo.vaultId}
              type="address"
            />
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

RedeemDetailsModalTransaction.displayName = 'RedeemDetailsModalTransaction';
