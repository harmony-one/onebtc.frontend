import React, { useCallback, useMemo, useState } from 'react';
import { Box } from 'grommet';
import { Text, Divider, Button } from 'components/Base';
import { useObserver } from 'mobx-react';
import { Form, isRequired, NumberInput, Select } from 'components/Form';
import { formatWithSixDecimals, moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { PriceView } from '../../../../components/PriceView';
import { cutText } from '../../../../services/cutText';
import { getVaultInfo } from '../../../../modules/btcRelay/vaultHelpers';
import { satoshiToBitcoin } from '../../../../services/bitcoin';

type Props = Pick<IStores, 'issuePageStore'>;

export const IssueForm: React.FC<Props> = () => {
  const { issuePageStore, user } = useStores();
  const [form, setForm] = useState();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      issuePageStore.createIssue();
    });
  }, [form, issuePageStore]);

  const vaultOptions = useMemo(() => {
    return issuePageStore.vaultList.map(vault => {
      const name = cutText(vault.id);
      const vaultInfo = getVaultInfo(vault);
      return {
        text: (
          <Text>
            {name}:{' '}
            <Text bold>
              {formatWithSixDecimals(
                satoshiToBitcoin(vaultInfo.availableAmountSat),
              )}
            </Text>{' '}
            OneBTC
          </Text>
        ),
        value: vault.id,
      };
    });
  }, [issuePageStore.vaultList]);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={issuePageStore.form}>
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

      <Select
        label="Vault identity"
        name="vaultId"
        style={{ width: '100%' }}
        rules={[isRequired]}
        options={vaultOptions}
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
          value={issuePageStore.bridgeFee}
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
          value={issuePageStore.totalReceive}
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
          disabled={issuePageStore.status === 'pending'}
          isLoading={issuePageStore.status === 'pending'}
        >
          Continue
        </Button>
      </Box>
    </Form>
  ));
};

export default IssueForm;
