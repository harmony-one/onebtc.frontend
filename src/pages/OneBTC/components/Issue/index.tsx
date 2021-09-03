import React, { useCallback, useEffect, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button } from 'components/Base';
import { observer } from 'mobx-react';
import { Form, isRequired, NumberInput } from 'components/Form';
import { moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../Explorer/Components';

type Props = Pick<IStores, 'issue'>;

export const Issue: React.FC<Props> = observer(() => {

  const { issue, user } = useStores();

  const [form, setForm] = useState();

  useEffect(() => {
    console.log('### form', form);
  }, [form]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      issue.createIssue();
    });
  }, [form, issue]);

  return (
    <Form ref={ref => setForm(ref)} data={issue.transaction}>
      <NumberInput
        label={`BTC Amount`}
        name="amount"
        type="decimal"
        precision="6"
        delimiter="."
        placeholder="0.0"
        style={{ width: '100%' }}
        rules={[
          isRequired,
          moreThanZero,
        ]}
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
            value={issue.bridgeFee}
            rate={50000}
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
            Security Deposit
          </Text>
          <PriceView
            value={1}
            rate={user.oneRate}
            boxProps={{ pad: {} }}
            tokenName="ONE"
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
            value={issue.totalReceive}
            rate={50000}
            boxProps={{ pad: {} }}
            tokenName="BTC"
          />
        </Box>

        <Box>
          <Button
            bgColor="#00ADE8"
            onClick={handleSubmit}
            transparent={false}
            disabled={issue.status === 'pending'}
            isLoading={issue.status === 'pending'}
          >
            Continue
          </Button>
        </Box>

      </Form>
  );
});
