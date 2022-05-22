import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Text } from './Base';
import { ONE_SECOND } from '../constants/date';
import { Button } from './Button/Button';
import styled from 'styled-components';

interface Props {
  address: string;
}

const AddressContainer = styled(Box)`
  border-radius: 15px;
  border: 1px solid ${props => props.theme.borderColor};
`;

export const AddressWithCopyButton: React.FC<Props> = ({ address }) => {
  const [progress, setProgress] = useState(false);

  const handleCopy = useCallback(() => {
    setProgress(true);
    navigator.clipboard.writeText(address).finally(() => {
      setTimeout(() => {
        setProgress(false);
      }, ONE_SECOND);
    });
  }, [address]);

  const text = progress ? 'Address copied' : address;

  return (
    <Box
      width="100%"
      fill="horizontal"
      direction="row"
      align="center"
      gap="xsmall"
    >
      <AddressContainer
        direction="row"
        justify="center"
        round="xxsmall"
        overflow="hidden"
        width="100%"
      >
        <Box
          width="100%"
          justify="center"
          pad={{ horizontal: '12px', vertical: '8px' }}
        >
          <Text
            bold
            style={{ textAlign: 'center', overflowWrap: 'break-word' }}
          >
            {text}
          </Text>
        </Box>

        <Box justify="center" border="left">
          <Button fill="vertical" onClick={handleCopy}>
            Copy
          </Button>
        </Box>
      </AddressContainer>
      {/*<Button isLoading={progress} onClick={handleCopy}>*/}
      {/*  Copy*/}
      {/*</Button>*/}
    </Box>
  );
};

AddressWithCopyButton.displayName = 'AddressWithCopyButton';
