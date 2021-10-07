import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button } from 'components/Base';
import { Text } from 'components/Base';
import { observer } from 'mobx-react';
import { Form, isRequired, NumberInput } from 'components/Form';
import { lessThan, moreThanZero } from '../../../../utils';
import { IStores, useStores } from '../../../../stores';

type Props = Pick<IStores, 'issuePageStore'>;

export const IncreaseCollateralForm: React.FC<Props> = observer(() => {
  const { dashboardVaultDetailsStore, user } = useStores();
  const [form, setForm] = useState();

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      dashboardVaultDetailsStore.increaseCollateral();
    });
  }, [form, dashboardVaultDetailsStore]);

  return (
    <Form ref={ref => setForm(ref)} data={dashboardVaultDetailsStore.form}>
      <Box gap="xsmall">
        <NumberInput
          label="Increase collateral by"
          name="oneAmount"
          type="decimal"
          precision="4"
          delimiter="."
          placeholder="0.0"
          style={{ width: '100%' }}
          rules={[
            isRequired,
            moreThanZero,
            lessThan(user.balance, 'transfer amount exceeds balance'),
          ]}
        />

        <Box>
          <Text>New collateralization: more than 1000%</Text>
        </Box>

        <Box gap="small">
          <Divider colorful fullwidth />
          <Button
            bgColor="#00ADE8"
            onClick={handleSubmit}
            transparent={false}
            disabled={dashboardVaultDetailsStore.status === 'pending'}
            isLoading={dashboardVaultDetailsStore.status === 'pending'}
          >
            Increase
          </Button>
        </Box>
      </Box>
    </Form>
  );
});

export default IncreaseCollateralForm;
