import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Title, Text, Divider, Button } from 'components/Base';
import { useQRCode } from 'react-qrcodes';
import { formatWithSixDecimals } from '../../../utils';
import { useStores } from '../../../stores';
import { useObserver } from 'mobx-react';
import { Input, isRequired, Form } from '../../../components/Form';
import { satoshiToBitcoin } from '../../../services/bitcoin';

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

export const WithdrawModalContent = ({
  receivedAmount,
  receivedUsdAmount,
  bitcoinAddress,
}) => {
  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Text bold>Your Redeem request is being processed</Text>
      </Box>

      <Box align="center">
        <Text>
          You will receive&nbsp;
          <Text inline color="Orange500">
            {receivedAmount}
          </Text>
          &nbsp;BTC
        </Text>
        <Text color="#748695" size="small" inline>
          ≈ ${formatWithSixDecimals(receivedUsdAmount)}
        </Text>
      </Box>
      <Box align="center" gap="xxsmall">
        <Text>BTC destination address</Text>
        <Box round="xxsmall" style={{ padding: '16px' }} border="all">
          <Text
            bold
            style={{ textAlign: 'center', overflowWrap: 'break-word' }}
          >
            {bitcoinAddress}
          </Text>
        </Box>
      </Box>

      <Box alignSelf="start">
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          We will inform you when the BTC payment is executed. This typically
          takes only a few minutes but may sometimes take up to 6 hours.
        </Text>
      </Box>
    </Box>
  ));
};

export const RedeemWithdrawModal = props => {
  const { transactionHash } = props.actionData.data;
  const { redeemPageStore, user } = useStores();

  const redeem = redeemPageStore.redeemMap[transactionHash];
  const bitcoinAddress = redeem.btcAddress;

  const receivedAmount = satoshiToBitcoin(redeem.redeemEvent.amount);
  const receivedUsdAmount = receivedAmount * user.btcRate;

  return useObserver(() => (
    <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
      <Title align="center">Withdraw</Title>
      <Divider colorful fullwidth />
      <WithdrawModalContent
        bitcoinAddress={bitcoinAddress}
        receivedAmount={receivedAmount}
        receivedUsdAmount={receivedUsdAmount}
      />
    </Box>
  ));
};
