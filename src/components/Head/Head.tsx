import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { Box, BoxProps } from 'grommet';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { IStyledChildrenProps } from 'interfaces';
import { NavLink } from 'react-router-dom';
import { Title, Text } from '../Base';
import { SignInButton } from './components/SignInButton';
import { HeadBalance } from './components/HeadBalance';
import { routes } from '../../constants/routes';
import * as s from './styles.styl';
import { config } from '../../config';
import { FaucetButtons } from './components/FaucetButtons';

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
        direction="row"
        align="center"
        justify="end"
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
        <Box direction="row" align="center" gap="xsmall">
          <HeadBalance />
          {config.isTestnet && <FaucetButtons />}
          <SignInButton />
        </Box>
      </Box>
    );
  }),
);

Head.displayName = 'Head';
