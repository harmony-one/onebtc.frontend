import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { ModalHeader } from '../../ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../ActionModals';
import { Divider, Icon } from '../../Base';
import { WalletButton } from '../../WalletButton';
import { useStores } from '../../../stores';
import { config } from '../../../config';

export const ConnectWalletModal: React.FC<TActionModalProps> = props => {
  const { user } = useStores();
  const isTestNetChain = user.metamaskChainId !== 1666700000;

  const chainIdError =
    user.sessionType === 'metamask' &&
    isTestNetChain &&
    'Please connect to harmony testnet';

  const handleCloseModal = useCallback(() => {
    props.config.options.onClose();
  }, [props.config.options]);

  return (
    <Box pad="medium" gap="small">
      <ModalHeader
        title="Connect Wallet"
        onClose={props.config.options.onClose}
      />
      <Divider fullwidth colorful />
      <Box gap="small">
        {!user.isAuthorized && (
          <WalletButton
            onClick={() => {
              user.signInMetamask().then(() => handleCloseModal());
            }}
            error={user.error}
          >
            <img src="/metamask.svg" style={{ marginRight: 15, height: 22 }} />
            Sign in by Metamask
          </WalletButton>
        )}
        {/*{config.wallets.onewallet && !user.isAuthorized && (*/}
        {/*  <WalletButton*/}
        {/*    onClick={() => {*/}
        {/*      user.signInOneWallet().then(() => handleCloseModal());*/}
        {/*    }}*/}
        {/*    error={user.error}*/}
        {/*  >*/}
        {/*    <img src="/one.svg" style={{ marginRight: 15, height: 22 }} />*/}
        {/*    Sign in by OneWallet*/}
        {/*  </WalletButton>*/}
        {/*)}*/}
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
      </Box>
    </Box>
  );
};

ConnectWalletModal.displayName = 'ConnectWalletModal';
