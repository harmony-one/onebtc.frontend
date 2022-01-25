import React, { useCallback, useState } from 'react';
import { Divider, Text, Title } from '../../components/Base';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { TransactionListIssuesTable } from './components/TransactionListIssuesTable';
import { TransactionListRedeemTable } from './components/TransactionListRedeemTable';
import { useStores } from '../../stores';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { LargeTab } from '../../components/LargeTab/LargeTab';

type Props = {};

enum Tabs {
  ISSUES = 'issues',
  REDEEMS = 'redeems',
}

export const TransactionsPage: React.FC<Props> = observer(() => {
  const { user } = useStores();

  const [activeTab, setActiveTab] = useState(Tabs.ISSUES);

  const isActiveTab = useCallback(
    currentTab => {
      return activeTab === currentTab;
    },
    [activeTab],
  );

  const handleTabClick = useCallback(tabId => {
    setActiveTab(tabId);
  }, []);

  if (!user.isAuthorized) {
    return (
      <BaseLayout>
        <Box align="center" justify="center">
          <Text>You have not connected your wallet</Text>
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Box gap="medium">
        <Box>
          <Title align="center">My transactions</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
        <Box direction="row" width="medium" gap="small">
          <LargeTab
            id={Tabs.ISSUES}
            title="Issues"
            onClick={handleTabClick}
            active={isActiveTab(Tabs.ISSUES)}
          />
          <LargeTab
            id={Tabs.REDEEMS}
            title="Redeems"
            onClick={handleTabClick}
            active={isActiveTab(Tabs.REDEEMS)}
          />
        </Box>
        <Box>
          {activeTab === Tabs.ISSUES && <TransactionListIssuesTable />}
          {activeTab === Tabs.REDEEMS && <TransactionListRedeemTable />}
        </Box>
      </Box>
    </BaseLayout>
  );
});

TransactionsPage.displayName = 'DashboardPage';
