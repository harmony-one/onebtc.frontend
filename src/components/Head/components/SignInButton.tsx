import React from 'react';
import { WalletButton } from '../../../pages/OneBTC/WalletButton';
import { Box } from 'grommet';
import { Icon } from '../../Base';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';

type Props = {};

export const SignInButton: React.FC<Props> = observer(({ children }) => {
  const { user } = useStores();

  const isTestNetChain = user.metamaskChainId !== 1666700000;

  const chainIdError = isTestNetChain && 'Please connect to harmony testnet';
  return (
    <>
      {!user.isAuthorized && (
        <WalletButton
          onClick={() => {
            user.signInMetamask();
          }}
          error={user.error}
        >
          <img src="/metamask.svg" style={{ marginRight: 15, height: 22 }} />
          Sign in by Metamask
        </WalletButton>
      )}
      {user.isAuthorized && (
        <WalletButton
          onClick={() => {
            user.signOut();
          }}
          error={user.error || chainIdError}
        >
          <img src="/metamask.svg" style={{ marginRight: 15, height: 22 }} />
          Metamask
          <Box pad={{ left: 'small' }}>
            <Icon
              glyph="Logout"
              size="24px"
              style={{ opacity: 0.5 }}
              color="BlackTxt"
            />
          </Box>
        </WalletButton>
      )}
    </>
  );
});

SignInButton.displayName = 'SignInButton';
