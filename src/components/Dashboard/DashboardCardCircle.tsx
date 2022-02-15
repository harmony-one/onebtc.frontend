import React from 'react';
import cn from 'classnames';
import { Box } from 'grommet';
import * as s from './DashboardCard.styl';
import { Text } from '../Base';

type Props = {
  title: string;
  subtext: string | number | React.ReactNode;
  status: 'error' | 'success';
};

export const DashboardCardCircle: React.FC<Props> = ({
  title,
  subtext,
  status,
}) => {
  return (
    <Box
      align="center"
      justify="center"
      className={cn(s.circled, {
        [s.successBorder]: status === 'success',
        [s.errorBorder]: status === 'error',
      })}
    >
      <Text
        bold
        size="xlarge"
        className={cn({
          [s.success]: status === 'success',
          [s.error]: status === 'error',
        })}
      >
        {title}
      </Text>
      <Text bold size="large">
        {subtext}
      </Text>
    </Box>
  );
};

DashboardCardCircle.displayName = 'DashboardCircledContent';
