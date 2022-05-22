import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button } from 'components/Base';
import { useObserver } from 'mobx-react';
import {
  Form,
  isRequired,
  NumberInput,
  Input,
  MobxForm,
} from 'components/Form';
import {
  formatWithEightDecimals,
  lessThanSat,
  moreThanZero,
} from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { InputMaxAmountControl } from 'components/Form/components/InputMaxAmountControl';
import { satoshiToBitcoin } from '../../../../services/bitcoin';
import { InputLabelAvailableBalance } from '../../../../components/Form/components/InputLabelAvailableBalance';

type Props = Pick<IStores, 'issuePageStore'>;

export const TransferForm: React.FC<Props> = () => {
  const { transferPageStore, user } = useStores();
  const [form, setForm] = useState<MobxForm>();

  const handleMaxClick = useCallback(() => {
    transferPageStore.form.oneBTCAmount = formatWithEightDecimals(
      satoshiToBitcoin(user.oneBTCBalance),
    );
  }, [transferPageStore.form.oneBTCAmount, user.oneBTCBalance]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      transferPageStore.creteTransfer();
    });
  }, [form, transferPageStore]);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={transferPageStore.form}>
      <NumberInput
        name="oneBTCAmount"
        type="decimal"
        precision="8"
        delimiter="."
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

      <Box gap="medium">
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
