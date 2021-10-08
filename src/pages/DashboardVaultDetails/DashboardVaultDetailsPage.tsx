import React, { useEffect, useMemo } from 'react';
import { Divider, Title, Text } from '../../components/Base';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Box, DataChart } from 'grommet';
import { useStores } from '../../stores';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { VaultInfo } from './components/VaultInfo';
import { VaultActions } from './components/VaultActions/VaultActions';
import { Paper } from '../../components/Paper';

interface Props {}

const data = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2021-10-${((i % 30) + 1).toString().padStart(2, '0')}`,
    amount: Math.round(Math.abs(v * 10)),
  });
}

export const DashboardVaultDetailsPage: React.FC<Props> = observer(() => {
  const { vaultStore, user } = useStores();

  const { vaultId } = useParams<{ vaultId: string }>();

  const vault = vaultStore.vaultMap[vaultId];

  useEffect(() => {
    vaultStore.loadVault(vaultId);
  }, [vaultId, vaultStore]);

  const isOwner = useMemo(() => {
    if (!vault || !user.address) {
      return false;
    }

    return vault.id.toLowerCase() === user.address.toLowerCase();
  }, [vault, user]);

  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
          <Box gap="small">
            <Title align="center">Vault Details</Title>
            <Divider colorful fullwidth />
          </Box>
          <Box gap="medium">
            <Box
              direction="row-responsive"
              responsive
              gap="medium"
              alignContent="stretch"
              pad={{ horizontal: 'xlarge' }}
            >
              <Box basis="1/2">
                <Paper>{vault && <VaultInfo vaultId={vaultId} />}</Paper>
              </Box>
              <Box basis="1/2">
                <Paper>
                  <Box gap="small">
                    <Text size="medium" bold align="center">
                      Total locked:
                    </Text>
                    <DataChart
                      data={data}
                      pad="none"
                      series={['date', 'amount']}
                      axis={{
                        x: { granularity: 'fine' },
                        y: false,
                      }}
                      chart={[
                        {
                          property: 'amount',
                          thickness: 'hair',
                          type: 'line',
                          color: '#47b8eb',
                        },
                        {
                          property: 'amount',
                          thickness: 'xsmall',
                          type: 'point',
                          point: 'circle',
                        },
                      ]}
                      guide={{
                        x: { granularity: 'fine' },
                        y: { granularity: 'fine' },
                      }}
                      size={{ width: 'fill' }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
          {isOwner && (
            <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
              <Title align="center">Vault owner actions</Title>
              <Divider colorful fullwidth />
              <Box align="center">
                <VaultActions />
              </Box>
            </Box>
          )}
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});

DashboardVaultDetailsPage.displayName = 'DashboardVaultDetailsPage';
