import { Text } from 'components/Base';
import { Box } from 'grommet';
import React, { useCallback, useState } from 'react';
import { SubtractCircle, AddCircle } from 'grommet-icons';

interface Props {
  label: string;
}

export const HelpItem: React.FC<Props> = ({ label, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded(value => !value);
  }, []);

  return (
    <Box gap="small">
      <Box direction="row" align="center" gap="xxsmall">
        <Box onClick={toggle}>
          {expanded && <SubtractCircle />}
          {!expanded && <AddCircle />}
        </Box>
        <Box>
          <Text bold>{label}</Text>
        </Box>
      </Box>
      {expanded && <Box>{children}</Box>}
    </Box>
  );
};

HelpItem.displayName = 'HelpItem';
