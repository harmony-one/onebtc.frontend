import { Box } from 'grommet';
import { Text } from 'components/Base';
import * as React from 'react';
import styled from 'styled-components';

const MainBox = styled(Box)<any>`
  * {
    font-family: ${props =>
      props.theme.fontBase || 'Roboto-Medium", sans-serif'};
  }
`;

export interface IFieldWrapperProps {
  title: string;
  label: string;
  children: any;
  className: string;
  help: string;
  error: string;
  visible: boolean;
  isRowLabel: boolean;
  margin?: object;
  inputLabel?: React.ReactNode;
}

export const FieldWrapper = (props: IFieldWrapperProps) => {
  const {
    title,
    label,
    children,
    className,
    help,
    error,
    visible = true,
    isRowLabel,
    margin,
    inputLabel,
  } = props;

  const text = title || label;

  return (
    <>
      {visible && (
        <MainBox
          margin={margin ? margin : { bottom: 'small' }}
          className={className}
        >
          {!isRowLabel && (
            <Box justify="center">
              {text && (
                <Text
                  margin={{ bottom: '8px' }}
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  {text}
                </Text>
              )}
              {inputLabel}
              {children}
            </Box>
          )}
          {isRowLabel && (
            <Box direction="row" align="start">
              {children}
              {label && <Text margin={{ top: '4px' }}>{label}</Text>}
            </Box>
          )}
          {help && (
            <Box margin={{ top: 'xsmall' }}>
              <Text size="small" color="#FF0000">
                {help}
              </Text>
            </Box>
          )}
          {error && (
            <Box margin={{ top: 'xsmall' }}>
              <Text size="small" color="#FF0000">
                {error}
              </Text>
            </Box>
          )}
        </MainBox>
      )}
    </>
  );
};
