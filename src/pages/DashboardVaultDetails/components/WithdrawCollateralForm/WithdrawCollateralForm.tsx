import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button, Text } from 'components/Base';
import { observer } from 'mobx-react';
import { Form, isRequired, MobxForm, NumberInput } from 'components/Form';
import {
  formatWithEightDecimals,
  formatZeroDecimals,
  lessThanWei,
  moreThanZero,
} from '../../../../utils';
import { useStores } from '../../../../stores';
import utils from 'web3-utils';
import { InputLabelAvailableBalance } from '../../../../components/Form/components/InputLabelAvailableBalance';
import { InputMaxAmountControl } from '../../../../components/Form/components/InputMaxAmountControl';
import { useInterval } from '../../../../hooks/useInterval';
import { ONE_SECOND } from '../../../../constants/date';
import { observable } from 'mobx';

interface Props {
  vaultId: string;
}

const localStore = observable({
  availableToWithdrawWei: '0',
  inProgress: false,
});

export const WithdrawCollateralForm: React.FC<Props> = observer(
  ({ vaultId }) => {
    const {
      dashboardVaultDetailsStore,
      redeemPageStore,
      vaultStore,
    } = useStores();
    const [form, setForm] = useState<MobxForm>();

    const handleSubmit = useCallback(() => {
      form.validateFields().then(() => {
        dashboardVaultDetailsStore.withdrawCollateral();
      });
    }, [form, dashboardVaultDetailsStore]);

    const vault = vaultStore.getEntity(vaultId);

    const updateWithdraw = useCallback(async () => {
      if (localStore.inProgress) {
        return;
      }
      localStore.inProgress = true;

      try {
        localStore.availableToWithdrawWei = await redeemPageStore.loadAvailableToWithdrawWei(
          vault,
        );
        localStore.inProgress = false;
      } catch (e) {
        console.log('### e', e);
        localStore.inProgress = false;
      }
    }, [redeemPageStore, vault]);

    useInterval({
      callback: updateWithdraw,
      timeout: ONE_SECOND * 10,
    });

    if (!vault) {
      return null;
    }

    const oneAmount = utils.toWei(
      dashboardVaultDetailsStore.formWithdraw.oneAmount || '0',
    );
    const _vaultInfo = vaultStore.calcNewVaultCollateral(
      vault,
      oneAmount.toString(),
      -1,
    );

    const handleMaxClick = useCallback(() => {
      dashboardVaultDetailsStore.formWithdraw.oneAmount = utils.fromWei(
        localStore.availableToWithdrawWei,
      );
    }, [dashboardVaultDetailsStore.formWithdraw.oneAmount]);

    const withdrawBalanceText = !localStore.inProgress
      ? formatWithEightDecimals(
          utils.fromWei(localStore.availableToWithdrawWei),
        )
      : 'Loading...';
    return (
      <Form
        ref={ref => setForm(ref)}
        data={dashboardVaultDetailsStore.formWithdraw}
      >
        <Box gap="xsmall">
          <NumberInput
            name="oneAmount"
            type="decimal"
            precision="16"
            delimiter="."
            placeholder="0.0"
            inputLabel={
              <InputLabelAvailableBalance
                label="Withdraw"
                balance={withdrawBalanceText}
                tokenName="ONE"
              />
            }
            renderRight={
              <InputMaxAmountControl onClick={handleMaxClick} tokenName="ONE" />
            }
            style={{ width: '100%' }}
            rules={[
              isRequired,
              moreThanZero,
              lessThanWei(
                Number(localStore.availableToWithdrawWei),
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
