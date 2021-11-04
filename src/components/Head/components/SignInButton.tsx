import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Button } from '../../Base';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';

export const SignInButton: React.FC = observer(() => {
  const { user } = useStores();

  const handleOpenModal = useCallback(() => {
    user.openConnectWalletModal();
  }, [user]);

  const handleSignOut = useCallback(() => {
    user.signOut();
  }, [user]);

  return (
    <Box>
      {!user.isAuthorized && (
        <Button
          fontSize="16px"
          style={{ padding: '10px' }}
          onClick={handleOpenModal}
        >
          Connect wallet
        </Button>
      )}
      {user.isAuthorized && (
        <Button
          bordered
          style={{ padding: '10px' }}
          transparent
          fontSize="16px"
          onClick={handleSignOut}
        >
          Logout
        </Button>
      )}
    </Box>
  );
});

SignInButton.displayName = 'SignInButton';
