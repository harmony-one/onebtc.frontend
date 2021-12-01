import * as React from 'react';
import { Box } from 'grommet';
import * as styles from './RedeemPageStyles.styl';

import { NavigateTabs } from '../../components/NavigateTabs';
import RedeemForm from './components/RedeemForm/RedeemForm';
import { useParams } from 'react-router';
import { useStores } from '../../stores';
import { useEffect } from 'react';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { useInterval } from '../../hooks/useInterval';
import { ONE_SECOND } from '../../constants/date';

export const RedeemPage = () => {
  const { redeemId, modal } = useParams<{ redeemId?: string; modal: string }>();
  const { redeemPageStore } = useStores();

  useInterval({
    callback: () => {
      redeemPageStore.loadVaults();
    },
    timeout: ONE_SECOND * 10,
  });

  useEffect(() => {
    if (redeemId) {
      if (modal === 'withdraw') {
        redeemPageStore.openRedeemWithdrawModal(redeemId);
        return;
      } else {
        redeemPageStore.openRedeemDetailsModal(redeemId);
      }
    }
  }, [redeemPageStore, redeemId, modal]);

  return (
    <BaseLayout>
      <Box align="center">
        <Box align="center" className={styles.contentContainer}>
          <NavigateTabs />

          <Box
            fill="horizontal"
            direction="column"
            align="center"
            justify="center"
            pad="medium"
            className={styles.issueContainer}
          >
            <RedeemForm />
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};
