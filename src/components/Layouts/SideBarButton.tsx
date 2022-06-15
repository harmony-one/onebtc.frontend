import React from 'react';
import { Button, ButtonExtendedProps } from 'grommet/components/Button';
import * as s from './SideBarButton.styl';
import styled from 'styled-components';

type Props = {} & Pick<
  ButtonExtendedProps,
  'active' | 'icon' | 'label' | 'onClick'
>;

const ButtonStyled = styled(Button)`
  padding: 8px 12px;
  border-radius: 4px;
  color: ${props => props.theme.sidebarMenu.color};
  background-color: ${props =>
    props.active ? props.theme.sidebarMenu.backgroundColorActive : ''};
`;

export const SideBarButton: React.FC<Props> = props => {
  return (
    <ButtonStyled
      plain
      label="Bridge"
      justify="start"
      fill="horizontal"
      {...props}
    />
  );
};

SideBarButton.displayName = 'SideBarButton';
