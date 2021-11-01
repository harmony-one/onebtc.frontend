import React from 'react';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Divider, Text, Title } from '../../components/Base';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { TransactionListIssuesTable } from './components/TransactionListIssuesTable';
import { TransactionListRedeemTable } from './components/TransactionListRedeemTable';
import { useStores } from '../../stores';

type Props = {};

export const TransactionsPage: React.FC<Props> = observer(() => {
  const { user } = useStores();

  if (!user.isAuthorized) {
    return (
      <BaseContainer>
        <PageContainer>
          <Box align="center" justify="center">
            <Text>You have not connected wallet</Text>
          </Box>
        </PageContainer>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <PageContainer>
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
      </PageContainer>
    </BaseContainer>
  );
});

TransactionsPage.displayName = 'DashboardPage';
