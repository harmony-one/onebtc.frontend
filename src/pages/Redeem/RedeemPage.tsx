import * as React from 'react';
import { Box } from 'grommet';

import { NavigateTabs } from '../../components/NavigateTabs';
import RedeemForm from './components/RedeemForm/RedeemForm';
import { useParams } from 'react-router';
import { useStores } from '../../stores';
import { useCallback, useEffect } from 'react';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { useInterval } from '../../hooks/useInterval';
import { ONE_SECOND } from '../../constants/date';
import { BridgeContentContainer } from '../../components/BridgeContentContainer';
import { BridgeFormsSurface } from '../../components/BridgeFormsSurface';

export const RedeemPage = () => {
  const { redeemId, modal } = useParams<{ redeemId?: string; modal: string }>();
  const { redeemPageStore } = useStores();

  const loadPageData = useCallback(() => {
    redeemPageStore.loadData();
  }, [redeemPageStore]);

  useInterval({
    callback: loadPageData,
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
        <BridgeContentContainer>
          <NavigateTabs />

          <BridgeFormsSurface>
            <RedeemForm />
          </BridgeFormsSurface>
        </BridgeContentContainer>
      </Box>
    </BaseLayout>
  );
};
