import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  btcAddressBech32,
  formatWithEightDecimals,
  lessThanSat,
  moreThanZero,
  minAmount,
} from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { satoshiToBitcoin } from '../../../../services/bitcoin';
import { InputLabelAvailableBalance } from '../../../../components/Form/components/InputLabelAvailableBalance';
import { InputMaxAmountControl } from '../../../../components/Form/components/InputMaxAmountControl';
import { VaultRedeemSelectItem } from 'components/VaultRedeemSelectItem';

type Props = Pick<IStores, 'issuePageStore'>;

export const RedeemForm: React.FC<Props> = observer(() => {
  const {
    redeemPageStore,
    vaultListStore,
    user,
    btcNodeStore,
    ratesStore,
    vaultStore,
  } = useStores();
  const [form, setForm] = useState<MobxForm>();
  const [isCustomVault, setCustomVault] = useState(false);

  const activeVaultList = redeemPageStore.getActiveVaultList(
    vaultListStore.vaultList,
    isCustomVault,
  );

  const vaultOptions = useMemo(() => {
    return activeVaultList.map(vault => {
      return {
        text: <VaultRedeemSelectItem vault={vault} />,
        value: vault.id,
      };
    });
  }, [activeVaultList]);

  useEffect(() => {
    redeemPageStore.updateSelectedVault(isCustomVault);
  }, [isCustomVault, redeemPageStore, redeemPageStore.form.oneBTCAmount]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      redeemPageStore.createHarmonyRedeem();
    });
  }, [form, redeemPageStore]);

  const handleMaxClick = useCallback(() => {
    redeemPageStore.form.oneBTCAmount = formatWithEightDecimals(
      satoshiToBitcoin(user.oneBTCBalance),
    );
  }, [redeemPageStore.form.oneBTCAmount, user.oneBTCBalance]);

  const vault = vaultListStore.getVault(redeemPageStore.form.vaultId);

  const amountValidator = useMemo(() => {
    if (!vault) {
      return undefined;
    }
    const vaultInfo = vaultStore.getVaultInfo(vault);

    return lessThanSat(
      vaultInfo.availableToRedeemSat,
      'redeem amount exceeds vault balance',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault]);

  const isFormDisabled = !user.isBridgeAvailable;

  return (
    <Form ref={ref => setForm(ref)} data={redeemPageStore.form}>
      <Box
        pad="small"
        margin={{ bottom: 'medium' }}
        style={{ border: '1px solid #bebebe', borderRadius: 5 }}
      >
        <Text color="green">
          You will be prompted to sign a transfer transaction that will transfer
          your 1BTC to a Harmony address. Upon receiving the 1BTC, we will
          manually transfer the bitcoin to your BTC address within 2-5 days.
          If you have not received your bitcoins after the 5 days window,
          please raise a support ticket, by going through the support page on
          the left panel. Note that, this redeem operation will not be displayed
          under the redeem operations list in the dashboard.
        </Text>

        <br />

        <Text color="#0049af">
          For users who withdraw 1BTC from a Tranquil account, only 10% of the withdrawal amount will be compensated. 
          For example, for 1 1BTC you will get 0.1 BTC.
        </Text>
      </Box>

      {/* <Box
        pad="small"
        margin={{ bottom: 'medium' }}
        style={{ border: '1px solid #bebebe', borderRadius: 5 }}
      >
        <Text color="red">
          Your transaction will not be displayed in the redeema list (because
          the transfer will be done in manual mode)
        </Text>
      </Box> */}

      <NumberInput
        name="oneBTCAmount"
        type="decimal"
        precision="8"
        delimiter="."
        disabled={isFormDisabled}
        placeholder="0.0"
        max="9999999"
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
          minAmount(0.0001),
          lessThanSat(user.oneBTCBalance, `redeem amount exceeds balance`),
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
        rules={[isRequired, btcAddressBech32]}
      />

      {/* <Box
        direction="row"
        justify="between"
        margin={{ bottom: 'medium', top: 'medium' }}
        align="start"
      >
        <Text size="small" bold={true}>
          Bridge Fee {redeemPageStore.bridgeRatio}%
        </Text>
        <PriceView
          value={redeemPageStore.bridgeFee}
          rate={ratesStore.BTC_USDT}
          boxProps={{ pad: {} }}
          tokenName="BTC"
        />
      </Box>*/}

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
              Please connect your wallet
            </Text>
          </Box>
        )}
      </Box>
    </Form>
  );
});

export default RedeemForm;
