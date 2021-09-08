import React from 'react';
import { Box } from 'grommet';
import cn from 'classnames';
import * as styles from './styles.styl';

import { Text } from '../../../../components/Base';

type Props = {
  title: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean
}

export const LargeTab: React.FC<Props> = (props) => {
  const { active = false, onClick, title, disabled = false } = props;
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      basis="full"
      className={cn(
        styles.largeButtonContainer,
        {
          [styles.active]: active,
          [styles.disabled]: disabled
        },
      )}
      onClick={onClick}
      gap="10px"
    >
      <Box align="center">
        <Text size="large" className={styles.title}>
          {title}
        </Text>
      </Box>
    </Box>
  );
}
