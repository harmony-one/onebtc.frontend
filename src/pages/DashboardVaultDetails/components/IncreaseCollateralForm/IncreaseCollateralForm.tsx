import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button } from 'components/Base';
import { Text } from 'components/Base';
import { observer } from 'mobx-react';
import { Form, isRequired, NumberInput } from 'components/Form';
import { lessThan, moreThanZero } from '../../../../utils';
import { useStores } from '../../../../stores';
import {
  calcNewVaultCollateral,
  getVaultInfo,
} from '../../../../modules/btcRelay/vaultHelpers';
import utils from 'web3-utils';

interface Props {
  vaultId: string;
}

export const IncreaseCollateralForm: React.FC<Props> = observer(
  ({ vaultId }) => {
    const { dashboardVaultDetailsStore, user, vaultStore } = useStores();
    const [form, setForm] = useState();

    const handleSubmit = useCallback(() => {
      form.validateFields().then(() => {
        dashboardVaultDetailsStore.increaseCollateral();
      });
    }, [form, dashboardVaultDetailsStore]);

    const vault = vaultStore.vaultMap[vaultId];

    if (!vault) {
      return null;
    }

    const am = utils.toWei(dashboardVaultDetailsStore.form.oneAmount || '0');
    const vaultInfo = calcNewVaultCollateral(vault, am.toString(), 1);

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
            <Text>Collateralization:</Text>
            <Text>{getVaultInfo(vault).collateralTotal}</Text>
            <Text>New collateralization:</Text>
            <Text>{vaultInfo.collateralTotal}</Text>
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
  },
);

export default IncreaseCollateralForm;
