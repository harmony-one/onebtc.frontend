import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Title, Text, Divider, Button } from 'components/Base';
import { useQRCode } from 'react-qrcodes';
import { formatWithSixDecimals } from '../../../utils';
import { useStores } from '../../../stores';
import { useObserver } from 'mobx-react';
import { Input, isRequired, Form } from '../../../components/Form';
import { TActionModalProps } from '../../../components/ActionModals';

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

export const DepositModalContent = ({
  sendAmount,
  sendUsdAmount,
  bitcoinAddress,
}) => {
  const qrData = `bitcoin:${bitcoinAddress}?amount=${sendAmount}`;
  const [qrRef] = useQRCode({
    text: qrData,
    options: {
      level: 'H',
      margin: 5,
      scale: 8,
      width: 128,
      color: {
        dark: '#000000',
        light: '#ffffffff',
      },
    },
  });

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Text>
          Send{' '}
          <Text inline color="Orange500">
            {sendAmount}
          </Text>
          &nbsp;BTC
        </Text>
        <Text color="#748695" size="small" inline>
          ≈ ${formatWithSixDecimals(sendUsdAmount)}
        </Text>
      </Box>
      <Box align="center" gap="xxsmall">
        <Text>in a single transaction to</Text>
        <Box round="xxsmall" style={{ padding: '16px' }} border="all">
          <Text
            bold
            style={{ textAlign: 'center', overflowWrap: 'break-word' }}
          >
            {bitcoinAddress}
          </Text>
        </Box>
        <Text>Within 0 Days 23:54:22</Text>
      </Box>

      <Box alignSelf="start">
        <Text>
          <Text inline bold color="Red">
            Warning:
          </Text>{' '}
          Some Bitcoin wallets display values in oneBTC. Please ensure you send
          the correct amount:1000 oneBTC
        </Text>
      </Box>

      <Box>
        <canvas ref={qrRef} />
      </Box>

      <Box alignSelf="start" margin={{ bottom: 'small' }}>
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          If you have already made the payment, please wait for a few minutes
          for it to be confirmed in the table below.
        </Text>
      </Box>
    </Box>
  ));
};

export const DepositModal = (props: TActionModalProps) => {
  const { transactionHash } = props.actionData.data;
  const { issuePageStore, user } = useStores();

  const issue = issuePageStore.issuesMap[transactionHash];
  const sendAmount = Number(issue.issueAmount) / 1e9;
  const bitcoinAddress = issue.btcAddress;
  const sendUsdAmount = sendAmount * user.btcRate;

  return useObserver(() => (
    <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
      <Title align="center">Deposit</Title>
      <Divider colorful fullwidth />
      <DepositModalContent
        bitcoinAddress={bitcoinAddress}
        sendAmount={sendAmount}
        sendUsdAmount={sendUsdAmount}
      />
    </Box>
  ));
};
