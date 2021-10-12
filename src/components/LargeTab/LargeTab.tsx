import React, { useCallback } from 'react';
import { Box } from 'grommet';
import cn from 'classnames';
import * as styles from './styles.styl';

import { Text } from '../Base';

type Props = {
  title: string;
  id?: string;
  onClick: (id?: string) => void;
  active?: boolean;
  disabled?: boolean;
};

export const LargeTab: React.FC<Props> = props => {
  const { id, active = false, onClick, title, disabled = false } = props;

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }

    onClick(id);
  }, [disabled, id, onClick]);

  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      basis="full"
      className={cn(styles.largeButtonContainer, {
        [styles.active]: active,
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
      gap="10px"
    >
      <Box align="center">
        <Text size="large" className={styles.title}>
          {title}
        </Text>
      </Box>
    </Box>
  );
};
