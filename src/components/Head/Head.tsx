import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { Box, BoxProps } from 'grommet';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { IStyledChildrenProps } from 'interfaces';
import { NavLink } from 'react-router-dom';
import { Title, Text, Button } from '../Base';
import { SignInButton } from './components/SignInButton';
import { HeadBalance } from './components/HeadBalance';
import { routes } from '../../constants/routes';
import { Share } from 'grommet-icons';
import * as s from './styles.styl';

const MainLogo = styled.img`
  width: auto;
  height: 32px;
  margin-bottom: 4px;
`;

export const Head: React.FC<IStyledChildrenProps<BoxProps>> = withTheme(
  observer(({ theme }: IStyledChildrenProps<BoxProps>) => {
    const { palette, container } = theme;
    const { minWidth, maxWidth } = container;

    return (
      <Box
        style={{
          background: palette.StandardWhite,
          // background: '#f6f7fb',
          overflow: 'visible',
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 100,
          // boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          direction="row"
          align="center"
          justify="between"
          style={{
            minWidth,
            maxWidth,
            margin: '0 auto',
            padding: '0px 30px',
            height: 100,
            minHeight: 100,
            width: '100%',
          }}
        >
          <Box direction="row" align="center">
            <Box align="center" margin={{ right: 'small' }}>
              <MainLogo src="/one.svg" />
            </Box>
            <Box>
              <Title size="medium" color="BlackTxt" bold>
                1BTC by Harmony
              </Title>
            </Box>
          </Box>
          <Box direction="row" gap="xxsmall">
            <NavLink className={s.link} to={routes.bridge}>
              <Box className={cn(s.item)}>
                <Text>Bridge</Text>
              </Box>
            </NavLink>
            <NavLink to={routes.transactions}>
              <Box className={cn(s.item)}>
                <Text>My Transactions</Text>
              </Box>
            </NavLink>
            <NavLink className={s.link} to={routes.dashboard}>
              <Box className={cn(s.item)}>
                <Text>Dashboard</Text>
              </Box>
            </NavLink>
          </Box>

          <Box direction="row" align="center" gap="small">
            <HeadBalance />
            <Button
              bordered
              color="Orange"
              style={{ borderColor: 'Orange' }}
              transparent
              fontSize="14px"
              onClick={() => {
                window.open('https://testnet-faucet.mempool.co/', '_blank');
              }}
            >
              BTC Faucet&nbsp;
              <Share color="Orange" size="small" />
            </Button>
            <SignInButton />
          </Box>
        </Box>
      </Box>
    );
  }),
);

Head.displayName = 'Head';
