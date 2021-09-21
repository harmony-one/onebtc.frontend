import { BcoinBTCTx, loadWalletTxList } from '../../../../services/bitcoin';
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { IssueTransactionDetails } from './IssueTransactionDetails';
import { DepositModalContent } from '../DepositModal';
import { IssueTransactionConfirmation } from './IssueTransactionConfirmation';

interface WatcherProps {
  bitcoinAddress: string;
}

const useWatcher = ({ bitcoinAddress }: WatcherProps): null | BcoinBTCTx => {
  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState<BcoinBTCTx | null>(null);

  const load = useCallback(() => {
    return loadWalletTxList(bitcoinAddress).then(result => {
      if (result.length > 0) {
        setResult(result[0]);
      }
    });
  }, [bitcoinAddress]);

  const watcherRun = useCallback(() => {
    const timeout = counter > 0 ? 3 * 1000 : 0;
    return setTimeout(async () => {
      await load();
      setCounter(counter + 1);
    }, timeout);
  }, [counter, load]);

  useEffect(() => {
    const t = watcherRun();
    return () => {
      clearTimeout(t);
    };
  }, [watcherRun, counter]);

  return result;
};

interface IssueTransactionModalContentProps {
  sendAmount: number;
  sendUsdAmount: number;
  bitcoinAddress: string;
  bridgeFee: number;
  issueId: string;
  totalReceived: number;
  totalReceivedUsd: number;
  vaultId: string;
  issueTxHash: string;
}

export const IssueTransactionModalContent: React.FC<IssueTransactionModalContentProps> = props => {
  const {
    sendAmount,
    sendUsdAmount,
    bitcoinAddress,
    bridgeFee,
    issueId,
    totalReceived,
    totalReceivedUsd,
    vaultId,
    issueTxHash,
  } = props;

  const btcTx = useWatcher({ bitcoinAddress });

  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
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
          {!btcTx && (
            <DepositModalContent
              sendAmount={sendAmount}
              sendUsdAmount={sendUsdAmount}
              bitcoinAddress={bitcoinAddress}
            />
          )}
          {btcTx && (
            <IssueTransactionConfirmation
              issueTxHash={issueTxHash}
              btcTx={btcTx}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

IssueTransactionModalContent.displayName = 'IssueTransactionModalContent';
