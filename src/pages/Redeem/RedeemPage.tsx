import * as React from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import * as styles from './styles.styl';

import { NavigateTabs } from '../../components/NavigateTabs';
import RedeemForm from './components/RedeemForm/RedeemForm';
import { useParams } from 'react-router';
import { useStores } from '../../stores';
import { useEffect } from 'react';

export const RedeemPage = () => {
  const { redeemTx, modal } = useParams<{ redeemTx?: string; modal: string }>();
  const { redeemPageStore } = useStores();
  useEffect(() => {
    if (redeemTx) {
      redeemPageStore.loadRedeemDetails(redeemTx).then(() => {
        if (modal === 'withdraw') {
          redeemPageStore.openRedeemWithdrawModal(redeemTx);
          return;
        } else {
          redeemPageStore.openRedeemDetailsModal(redeemTx);
        }
      });
    }
  }, [redeemPageStore, redeemTx, modal]);

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
