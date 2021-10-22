import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button, Text, DividerVertical } from 'components/Base';
import { useObserver } from 'mobx-react';
import {
  Form,
  isRequired,
  NumberInput,
  Input,
  MobxForm,
} from 'components/Form';
import { lessThanSat, moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';

type Props = Pick<IStores, 'issuePageStore'>;

export const TransferForm: React.FC<Props> = () => {
  const { transferPageStore, user } = useStores();
  const [form, setForm] = useState<MobxForm>();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      transferPageStore.creteTransfer();
    });
  }, [form, transferPageStore]);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={transferPageStore.form}>
      <NumberInput
        label="OneBTC Amount"
        name="oneBTCAmount"
        type="decimal"
        precision="8"
        delimiter="."
        placeholder="0.0"
        renderRight={
          <Box direction="row" gap="xxsmall">
            <DividerVertical />
            <Text bold>oneBTC</Text>
          </Box>
        }
        style={{ width: '100%' }}
        rules={[
          isRequired,
          moreThanZero,
          lessThanSat(user.oneBTCBalance, 'transfer amount exceeds balance'),
        ]}
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
