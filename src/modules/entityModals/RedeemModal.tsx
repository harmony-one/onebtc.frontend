import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useStores } from '../../stores';

interface Props {}

export const RedeemModal: React.FC<Props> = () => {
  const { redeemId } = useParams<{ redeemId: string }>();
  const { redeemPageStore, routing } = useStores();

  const handleModalClose = useCallback(() => {
    routing.goBack();
  }, [routing]);

  useEffect(() => {
    redeemPageStore.openRedeemDetailsModal(redeemId, handleModalClose);
  }, [redeemPageStore, redeemId, handleModalClose]);

  return null;
};

RedeemModal.displayName = 'RedeemModal';
