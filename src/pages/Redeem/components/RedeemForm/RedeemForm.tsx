import React, { useCallback, useMemo, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button, DividerVertical } from 'components/Base';
import { observer } from 'mobx-react';
import {
  Form,
  isRequired,
  NumberInput,
  Input,
  Select,
  MobxForm,
} from 'components/Form';
import {
  formatWithSixDecimals,
  lessThanSat,
  moreThanZero,
} from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { cutText } from '../../../../services/cutText';
import { satoshiToBitcoin } from '../../../../services/bitcoin';
import { VaultStatusDot } from '../../../../components/Dashboard/VaultStatus';

type Props = Pick<IStores, 'issuePageStore'>;

export const RedeemForm: React.FC<Props> = observer(() => {
  const { redeemPageStore, user, btcNodeStore, vaultStore } = useStores();
  const [form, setForm] = useState<MobxForm>();

  const vaultOptions = useMemo(() => {
    return redeemPageStore.vaultList.map(vault => {
      const name = cutText(vault.id);
      const vaultInfo = vaultStore.getVaultInfo(vault);
      const maxRedeemAmount = vaultInfo.availableToRedeem - btcNodeStore.fee;
      return {
        text: (
          <Box direction="row" gap="xxsmall" align="center">
            <VaultStatusDot isActive={vaultInfo.isActive} />
            <Text>{name}: </Text>
            <Text bold>
              {formatWithSixDecimals(satoshiToBitcoin(maxRedeemAmount))}
            </Text>
            <Text> 1BTC</Text>
          </Box>
        ),
        value: vault.id,
      };
    });
  }, [btcNodeStore.fee, redeemPageStore.vaultList, vaultStore]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      redeemPageStore.createRedeem();
    });
  }, [form, redeemPageStore]);

  const amountValidator = useMemo(() => {
    const vault = redeemPageStore.getVault(redeemPageStore.form.vaultId);
    if (!vault) {
      return undefined;
    }
    const vaultInfo = vaultStore.getVaultInfo(vault);

    return lessThanSat(
      vaultInfo.availableToRedeem,
      'redeem amount exceeds vault balance',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redeemPageStore, vaultStore, redeemPageStore.form.vaultId]);

  return (
    <Form ref={ref => setForm(ref)} data={redeemPageStore.form}>
      <NumberInput
        label="Amount"
        name="oneBTCAmount"
        type="decimal"
        precision="6"
        delimiter="."
        placeholder="0.0"
        renderRight={
          <Box direction="row" gap="xxsmall">
            <DividerVertical />
            <Text bold>1BTC</Text>
          </Box>
        }
        style={{ width: '100%' }}
        rules={[
          isRequired,
          moreThanZero,
          lessThanSat(user.oneBTCBalance, `redeem amount exceeds balance`),
          amountValidator,
        ].filter(Boolean)}
      />

      <Input
        label="BTC Address"
        name="bitcoinAddress"
        type="string"
        precision="6"
        placeholder="Enter your BTC address"
        style={{ width: '100%' }}
        rules={[isRequired]}
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
          value={redeemPageStore.bridgeFee}
          rate={user.btcRate}
          boxProps={{ pad: {} }}
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
          Bitcoin Network Fee
        </Text>
        <PriceView
          value={satoshiToBitcoin(btcNodeStore.fee)}
          rate={user.btcRate}
          boxProps={{ pad: {} }}
          tokenName="BTC"
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
          value={redeemPageStore.totalReceived}
          rate={user.btcRate}
          boxProps={{ pad: {} }}
          tokenName="BTC"
        />
      </Box>

      <Box>
        <Button
          bgColor="#00ADE8"
          onClick={handleSubmit}
          transparent={false}
          disabled={redeemPageStore.status === 'pending'}
          isLoading={redeemPageStore.status === 'pending'}
        >
          Continue
        </Button>
      </Box>
    </Form>
  );
});

export default RedeemForm;
