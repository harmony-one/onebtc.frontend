import React from 'react';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { Box } from 'grommet';
import { Link } from 'react-router-dom';
import { generatePath } from 'react-router';
import { routes } from '../constants/routePaths';
import { observer } from 'mobx-react';

interface Props {
  vault: IVault;
  issued: string;
}

export const VaultInfo: React.FC<Props> = observer(({ vault }) => {
  return (
    <Box direction="row" justify="between" margin={{ bottom: 'medium' }}>
      <Box>
        <Link
          to={generatePath(routes.dashboardVaultDetails, {
            vaultId: vault.id,
          })}
        >
          Vault Details
        </Link>
      </Box>
    </Box>
  );
});

VaultInfo.displayName = 'VaultInfo';
