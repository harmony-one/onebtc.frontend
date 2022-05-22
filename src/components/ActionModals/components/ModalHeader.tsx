import * as React from 'react';
import { Box } from 'grommet';
import { Title, Button } from 'components/Base';
import { CloseIcon } from 'ui/Icons';

interface IProps {
  onClose?: () => any;
  title: string;
}

export const ModalHeader: React.FC<IProps> = ({ title, onClose }) => {
  return (
    <Box fill style={{ position: 'relative' }} align="center">
      <Title align="center" style={{ wordBreak: 'break-word' }}>
        {title}
      </Title>
      {onClose && (
        <div style={{ position: 'absolute', right: '-18px', top: '-18px' }}>
          <Button
            bgHoverColor="#c2c2c2"
            icon
            pad="8px"
            onClick={onClose}
            transparent
          >
            <CloseIcon />
          </Button>
        </div>
      )}
    </Box>
  );
};

ModalHeader.displayName = 'ModalHeader';
