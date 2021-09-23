import React from 'react';
import { RedeemDetailsModalContent } from './RedeemDetailsModalContent';

export const RedeemDetailsModal = props => {
  const { transactionHash } = props.actionData.data;

  return <RedeemDetailsModalContent redeemTxHash={transactionHash} />;
};

RedeemDetailsModal.displayName = 'RedeemDetailsModal';
