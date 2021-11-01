import { useQRCode } from 'react-qrcodes';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Text } from '../../../../components/Base';
import { formatWithSixDecimals } from '../../../../utils';
import React from 'react';
import { useStores } from '../../../../stores';

interface Props {
  issueId: string;
}

export const IssueDepositModalContent: React.FC<Props> = ({ issueId }) => {
  const { issueStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  const qrData = `bitcoin:${issueInfo.bitcoinAddress}?amount=${issueInfo.sendAmount}`;
  const [qrRef] = useQRCode({
    text: qrData,
    options: {
      level: 'H',
      margin: 5,
      scale: 8,
      width: 128,
      color: {
        dark: '#000000',
        light: '#ffffffff',
      },
    },
  });

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Text>
          Send{' '}
          <Text inline color="Orange500">
            {issueInfo.sendAmount}
          </Text>
          &nbsp;BTC
        </Text>
        <Text color="#748695" size="small" inline>
          ≈ ${formatWithSixDecimals(issueInfo.sendUsdAmount)}
        </Text>
      </Box>
      <Box align="center" gap="xxsmall">
        <Text>in a single transaction to</Text>
        <Box round="xxsmall" style={{ padding: '16px' }} border="all">
          <Text
            bold
            style={{ textAlign: 'center', overflowWrap: 'break-word' }}
          >
            {issueInfo.bitcoinAddress}
          </Text>
        </Box>
        <Text>Within 0 Days 23:54:22</Text>
      </Box>

      <Box alignSelf="start">
        <Text>
          <Text inline bold color="Red">
            Warning:
          </Text>{' '}
          Some Bitcoin wallets display values in 1BTC. Please ensure you send
          the correct amount:1000 1BTC
        </Text>
      </Box>

      <Box>
        <canvas ref={qrRef} />
      </Box>

      <Box alignSelf="start" margin={{ bottom: 'small' }}>
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          If you have already made the payment, please wait for a few minutes
          for it to be confirmed in the table below.
        </Text>
      </Box>
    </Box>
  ));
};
