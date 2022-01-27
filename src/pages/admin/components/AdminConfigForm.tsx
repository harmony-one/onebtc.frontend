import React, { useState } from 'react';
import { Form, MobxForm, Checkbox, TextArea } from 'components/Form';
import { Text } from 'components/Base';
import { Box } from 'grommet';
import { useStores } from '../../../stores';

interface Props {}

export const AdminConfigForm: React.FC<Props> = () => {
  const { adminConfigForm } = useStores();
  const [form, setForm] = useState<MobxForm>();

  return (
    <Form ref={ref => setForm(ref)} data={adminConfigForm}>
      <Box direction="row" align="center" gap="small">
        <Box>
          <Text size="large" bold>
            Enable bridge
          </Text>
        </Box>
        <Box>
          <Checkbox name="bridgeEnable" />
        </Box>
      </Box>
      <Box>
        <TextArea label="WhiteList" name="whiteListAddresses" />
      </Box>
    </Form>
  );
};

AdminConfigForm.displayName = 'AdminConfigForm';
