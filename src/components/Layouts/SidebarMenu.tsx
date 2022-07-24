import React, { useCallback, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { useStores } from '../../stores';
import { ROUTE_NAMES, router, routes } from '../../constants/routePaths';
import { SideBarButton } from './SideBarButton';
import {
  BarChart,
  Cube,
  Iteration,
  PowerCycle,
  StatusUnknown,
  Support,
  Login,
  Logout
} from 'grommet-icons';
import { Box, ResponsiveContext } from 'grommet';
import { observer } from 'mobx-react';
import {
  formatWithEightDecimals,
  formatWithTwoDecimals,
  ones,
} from '../../utils';
import { Text } from '../Base';
import { satoshiToBitcoin } from '../../services/bitcoin';


interface Props {}

export const SidebarMenu: React.FC<Props> = observer(() => {
  const route = useRouteMatch();

  const { routing, user } = useStores();

  const routeName = router.findRouteNameByPath(route.path);

  const navigateToRoute = (routePath: string) => () => {
    routing.goTo(routePath);
  };

  const hasVault = !!user.vault;

  const handleOpenModal = useCallback(() => {
    user.openConnectWalletModal();
  }, [user]);

  const handleSignOut = useCallback(() => {
    user.signOut();
  }, [user]);

  const btcAmount = satoshiToBitcoin(user.oneBTCBalance);
  const size = useContext(ResponsiveContext);

  const isMobileSize = size === 'small';

  return (
    <Box gap="xsmall">
      <SideBarButton
        label="Bridge"
        active={router.isBelongsTo(ROUTE_NAMES.BRIDGE, routeName)}
        onClick={navigateToRoute(routes['redeem-harmony'])}
        icon={<PowerCycle />}
      />
      <SideBarButton
        label="My transactions"
        active={router.isBelongsTo(ROUTE_NAMES.TRANSACTIONS, routeName)}
        onClick={navigateToRoute(routes.transactions)}
        icon={<Iteration />}
      />
      {hasVault && (
        <SideBarButton
          label="My vault"
          active={router.isBelongsTo(ROUTE_NAMES.MY_VAULT, routeName)}
          onClick={navigateToRoute(routes.myVault)}
          icon={<Cube />}
        />
      )}
      <SideBarButton
        label="Dashboard"
        active={router.isBelongsTo(ROUTE_NAMES.DASHBOARD, routeName)}
        onClick={navigateToRoute(routes.dashboard)}
        icon={<BarChart />}
      />
      <SideBarButton
        label="Help"
        active={router.isBelongsTo(ROUTE_NAMES.HELP, routeName)}
        onClick={navigateToRoute(routes.help)}
        icon={<StatusUnknown />}
      />
      <SideBarButton
        label="Support"
        active={router.isBelongsTo(ROUTE_NAMES.SUPPORT, routeName)}
        onClick={navigateToRoute(routes.support)}
        icon={<Support />}
      />

      {!user.isAuthorized && isMobileSize && (
        <SideBarButton
          label="Connect Wallet"
          onClick={handleOpenModal}
          icon={<Login />}
        >
          Connect wallet
        </SideBarButton>
      )}
      {user.isAuthorized && isMobileSize && (
       <><SideBarButton
          label="Logout"
          onClick={handleSignOut}
          icon={<Logout />}
        >
          Logout
        </SideBarButton>
            <Box direction="column" justify="center" align="center">
              <Text size="medium" bold>Wallet Balances</Text>
              <Text size="small">{user.address}</Text>
            <Box direction="row">
              <Text size="small" bold>
                {formatWithTwoDecimals(ones(user.balance))}
              </Text>
              <Text size="small">&nbsp;&nbsp;ONE</Text>
            </Box>
            <Box direction="row">
              <Text size="small" bold>
                {formatWithEightDecimals(btcAmount)}
              </Text>
              <Text size="small">&nbsp;1BTC</Text>
            </Box>
          </Box></>
      )}
    </Box>
  );
});

SidebarMenu.displayName = 'SidebarMenu';
