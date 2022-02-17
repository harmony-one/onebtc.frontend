import React, { useCallback, useEffect } from 'react';
import { useStores } from '../../stores';
import { useParams } from 'react-router';

interface Props {}

export const IssueModal: React.FC<Props> = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const { issuePageStore, routing } = useStores();

  const handleModalClose = useCallback(() => {
    routing.goBack();
  }, [routing]);

  useEffect(() => {
    issuePageStore.openIssueDetailsModal(issueId, handleModalClose);
  }, [issuePageStore, issueId, handleModalClose]);

  return null;
};

IssueModal.displayName = 'IssueModal';
