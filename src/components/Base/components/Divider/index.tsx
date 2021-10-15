import React from 'react';
import cn from 'classnames';
import * as styles from './styles.styl';

type Props = {
  colorful?: boolean;
  fullwidth?: boolean;
};

export const Divider: React.FC<Props> = ({
  colorful = false,
  fullwidth = false,
}) => {
  const classes = cn(styles.common, {
    [styles.colorful]: colorful,
    [styles.fullwidth]: fullwidth,
  });
  return <div className={classes} />;
};

interface DividerVerticalProps {}

export const DividerVertical: React.FC<DividerVerticalProps> = () => {
  const classes = cn(styles.verticalCommon);
  return <div className={classes} />;
};
