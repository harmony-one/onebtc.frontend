import React, { useCallback } from 'react';
import { LargeTab } from './LargeTab/LargeTab';
import { Box } from 'grommet';
import { useStores } from '../stores';
import { useRouteMatch } from 'react-router';

type Props = {};

export const NavigateTabs: React.FC<Props> = ({ children }) => {
  const { routing } = useStores();

  const handleNavigate = (route: string) => () => {
    routing.push(`${route}`, {});
  };

  const { path } = useRouteMatch();

  const isActive = (path1: string, path2: string) => {
    return path1 === path2;
  };

  return (
    <Box
      fill
      direction="row"
      justify="between"
      gap="medium"
      margin={{ bottom: 'large' }}
    >
      <LargeTab
        title="Issue"
        onClick={handleNavigate('/bridge/issue')}
        active={isActive(path, '/bridge/issue')}
      />
      <LargeTab
        title="Redeem"
        onClick={handleNavigate('/bridge/redeem')}
        active={isActive(path, '/bridge/redeem')}
      />
      <LargeTab
        title="Transfer"
        onClick={handleNavigate('/bridge/transfer')}
        active={isActive(path, '/bridge/transfer')}
      />
      <LargeTab title="Burn" onClick={handleNavigate('/burn')} disabled />
    </Box>
  );
};
