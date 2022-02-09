import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from 'grommet';
import {
  Text,
  Divider,
  Button,
  DividerVertical,
  Checkbox,
} from 'components/Base';
import { observer } from 'mobx-react';
import {
  Form,
  isRequired,
  MobxForm,
  NumberInput,
  Select,
} from 'components/Form';
import {
  formatWithTwoDecimals,
  lessThanSat,
  moreThanZero,
} from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { VaultIssueSelectItem } from '../../../../components/VaultIssueSelectItem';
import { VaultInfo } from '../../../../containers/VaultInfo';
import { VaultStore } from '../../../../stores/VaultStore';
import utils from 'web3-utils';

type Props = Pick<IStores, 'issuePageStore'>;

export const IssueForm: React.FC<Props> = observer(() => {
  const {
    issuePageStore,
    vaultListStore,
    vaultStore,
    ratesStore,
    user,
  } = useStores();
  const [form, setForm] = useState<MobxForm>();
  const [isCustomVault, setCustomVault] = useState(false);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      issuePageStore.createIssue();
    });
  }, [form, issuePageStore]);

  useEffect(() => {
    issuePageStore.updateSelectedVault();
  }, [issuePageStore, issuePageStore.form.amount]);

  const activeVaultList = issuePageStore.getActiveVaultList(
    vaultListStore.vaultList,
  );

  const vaultOptions = useMemo(() => {
    return activeVaultList.map(vault => {
      return {
        text: <VaultIssueSelectItem vault={vault} />,
        value: vault.id,
      };
    });
  }, [activeVaultList]);

  const vault = vaultListStore.getVault(issuePageStore.form.vaultId);

  const vaultInfo = useMemo(() => {
    if (!vault) {
      return null;
    }

    return vaultStore.getVaultInfo(vault);
  }, [vault, vaultStore]);

  const amountValidator = useMemo(() => {
    if (!vaultInfo) {
      return undefined;
    }

    return lessThanSat(
      vaultInfo.availableToIssueSat.toString(),
      'issue amount exceeds vault balance',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issuePageStore, vaultStore, issuePageStore.form.vaultId]);

  const isFormDisabled = !user.isBridgeAvailable;

  const securityDeposit = useMemo(() => {
    if (!vault || !vault.collateral) {
      return 1;
    }

    return VaultStore.calcSecurityDeposit(
      Number(utils.fromWei(vault.collateral)),
    );
  }, [vault]);

  return (
    <Form ref={ref => setForm(ref)} data={issuePageStore.form}>
      <NumberInput
        label={`Amount`}
        name="amount"
        type="decimal"
        disabled={isFormDisabled}
        precision="8"
        delimiter="."
        max="9999999"
        renderRight={
          <Box direction="row" gap="8px">
            <Text>
              ≈ ${' '}
              {formatWithTwoDecimals(
                Number(issuePageStore.form.amount) * ratesStore.BTC_USDT,
              )}
            </Text>
            <DividerVertical />
            <Text bold>BTC</Text>
          </Box>
        }
        placeholder="0.0"
        style={{ width: '100%' }}
        rules={[isRequired, moreThanZero, amountValidator].filter(Boolean)}
      />

      {issuePageStore.form.vaultId && (
        <Box>
          <Box direction="row" align="center" justify="between">
            <Text size="large" bold>
              Vault
            </Text>
            <Checkbox
              disabled={isFormDisabled}
              label="I don't like this vault, let me select another"
              value={isCustomVault}
              onChange={setCustomVault}
            />
          </Box>
          {isCustomVault && (
            <Select
              name="vaultId"
              disabled={isFormDisabled || !isCustomVault}
              style={{ width: '100%' }}
              rules={[isRequired]}
              options={vaultOptions}
            />
          )}
          {!isCustomVault && (
            <Box pad={{ vertical: '12px' }}>
              <VaultIssueSelectItem vault={vault} />
            </Box>
          )}
        </Box>
      )}

      {vaultInfo && (
        <VaultInfo vault={vault} issued={issuePageStore.form.amount} />
      )}

      <Box
        direction="row"
        justify="between"
        margin={{ bottom: 'medium', top: 'medium' }}
        align="start"
      >
        <Text size="small" bold={true}>
          Bridge Fee {issuePageStore.bridgeRatio}%
        </Text>
        <PriceView
          value={issuePageStore.bridgeFee}
          rate={ratesStore.BTC_USDT}
          tokenName="BTC"
        />
      </Box>

      <Box
        direction="row"
        justify="between"
        margin={{ bottom: 'medium' }}
        align="start"
      >
        <Text size="small" bold={true}>
          Security Deposit
        </Text>
        <PriceView
          value={securityDeposit}
          rate={ratesStore.ONE_USDT}
          tokenName="ONE"
        />
      </Box>

      <Divider colorful fullwidth />

      <Box
        direction="row"
        justify="between"
        margin={{ vertical: 'medium' }}
        align="start"
      >
        <Text size="small" bold={true}>
          You will receive
        </Text>
        <PriceView
          value={issuePageStore.totalReceive}
          rate={ratesStore.BTC_USDT}
          tokenName="1BTC"
        />
      </Box>

      <Box direction="row" align="center" gap="small">
        <Button
          bgColor="#00ADE8"
          onClick={handleSubmit}
          transparent={false}
          disabled={isFormDisabled || issuePageStore.status === 'pending'}
          isLoading={issuePageStore.status === 'pending'}
        >
          Continue
        </Button>
        {isFormDisabled && (
          <Box>
            <Text color="red" bold>
              Issue temporarily disabled
            </Text>
          </Box>
        )}
      </Box>
    </Form>
  );
});

export default IssueForm;
