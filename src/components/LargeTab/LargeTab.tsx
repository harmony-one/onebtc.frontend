import React, { useCallback } from 'react';
import { Box } from 'grommet';
import cn from 'classnames';
import * as styles from './styles.styl';
import { Text } from '../Base';
import styled from 'styled-components';
import { prop } from 'bitcoinjs-lib/types/payments/lazy';

type Props = {
  title: string;
  id?: string;
  onClick: (id?: string) => void;
  active?: boolean;
  disabled?: boolean;
};

const TabContainer = styled(Box)<Partial<Props>>`
  ${props =>
    props.active &&
    `
    &:after {
      display: block;
      position: absolute;
      content: '';
      width: 100%;
      height: 4px;
      bottom: 0;
      background: linear-gradient(269.98deg, #69FABC -0.02%, #00ADE8 100%);
    }
  `}

  padding: 16px;

  box-shadow: ${props => props.theme.largeTab.boxShadow};
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  opacity: ${props => (props.active ? 1 : 0.6)};

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  background: ${props =>
    props.disabled
      ? props.theme.largeTab.disabledBackground
      : props.theme.largeTab.background};
`;

export const LargeTab: React.FC<Props> = props => {
  const { id, active = false, onClick, title, disabled = false } = props;

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }

    onClick(id);
  }, [disabled, id, onClick]);

  return (
    <TabContainer
      active={active}
      disabled={disabled}
      direction="column"
      align="center"
      justify="center"
      fill="horizontal"
      onClick={handleClick}
    >
      <Box align="center">
        <Text size="large" className={styles.title}>
          {title}
        </Text>
      </Box>
    </TabContainer>
  );
};
