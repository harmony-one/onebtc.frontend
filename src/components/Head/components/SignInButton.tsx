import React from 'react';
import { WalletButton } from '../../WalletButton';
import { Box } from 'grommet';
import { Icon } from '../../Base';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { config } from '../../../config';

export const SignInButton: React.FC = observer(() => {
  const { user } = useStores();

  const isTestNetChain = user.metamaskChainId !== 1666700000;

  const chainIdError =
    user.sessionType === 'metamask' &&
    isTestNetChain &&
    'Please connect to harmony testnet';
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
      {config.wallets.onewallet && !user.isAuthorized && (
        <WalletButton
          onClick={() => {
            user.signInOneWallet();
          }}
          error={user.error}
        >
          <img src="/one.svg" style={{ marginRight: 15, height: 22 }} />
          Sign in by OneWallet
        </WalletButton>
      )}
      {config.wallets.onewallet &&
        user.isAuthorized &&
        user.sessionType === 'onewallet' && (
          <WalletButton
            onClick={() => {
              user.signOut();
            }}
            error={user.error || chainIdError}
          >
            <img src="/one.svg" style={{ marginRight: 15, height: 22 }} />
            OneWallet
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
      {user.isAuthorized && user.sessionType === 'metamask' && (
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
