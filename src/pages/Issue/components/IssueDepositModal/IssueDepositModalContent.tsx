import { useQRCode } from 'react-qrcodes';
import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { Button, Text } from '../../../../components/Base';
import {
  formatWithEightDecimals,
  formatWithTwoDecimals,
} from '../../../../utils';
import React, { useCallback, useMemo } from 'react';
import { useStores } from '../../../../stores';
import { Countdown } from '../../../../components/Countdown';
import { AddressWithCopyButton } from '../../../../components/AddressWithCopyButton';

interface Props {
  issueId: string;
}

export const IssueDepositModalContent: React.FC<Props> = observer(
  ({ issueId }) => {
    const { issueStore, issuePageStore } = useStores();
    const issueInfo = issueStore.getIssueInfo(issueId);

    const qrData = useMemo(() => {
      if (!issueInfo) {
        return '';
      }

      return `bitcoin:${issueInfo.bitcoinAddress}?amount=${issueInfo.sendAmount}`;
    }, [issueInfo]);

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

    const handleCancelIssue = useCallback(() => {
      issuePageStore.cancelIssue(issueId);
    }, [issueId, issuePageStore]);

    if (!issueInfo) {
      return null;
    }

    return (
      <Box gap="small" align="center">
        <Box align="center">
          <Text inline>Send</Text>
          <Text inline color="Orange500">
            {formatWithEightDecimals(issueInfo.sendAmount)} BTC
          </Text>
          <Text color="#748695" size="small" inline>
            ≈ ${formatWithTwoDecimals(issueInfo.sendUsdAmount)}
          </Text>
        </Box>
        <Box align="center" gap="xxsmall" fill="horizontal">
          <Text>in a single transaction to</Text>
          <AddressWithCopyButton address={issueInfo.bitcoinAddress} />
        </Box>
        <Box>
          <canvas ref={qrRef} />
        </Box>

        {!issueInfo.isExpired && (
          <Box>
            <Text align="center">
              Remaining time: <Countdown endTimestamp={issueInfo.expiredTime} />
            </Text>
          </Box>
        )}

        <Box alignSelf="start" margin={{ bottom: 'small' }}>
          <Text>
            <Text inline bold color="Red">
              Note:
            </Text>{' '}
            Please only send the exact amount, as over payment will not return
            the excess BTC
          </Text>
        </Box>

        <Box alignSelf="start" margin={{ bottom: 'small' }}>
          <Text>
            <Text inline bold color="Red">
              Note:
            </Text>{' '}
            If you have already made the payment, please wait for a few minutes
            for it to be confirmed.
          </Text>
        </Box>

        {issueInfo.isExpired && !issueInfo.isCanceled && (
          <Button onClick={handleCancelIssue}>Cancel Issue</Button>
        )}
      </Box>
    );
  },
);
