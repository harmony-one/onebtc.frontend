import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button } from 'components/Base';
import { useObserver } from 'mobx-react';
import { Form, isRequired, NumberInput, Input } from 'components/Form';
import { createValidate, moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { bitcoinToSatoshi } from '../../../../services/bitcoin';

type Props = Pick<IStores, 'issuePageStore'>;

export const RedeemForm: React.FC<Props> = () => {
  const { redeemPageStore, user } = useStores();
  const [form, setForm] = useState();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      redeemPageStore.createRedeem();
    });
  }, [form, redeemPageStore]);

  const lessThanBalance = () =>
    createValidate((value: string) => {
      return bitcoinToSatoshi(value) > user.oneBTCBalance;
    }, `redeem amount exceeds balance ${user.oneBTCBalance}`);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={redeemPageStore.form}>
      <NumberInput
        label="OneBTC Amount"
        name="oneBTCAmount"
        type="decimal"
        precision="6"
        delimiter="."
        placeholder="0.0"
        style={{ width: '100%' }}
        rules={[isRequired, moreThanZero, lessThanBalance()]}
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

      <Input
        label={`Vault identity`}
        name="vaultId"
        type="string"
        precision="6"
        placeholder="enter vault identity"
        style={{ width: '100%' }}
        rules={[isRequired]}
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
          value={0.00005}
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
          value={redeemPageStore.form.totalReceive}
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
  ));
};

export default RedeemForm;