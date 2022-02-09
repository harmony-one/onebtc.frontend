import React, { useCallback } from 'react';
import { useStores } from '../stores';
import { Button } from '../components/Base';

interface Props {}

export const AddToMetamaskButton: React.FC<Props> = () => {
  const { user } = useStores();

  const handleAdd = useCallback(() => {
    user.addTokenToMetamask();
  }, [user]);

  return (
    <Button bgColor="#46d7b6" onClick={handleAdd}>
      Add 1BTC to MetaMask
    </Button>
  );
};

AddToMetamaskButton.displayName = 'AddToMetamaskButton';
