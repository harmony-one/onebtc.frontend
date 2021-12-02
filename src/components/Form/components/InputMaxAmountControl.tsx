import React from 'react';
import { InputButton } from '../../Base/components/Inputs/InputButton';
import { DividerVertical, Text } from '../../Base';
import { Box } from 'grommet';

interface Props {
  onClick: () => void;
  tokenName: string;
}

export const InputMaxAmountControl: React.FC<Props> = ({
  onClick,
  tokenName,
}) => {
  return (
    <Box direction="row" gap="8px">
      <InputButton onClick={onClick}>
        <Text color="inherit">MAX</Text>
      </InputButton>
      <DividerVertical />
      <Text bold>{tokenName}</Text>
    </Box>
  );
};

InputMaxAmountControl.displayName = 'InputMaxAmountControl';
