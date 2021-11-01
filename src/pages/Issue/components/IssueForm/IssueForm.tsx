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
import { formatWithSixDecimals, moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { cutText } from '../../../../services/cutText';
import { getVaultInfo } from '../../../../modules/dashboard/vaultHelpers';
import { satoshiToBitcoin } from '../../../../services/bitcoin';
import { VaultStatusDot } from '../../../../components/Dashboard/VaultStatus';

type Props = Pick<IStores, 'issuePageStore'>;

export const IssueForm: React.FC<Props> = observer(() => {
  const { issuePageStore, user } = useStores();
  const [form, setForm] = useState<MobxForm>();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      issuePageStore.createIssue();
    });
  }, [form, issuePageStore]);

  const vaultOptions = useMemo(() => {
    return issuePageStore.getVaultList().map(vault => {
      const name = cutText(vault.id);
      const vaultInfo = getVaultInfo(vault);
      return {
        text: (
          <Box direction="row" gap="xxsmall" align="center">
            <VaultStatusDot isActive={vaultInfo.isActive} />
            <Text>{name}: </Text>
            <Text bold>
              {formatWithSixDecimals(
                satoshiToBitcoin(vaultInfo.availableAmountSat),
              )}
            </Text>
            <Text> OneBTC</Text>
          </Box>
        ),
        value: vault.id,
      };
    });
  }, [issuePageStore.vaultList]);

  return (
    <Form ref={ref => setForm(ref)} data={issuePageStore.form}>
      <NumberInput
        label={`Amount`}
        name="amount"
        type="decimal"
        precision="6"
        delimiter="."
        renderRight={
          <Box direction="row" gap="xxsmall">
            <DividerVertical />
            <Text bold>BTC</Text>
          </Box>
        }
        placeholder="0.0"
        style={{ width: '100%' }}
        rules={[isRequired, moreThanZero]}
      />

      <Select
        label="Vault identity"
        name="vaultId"
        style={{ width: '100%' }}
        rules={[isRequired]}
        options={vaultOptions}
      />

      <Box
        direction="row"
        justify="between"
        margin={{ bottom: 'medium' }}
        align="start"
      >
        <Text size="small" bold={true}>
          Bridge Fee
        </Text>
        <PriceView
          value={issuePageStore.bridgeFee}
          rate={user.btcRate}
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
          value={1}
          rate={user.oneRate}
          boxProps={{ pad: {} }}
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
          rate={user.btcRate}
          boxProps={{ pad: {} }}
          tokenName="OneBTC"
        />
      </Box>

      <Box>
        <Button
          bgColor="#00ADE8"
          onClick={handleSubmit}
          transparent={false}
          disabled={issuePageStore.status === 'pending'}
          isLoading={issuePageStore.status === 'pending'}
        >
          Continue
        </Button>
      </Box>
    </Form>
  );
});

export default IssueForm;
