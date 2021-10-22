import React, { useCallback, useRef, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button, DividerVertical } from 'components/Base';
import { Text } from 'components/Base';
import { observer } from 'mobx-react';
import { Form, isRequired, MobxForm, NumberInput } from 'components/Form';
import {
  formatZeroDecimals,
  lessThanWei,
  moreThanZero,
} from '../../../../utils';
import { useStores } from '../../../../stores';
import {
  calcNewVaultCollateral,
  getVaultInfo,
} from '../../../../modules/btcRelay/vaultHelpers';
import utils from 'web3-utils';
import { InputButton } from '../../../../components/Base/components/Inputs/InputButton';

interface Props {
  vaultId: string;
}

export const IncreaseCollateralForm: React.FC<Props> = observer(
  ({ vaultId }) => {
    const { dashboardVaultDetailsStore, user, vaultStore } = useStores();
    const [form, setForm] = useState<MobxForm>();

    const handleSubmit = useCallback(() => {
      form.validateFields().then(() => {
        dashboardVaultDetailsStore.increaseCollateral();
      });
    }, [form, dashboardVaultDetailsStore]);

    const vault = vaultStore.getEntity(vaultId);

    if (!vault) {
      return null;
    }

    const am = utils.toWei(
      dashboardVaultDetailsStore.formIncrease.oneAmount || '0',
    );
    const vaultInfo = calcNewVaultCollateral(vault, am.toString(), 1);

    const handleMaxClick = useCallback(() => {
      dashboardVaultDetailsStore.formIncrease.oneAmount = utils.fromWei(
        user.balance,
      );
    }, [dashboardVaultDetailsStore.formIncrease.oneAmount, user.balance]);

    return (
      <Form
        ref={ref => setForm(ref)}
        data={dashboardVaultDetailsStore.formIncrease}
      >
        <Box gap="xsmall">
          <NumberInput
            label="Amount"
            name="oneAmount"
            type="decimal"
            precision="8"
            delimiter="."
            placeholder="0.0"
            style={{ width: '100%' }}
            renderRight={
              <Box direction="row" gap="xxsmall">
                <InputButton onClick={handleMaxClick}>
                  <Text color="inherit">MAX</Text>
                </InputButton>
                <DividerVertical />
                <Text bold>ONE</Text>
              </Box>
            }
            rules={[
              isRequired,
              moreThanZero,
              lessThanWei(
                Number(user.balance),
                'Please enter an amount no higher than your available balance.',
              ),
            ]}
          />

          <Box gap="small">
            <Box direction="row" justify="between">
              <Box>
                <Text>Collateralization:</Text>
              </Box>
              <Box>
                <Text>
                  {formatZeroDecimals(getVaultInfo(vault).collateralTotal)}%
                </Text>
              </Box>
            </Box>

            <Box direction="row" justify="between">
              <Box>
                <Text>New collateralization:</Text>
              </Box>
              <Box>
                <Text>{formatZeroDecimals(vaultInfo.collateralTotal)}%</Text>
              </Box>
            </Box>
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
