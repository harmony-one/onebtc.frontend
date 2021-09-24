import React from 'react';
import { IssueDetailsModalContent } from './IssueDetailsModalContent';
import { TActionModalProps } from '../../../../components/ActionModals';

export const IssueDetailsModal: React.FC<TActionModalProps> = props => {
  const { transactionHash } = props.actionData.data;

  return <IssueDetailsModalContent issueTxHash={transactionHash} />;
};

IssueDetailsModal.displayName = 'IssueDetailsModal';
