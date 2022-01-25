import React, { useCallback, useMemo, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button, Checkbox } from 'components/Base';
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
  const [isCustomVault, setCustomVault] = useState(false);

  const vaultOptions = useMemo(() => {
    return redeemPageStore.vaultActiveList.map(vault => {
      const name = cutText(vault.id);
      const vaultInfo = vaultStore.getVaultInfo(vault);
      return {
        text: (
          <Box direction="row" gap="xxsmall" align="center">
            <VaultStatusDot isActive={vaultInfo.isActive} />
            <Text>{name}: </Text>
            <Text bold>
              {formatWithEightDecimals(
                satoshiToBitcoin(vaultInfo.availableToRedeemSat.toString()),
              )}
            </Text>
            <Text> 1BTC</Text>
          </Box>
        ),
        value: vault.id,
      };
    });
  }, [redeemPageStore.vaultActiveList, vaultStore]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      redeemPageStore.createRedeem();
    });
  }, [form, redeemPageStore]);

  const handleMaxClick = useCallback(() => {
    redeemPageStore.form.oneBTCAmount = formatWithEightDecimals(
      satoshiToBitcoin(user.oneBTCBalance),
    );
  }, [redeemPageStore.form.oneBTCAmount, user.oneBTCBalance]);

  const amountValidator = useMemo(() => {
    const vault = redeemPageStore.getVault(redeemPageStore.form.vaultId);
    if (!vault) {
      return undefined;
    }
    const vaultInfo = vaultStore.getVaultInfo(vault);

    return lessThanSat(
      vaultInfo.availableToRedeemSat,
      'redeem amount exceeds vault balance',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redeemPageStore, vaultStore, redeemPageStore.form.vaultId]);

  const isFormDisabled = !user.isBridgeAvailable;

  return (
    <Form ref={ref => setForm(ref)} data={redeemPageStore.form}>
      <NumberInput
        name="oneBTCAmount"
        type="decimal"
        precision="8"
        delimiter="."
        disabled={isFormDisabled}
        placeholder="0.0"
        inputLabel={
          <InputLabelAvailableBalance
            label="Amount"
            balance={formatWithEightDecimals(
              satoshiToBitcoin(user.oneBTCBalance).toString(),
            )}
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
        disabled={isFormDisabled}
        placeholder="Enter your BTC address"
        style={{ width: '100%' }}
        rules={[isRequired]}
      />

      {redeemPageStore.defaultVaultId && (
        <Box>
          <Box direction="row" align="center" justify="between">
            <Text size="large" bold>
              Vault
            </Text>
            <Checkbox
              disabled={isFormDisabled}
              label="Don't like the vault, let me select"
              value={isCustomVault}
              onChange={setCustomVault}
            />
          </Box>
          <Select
            name="vaultId"
            disabled={isFormDisabled || !isCustomVault}
            style={{ width: '100%' }}
            rules={[isRequired]}
            options={vaultOptions}
            defaultValue={redeemPageStore.defaultVaultId}
          />
        </Box>
      )}

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

      <Box direction="row" align="center" gap="small">
        <Button
          bgColor="#00ADE8"
          onClick={handleSubmit}
          transparent={false}
          disabled={isFormDisabled || redeemPageStore.status === 'pending'}
          isLoading={redeemPageStore.status === 'pending'}
        >
          Continue
        </Button>
        {isFormDisabled && (
          <Box>
            <Text color="red" bold>
              Redeem temporary disabled
            </Text>
          </Box>
        )}
      </Box>
    </Form>
  );
});

export default RedeemForm;
