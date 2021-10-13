import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { LargeTab } from '../../../components/LargeTab/LargeTab';
import { VaultBalances } from './VaultBalances/VaultBalances';
import { VaultIssueTable } from './VaultIssues/VaultIssueTable';
import { VaultRedeemTable } from './VaultRedeems/VaultRedeemTable';

interface Props {
  vaultId: string;
}

enum Tabs {
  BALANCES = 'balances',
  ISSUES = 'issues',
  REDEEMS = 'redeems',
}

export const VaultLogs: React.FC<Props> = ({ vaultId }) => {
  const [tab, setTab] = useState<Tabs>(Tabs.BALANCES);

  const handleTabClick = useCallback(tabId => {
    setTab(tabId);
  }, []);

  const isActive = useCallback(
    currentTab => {
      return tab === currentTab;
    },
    [tab],
  );

  return (
    <Box gap="small">
      <Box direction="row">
        <Box direction="row" basis="medium" gap="small">
          <LargeTab
            id={Tabs.BALANCES}
            title="Balances"
            active={isActive(Tabs.BALANCES)}
            onClick={handleTabClick}
          />
          <LargeTab
            id={Tabs.ISSUES}
            title="Issues"
            active={isActive(Tabs.ISSUES)}
            onClick={handleTabClick}
          />
          <LargeTab
            id={Tabs.REDEEMS}
            title="Redeems"
            active={isActive(Tabs.REDEEMS)}
            onClick={handleTabClick}
          />
        </Box>
      </Box>
      <Box>
        {tab === Tabs.BALANCES && <VaultBalances vaultId={vaultId} />}
        {tab === Tabs.ISSUES && <VaultIssueTable vaultId={vaultId} />}
        {tab === Tabs.REDEEMS && <VaultRedeemTable vaultId={vaultId} />}
      </Box>
    </Box>
  );
};

VaultLogs.displayName = 'VaultLogs';
