import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Button, Divider, Title } from 'components/Base';
import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { Form, Input, isRequired } from '../../../../components/Form';
import { RedeemWithdrawModalContent } from './RedeemWithdrawModalContent';

export function DepositForm() {
  const { issuePageStore } = useStores();

  const [form, setForm] = useState();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      // issuePageStore.createIssue();
    });
  }, [form]);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={issuePageStore.form}>
      <Input
        label={`Bitcoin transaction id`}
        name="bitcoinTX"
        type="string"
        placeholder="transaction id"
        style={{ width: '100%' }}
        rules={[isRequired]}
      />
      <Button
        bgColor="#00ADE8"
        onClick={handleSubmit}
        transparent={false}
        // disabled={issuePageStore.status === 'pending'}
        // isLoading={issuePageStore.status === 'pending'}
      >
        Continue
      </Button>
    </Form>
  ));
}

export const RedeemWithdrawModal = props => {
  const { transactionHash } = props.actionData.data;

  return useObserver(() => (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Title align="center">Withdraw</Title>
      <Divider colorful fullwidth />
      <RedeemWithdrawModalContent redeemTxHash={transactionHash} />
    </Box>
  ));
};
