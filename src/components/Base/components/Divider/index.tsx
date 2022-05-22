import React from 'react';
import styled from 'styled-components';

type Props = {
  colorful?: boolean;
  fullwidth?: boolean;
};

const DividerBase = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.divider.color};
`;

const DividerColorful = styled(DividerBase)`
  height: 2px;

  background: rgb(0, 173, 232);
  background: linear-gradient(
    90deg,
    rgba(0, 173, 232, 1) 0%,
    rgba(0, 232, 162, 1) 100%
  );
`;

DividerColorful.displayName = 'DividerColorful';

export const Divider: React.FC<Props> = ({ colorful = false }) => {
  if (colorful) {
    return <DividerColorful />;
  }
  return <DividerBase />;
};

export const DividerVertical = styled.div`
  border-left: 1px solid ${props => props.theme.divider.color};
`;

DividerVertical.displayName = 'DividerVertical';
