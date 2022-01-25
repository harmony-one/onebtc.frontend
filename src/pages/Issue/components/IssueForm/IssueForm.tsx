import React, { useCallback, useMemo, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button, DividerVertical } from 'components/Base';
import { observer } from 'mobx-react';
import {
  Form,
  isRequired,
  MobxForm,
  NumberInput,
  Select,
} from 'components/Form';
import {
  formatWithEightDecimals,
  formatWithTwoDecimals,
  lessThanSat,
  moreThanZero,
} from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { cutText } from '../../../../services/cutText';
import { satoshiToBitcoin } from '../../../../services/bitcoin';
import { VaultStatusDot } from '../../../../components/Dashboard/VaultStatus';

type Props = Pick<IStores, 'issuePageStore'>;

export const IssueForm: React.FC<Props> = observer(() => {
  const { issuePageStore, vaultStore, ratesStore } = useStores();
  const [form, setForm] = useState<MobxForm>();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      issuePageStore.createIssue();
    });
  }, [form, issuePageStore]);

  const vaultOptions = useMemo(() => {
    return issuePageStore.vaultActiveList.map(vault => {
      const name = cutText(vault.id);
      const vaultInfo = vaultStore.getVaultInfo(vault);
      return {
        text: (
          <Box direction="row" gap="xxsmall" align="center">
            <VaultStatusDot isActive={vaultInfo.isActive} />
            <Text>{name}: </Text>
            <Text bold>
              {formatWithEightDecimals(
                satoshiToBitcoin(vaultInfo.availableToIssueSat.toString()),
              )}
            </Text>
            <Text> 1BTC</Text>
          </Box>
        ),
        value: vault.id,
      };
    });
  }, [issuePageStore.vaultActiveList, vaultStore]);

  const amountValidator = useMemo(() => {
    const vault = issuePageStore.getVault(issuePageStore.form.vaultId);
    if (!vault) {
      return undefined;
    }
    const vaultInfo = vaultStore.getVaultInfo(vault);

    return lessThanSat(
      vaultInfo.availableToIssueSat.toString(),
      'redeem amount exceeds vault balance',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issuePageStore, vaultStore, issuePageStore.form.vaultId]);

  const isFormDisabled = true;

  return (
    <Form ref={ref => setForm(ref)} data={issuePageStore.form}>
      <NumberInput
        label={`Amount`}
        name="amount"
        type="decimal"
        disabled={isFormDisabled}
        precision="8"
        delimiter="."
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

      {issuePageStore.defaultVaultId && (
        <Select
          label="Vault"
          name="vaultId"
          disabled={true}
          style={{ width: '100%' }}
          rules={[isRequired]}
          options={vaultOptions}
          defaultValue={issuePageStore.defaultVaultId}
        />
      )}

      <Box
        direction="row"
        justify="between"
        margin={{ bottom: 'medium' }}
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
        <PriceView value={1} rate={ratesStore.ONE_USDT} tokenName="ONE" />
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
              Issue temporary disabled
            </Text>
          </Box>
        )}
      </Box>
    </Form>
  );
});

export default IssueForm;
