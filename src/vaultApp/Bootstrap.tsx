import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores';

interface Props {}

export const Bootstrap: React.FC<Props> = observer(() => {
  const { vaultAppStore } = useStores().vaultApp;

  useEffect(() => {
    vaultAppStore.bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
});

Bootstrap.displayName = 'Bootstrap';
