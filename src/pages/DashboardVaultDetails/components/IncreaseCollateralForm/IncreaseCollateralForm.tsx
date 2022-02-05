import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button } from 'components/Base';
import { Text } from 'components/Base';
import { observer } from 'mobx-react';
import { Form, isRequired, MobxForm, NumberInput } from 'components/Form';
import {
  formatZeroDecimals,
  lessThanWei,
  moreThanZero,
} from '../../../../utils';
import { useStores } from '../../../../stores';
import utils from 'web3-utils';
import { InputMaxAmountControl } from 'components/Form/components/InputMaxAmountControl';
import { InputLabelAvailableBalance } from '../../../../components/Form/components/InputLabelAvailableBalance';

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
    const vaultInfo = vaultStore.calcNewVaultCollateral(
      vault,
      am.toString(),
      1,
    );

    const handleMaxClick = useCallback(() => {
      dashboardVaultDetailsStore.formIncrease.oneAmount = utils.fromWei(
        user.balance || '0',
      );
    }, [dashboardVaultDetailsStore.formIncrease.oneAmount, user.balance]);

    return (
      <Form
        ref={ref => setForm(ref)}
        data={dashboardVaultDetailsStore.formIncrease}
      >
        <Box gap="xsmall">
          <NumberInput
            name="oneAmount"
            type="decimal"
            precision="16"
            delimiter="."
            placeholder="0.0"
            style={{ width: '100%' }}
            inputLabel={
              <InputLabelAvailableBalance
                label="Amount"
                balance={utils.fromWei(user.balance).toString()}
                tokenName="ONE"
              />
            }
            renderRight={
              <InputMaxAmountControl tokenName="ONE" onClick={handleMaxClick} />
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
