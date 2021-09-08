import React from 'react';
import { Box } from 'grommet';
import { Title, Text, Divider } from 'components/Base';

export function ReceivedModalContent({ total }) {
  return (
    <Box direction="column" justify="center">
      <Box align="center">
        <Text>You have received:</Text>
        <Text bold>{total} OneBTC</Text>
      </Box>
    </Box>
  );
}

export function ReceivedModal(props) {
  const { total } = props.actionData.data;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Title align="center">Confirmed</Title>
      <Divider colorful fullwidth />
      <ReceivedModalContent total={total} />
    </Box>
  );
}
