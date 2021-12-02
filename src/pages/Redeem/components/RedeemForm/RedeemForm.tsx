import React, { useCallback, useMemo, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button } from 'components/Base';
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
  formatWithEightDecimals,
  lessThanSat,
  moreThanZero,
} from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { cutText } from '../../../../services/cutText';
import { satoshiToBitcoin } from '../../../../services/bitcoin';
import { VaultStatusDot } from '../../../../components/Dashboard/VaultStatus';
import { InputLabelAvailableBalance } from '../../../../components/Form/components/InputLabelAvailableBalance';
import { InputMaxAmountControl } from '../../../../components/Form/components/InputMaxAmountControl';

type Props = Pick<IStores, 'issuePageStore'>;

export const RedeemForm: React.FC<Props> = observer(() => {
  const {
    redeemPageStore,
    user,
    btcNodeStore,
    ratesStore,
    vaultStore,
  } = useStores();
  const [form, setForm] = useState<MobxForm>();

  const vaultOptions = useMemo(() => {
    return redeemPageStore.vaultList.map(vault => {
      const name = cutText(vault.id);
      const vaultInfo = vaultStore.getVaultInfo(vault);
      return {
        text: (
          <Box direction="row" gap="xxsmall" align="center">
            <VaultStatusDot isActive={vaultInfo.isActive} />
            <Text>{name}: </Text>
            <Text bold>
              {formatWithEightDecimals(
                satoshiToBitcoin(vaultInfo.availableToRedeem.toString()),
              )}
            </Text>
            <Text> 1BTC</Text>
          </Box>
        ),
        value: vault.id,
      };
    });
  }, [redeemPageStore.vaultList, vaultStore]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      redeemPageStore.createRedeem();
    });
  }, [form, redeemPageStore]);

  const handleMaxClick = useCallback(() => {
    redeemPageStore.form.oneBTCAmount = satoshiToBitcoin(
      user.oneBTCBalance,
    ).toString();
  }, [redeemPageStore.form.oneBTCAmount, user.oneBTCBalance]);

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
        name="oneBTCAmount"
        type="decimal"
        precision="8"
        delimiter="."
        placeholder="0.0"
        inputLabel={
          <InputLabelAvailableBalance
            label="Amount"
            balance={satoshiToBitcoin(user.oneBTCBalance).toString()}
            tokenName="1BTC"
          />
        }
        renderRight={
          <InputMaxAmountControl onClick={handleMaxClick} tokenName="1BTC" />
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
        label="Vault"
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
          rate={ratesStore.BTC_USDT}
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
          value={formatWithEightDecimals(
            satoshiToBitcoin(btcNodeStore.networkFee),
          )}
          rate={ratesStore.BTC_USDT}
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
          value={
            redeemPageStore.totalReceived -
            satoshiToBitcoin(btcNodeStore.networkFee)
          }
          rate={ratesStore.BTC_USDT}
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
