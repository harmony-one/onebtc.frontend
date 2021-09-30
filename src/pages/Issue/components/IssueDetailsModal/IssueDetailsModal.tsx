import React from 'react';
import { IssueDetailsModalContent } from './IssueDetailsModalContent';
import { TActionModalProps } from '../../../../components/ActionModals';

export const IssueDetailsModal: React.FC<TActionModalProps> = props => {
  const { issueId } = props.actionData.data;

  return <IssueDetailsModalContent issueId={issueId} />;
};

IssueDetailsModal.displayName = 'IssueDetailsModal';
