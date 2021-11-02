import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button, Text, DividerVertical } from 'components/Base';
import { observer } from 'mobx-react';
import { Form, isRequired, MobxForm, NumberInput } from 'components/Form';
import {
  formatZeroDecimals,
  lessThanWei,
  moreThanZero,
} from '../../../../utils';
import { useStores } from '../../../../stores';
import utils from 'web3-utils';
import { InputButton } from '../../../../components/Base/components/Inputs/InputButton';

interface Props {
  vaultId: string;
}

export const WithdrawCollateralForm: React.FC<Props> = observer(
  ({ vaultId }) => {
    const { dashboardVaultDetailsStore, vaultStore } = useStores();
    const [form, setForm] = useState<MobxForm>();

    const handleSubmit = useCallback(() => {
      form.validateFields().then(() => {
        dashboardVaultDetailsStore.withdrawCollateral();
      });
    }, [form, dashboardVaultDetailsStore]);

    const vault = vaultStore.getEntity(vaultId);

    if (!vault) {
      return null;
    }

    const oneAmount = utils.toWei(
      dashboardVaultDetailsStore.formWithdraw.oneAmount || '0',
    );
    const vaultInfo = vaultStore.getVaultInfo(vault);
    const _vaultInfo = vaultStore.calcNewVaultCollateral(
      vault,
      oneAmount.toString(),
      -1,
    );

    const handleMaxClick = useCallback(() => {
      dashboardVaultDetailsStore.formWithdraw.oneAmount = utils.fromWei(
        vaultInfo.maxWithdraw,
      );
    }, [
      dashboardVaultDetailsStore.formWithdraw.oneAmount,
      vaultInfo.maxWithdraw,
    ]);

    return (
      <Form
        ref={ref => setForm(ref)}
        data={dashboardVaultDetailsStore.formWithdraw}
      >
        <Box gap="xsmall">
          <NumberInput
            label="Withdraw collateral"
            name="oneAmount"
            type="decimal"
            precision="8"
            delimiter="."
            placeholder="0.0"
            renderRight={
              <Box direction="row" gap="xxsmall">
                <InputButton onClick={handleMaxClick}>
                  <Text color="inherit">MAX</Text>
                </InputButton>
                <DividerVertical />
                <Text bold>ONE</Text>
              </Box>
            }
            style={{ width: '100%' }}
            rules={[
              isRequired,
              moreThanZero,
              lessThanWei(
                Number(vault.collateral),
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
                  {formatZeroDecimals(
                    vaultStore.getVaultInfo(vault).collateralTotal,
                  )}
                  %
                </Text>
              </Box>
            </Box>

            <Box direction="row" justify="between">
              <Box>
                <Text>New collateralization:</Text>
              </Box>
              <Box>
                <Text>{formatZeroDecimals(_vaultInfo.collateralTotal)}%</Text>
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
              Withdraw
            </Button>
          </Box>
        </Box>
      </Form>
    );
  },
);

export default WithdrawCollateralForm;
