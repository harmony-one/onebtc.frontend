import React from 'react';
import { Box } from 'grommet';
import { CircleAlert } from 'grommet-icons';
import { Text } from './Base';
import { Paper } from './Paper';

interface Props {
  title: string;
  text: string;
  color: string;
}

export const InfoBlock: React.FC<Props> = ({ text, title, color }) => {
  return (
    <Paper>
      <Box gap="xsmall">
        <Box direction="row" align="center" gap="xxsmall">
          <CircleAlert color={color} />
          <Text bold color={color}>
            {title}
          </Text>
        </Box>
        <Box>
          <Text bold>{text}</Text>
        </Box>
      </Box>
    </Paper>
  );
};

InfoBlock.displayName = 'InfoBlock';
