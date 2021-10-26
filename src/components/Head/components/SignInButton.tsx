import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Button } from '../../Base';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { ConnectWalletModal } from './ConnectWalletModal';

export const SignInButton: React.FC = observer(() => {
  const { user, actionModals } = useStores();

  const handleOpenModal = useCallback(() => {
    actionModals.open(ConnectWalletModal, {
      applyText: '',
      closeText: '',
      initData: {},
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }, [actionModals]);

  const handleSignOut = useCallback(() => {
    user.signOut();
  }, [user]);

  return (
    <Box>
      {!user.isAuthorized && (
        <Button fontSize="16px" onClick={handleOpenModal}>
          Connect wallet
        </Button>
      )}
      {user.isAuthorized && (
        <Button bordered transparent fontSize="16px" onClick={handleSignOut}>
          Logout
        </Button>
      )}
    </Box>
  );
});

SignInButton.displayName = 'SignInButton';
