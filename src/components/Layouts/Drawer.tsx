import React, { useContext } from 'react';
import { Header, Layer } from 'grommet';
import { Button } from 'grommet/components/Button';
import { Close } from 'grommet-icons';
import { BridgeLogo } from '../BridgeLogo';
import styled from 'styled-components';
import { ThemeContext } from '../../themes/ThemeContext';

interface Props {
  onClose: () => void;
}

const StyledLayer = styled(Layer)`
  background-color: ${props => props.theme.surfaceColor};
`;

export const Drawer: React.FC<Props> = ({ onClose, children }) => {
  const themeContext = useContext(ThemeContext);
  const iconColor = themeContext.themeType === 'dark' ? 'white' : 'black';

  return (
    <StyledLayer position="left" full="vertical">
      <Header pad="medium">
        <BridgeLogo />
        <Button onClick={onClose} icon={<Close color={iconColor} />} />
      </Header>
      {children}
    </StyledLayer>
  );
};

Drawer.displayName = 'Drawer';
