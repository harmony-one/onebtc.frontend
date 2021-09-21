import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button } from 'components/Base';
import { useObserver } from 'mobx-react';
import { Form, isRequired, NumberInput, Input } from 'components/Form';
import { createValidate, moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { bitcoinToSatoshi } from '../../../../services/bitcoin';

type Props = Pick<IStores, 'issuePageStore'>;

export const TransferForm: React.FC<Props> = () => {
  const { transferPageStore, user } = useStores();
  const [form, setForm] = useState();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      transferPageStore.creteTransfer();
    });
  }, [form, transferPageStore]);

  const lessThanBalance = () =>
    createValidate((value: string) => {
      return bitcoinToSatoshi(value) > user.oneBTCBalance;
    }, `redeem amount exceeds balance ${user.oneBTCBalance}`);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={transferPageStore.form}>
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
        label="Recipient"
        name="oneAddress"
        type="string"
        placeholder="Enter recipient address"
        style={{ width: '100%' }}
        rules={[isRequired]}
      />

      <Box gap="small">
        <Divider colorful fullwidth />
        <Button
          bgColor="#00ADE8"
          onClick={handleSubmit}
          transparent={false}
          disabled={transferPageStore.status === 'pending'}
          isLoading={transferPageStore.status === 'pending'}
        >
          Continue
        </Button>
      </Box>
    </Form>
  ));
};

export default TransferForm;
