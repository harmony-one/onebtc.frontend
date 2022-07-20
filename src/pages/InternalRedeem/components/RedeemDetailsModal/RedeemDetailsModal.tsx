import React from 'react';
import { RedeemDetailsModalContent } from './RedeemDetailsModalContent';

export const RedeemDetailsModal = props => {
  const { redeemId } = props.actionData.data;

  return <RedeemDetailsModalContent redeemId={redeemId} />;
};

RedeemDetailsModal.displayName = 'RedeemDetailsModal';
