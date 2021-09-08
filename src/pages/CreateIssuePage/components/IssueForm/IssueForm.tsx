import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button } from 'components/Base';
import { useObserver } from 'mobx-react';
import { Form, isRequired, NumberInput, Input } from 'components/Form';
import { moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../Explorer/Components';

type Props = Pick<IStores, 'issue'>;

export const IssueForm: React.FC<Props> = () => {
  const { issue, user } = useStores();
  const [form, setForm] = useState();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      issue.createIssue();
    });
  }, [form, issue]);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={issue.transaction}>
      <NumberInput
        label={`BTC Amount`}
        name="amount"
        type="decimal"
        precision="6"
        delimiter="."
        placeholder="0.0"
        style={{ width: '100%' }}
        rules={[isRequired, moreThanZero]}
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
          value={issue.bridgeFee}
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
          rate={user.btcRate}
          boxProps={{ pad: {} }}
          tokenName="OneBTC"
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
  ));
};

export default IssueForm;
