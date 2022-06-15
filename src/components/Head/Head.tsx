import * as React from 'react';
import { withTheme } from 'styled-components';
import { Box, BoxProps } from 'grommet';
import { observer } from 'mobx-react-lite';
import { IStyledChildrenProps } from '../../interfaces';
import { SignInButton } from './components/SignInButton';
import { HeadBalance } from './components/HeadBalance';
import { config } from '../../config';
import { FaucetButtons } from './components/FaucetButtons';
import { ThemeButton } from '../ThemeButton';

export const Head: React.FC<IStyledChildrenProps<BoxProps>> = withTheme(
  observer(({ theme }: IStyledChildrenProps<BoxProps>) => {
    const { container } = theme;
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
          <ThemeButton />
          <HeadBalance />
          {config.isTestnet && <FaucetButtons />}
          <SignInButton />
        </Box>
      </Box>
    );
  }),
);

Head.displayName = 'Head';
