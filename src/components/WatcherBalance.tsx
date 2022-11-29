import React, { useCallback, useEffect } from 'react';
import { useStores } from '../stores';
import { useInterval } from '../hooks/useInterval';
import { Box } from 'grommet';
import { Text, Title } from './Base';

export const WatcherBalance: React.FC = React.memo(() => {
  const { user, ratesStore, actionModals } = useStores();

  useEffect(() => {
    actionModals.open(() => <Box pad="large">
      <Title>The Harmony Bitcoin bridge has been sunset</Title>
      <br />
      <Text>
        Users would not be able to bridge Bitcoin to Harmony. Existing users may redeem Bitcoin, which will be manually processed.
      </Text>
      <br />
      <Text>
        You will be prompted to sign a transfer transaction that will transfer your 1BTC to a Harmony address. Upon receiving the 1BTC, we will manually transfer the bitcoin to your BTC address within 48-72 hours. If you have not received your bitcoins after the 72 hour window, please raise a support ticket, by going through the support page on the left panel. Note that, this redeem operation will not be displayed under the redeem operations list in the dashboard.
      </Text>
      <br />
      <Text>
        If you are the owner of Vault - turn it off and withdraw collateral. In case of problems, please contact the Harmony support channel.
      </Text>
    </Box>, {
      initData: {},
      applyText: 'Got it',
      closeText: '',
      noValidation: true,
      width: '600px',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
    });
  }, [])

  const updateBalance = useCallback(() => {
    user.updateBalance();
  }, [user]);

  const loadRates = useCallback(() => {
    ratesStore.loadRates();
  }, [ratesStore]);

  useInterval({ callback: loadRates, timeout: 30000 });
  useInterval({ callback: updateBalance, timeout: 5000 });

  return null;
});

WatcherBalance.displayName = 'WatcherBalance';
