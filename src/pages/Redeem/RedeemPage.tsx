import * as React from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import * as styles from './RedeemPageStyles.styl';

import { NavigateTabs } from '../../components/NavigateTabs';
import RedeemForm from './components/RedeemForm/RedeemForm';
import { useParams } from 'react-router';
import { useStores } from '../../stores';
import { useEffect } from 'react';

export const RedeemPage = () => {
  const { redeemId, modal } = useParams<{ redeemId?: string; modal: string }>();
  const { redeemPageStore } = useStores();

  useEffect(() => {
    redeemPageStore.loadVaults();
  }, [redeemPageStore]);

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
    <BaseContainer>
      <PageContainer>
        <Box align="center" margin={{ top: 'large', bottom: 'large' }}>
          <Box align="center" className={styles.contentContainer}>
            <NavigateTabs />

            <Box
              fill
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
      </PageContainer>
    </BaseContainer>
  );
};
