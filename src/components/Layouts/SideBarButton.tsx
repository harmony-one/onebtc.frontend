import React from 'react';
import { Button, ButtonExtendedProps } from 'grommet/components/Button';
import * as s from './SideBarButton.styl';

type Props = {} & Pick<
  ButtonExtendedProps,
  'active' | 'icon' | 'label' | 'onClick'
>;

export const SideBarButton: React.FC<Props> = props => {
  return (
    <Button
      className={s.root}
      plain
      label="Bridge"
      justify="start"
      fill="horizontal"
      {...props}
    />
  );
};

SideBarButton.displayName = 'SideBarButton';
