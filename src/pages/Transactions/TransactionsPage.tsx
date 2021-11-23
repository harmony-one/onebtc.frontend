import React from 'react';
import { Divider, Text, Title } from '../../components/Base';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { TransactionListIssuesTable } from './components/TransactionListIssuesTable';
import { TransactionListRedeemTable } from './components/TransactionListRedeemTable';
import { useStores } from '../../stores';
import { BaseLayout } from '../../components/Layouts/BaseLayout';

type Props = {};

export const TransactionsPage: React.FC<Props> = observer(() => {
  const { user } = useStores();

  if (!user.isAuthorized) {
    return (
      <BaseLayout>
        <Box align="center" justify="center">
          <Text>You have not connected wallet</Text>
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Box gap="small" pad={{ horizontal: 'xlarge' }}>
        <Box>
          <Title align="center">My Issue requests</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
        <Box>
          <TransactionListIssuesTable />
        </Box>
        <Box>
          <Title align="center">My Redeem requests</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
        <Box>
          <TransactionListRedeemTable />
        </Box>
      </Box>
    </BaseLayout>
  );
});

TransactionsPage.displayName = 'DashboardPage';
