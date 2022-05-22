import { CSSProperties } from 'react';
import { StylesConfig } from 'react-select';
import { styleFn } from 'react-select/src/styles';
import { getSize } from '../../common';
import { getInputBorder } from '../TextInput';

type GetStyles = (
  type?: SelectType,
  customStyles?: SelectCustomStyles,
) => StylesConfig;

export const getStyles: GetStyles = (type, customStyles) => {
  let result: StylesConfig = {};

  if (type && presets[type]) {
    result = { ...result, ...presets[type] };
  }

  if (customStyles) {
    result = injectCustomStyles(result, customStyles);
  }

  return result;
};

const injectCustomStyles = (
  source: StylesConfig,
  customStyles: SelectCustomStyles,
): StylesConfig => {
  const result = { ...source };
  const customizedParts = Object.keys(customStyles) as [keyof StylesConfig];

  for (const part of customizedParts) {
    result[part] = (baseStyles, selectState) => {
      const providedStyleFn = source[part];
      const providedStyles =
        (providedStyleFn && providedStyleFn(baseStyles, selectState)) || {};

      const injectedCustomStyles =
        typeof customStyles[part] === 'function'
          ? (customStyles[part] as styleFn)(baseStyles, selectState)
          : (customStyles[part] as CSSProperties);

      return {
        ...providedStyles,
        ...injectedCustomStyles,
      };
    };
  }

  return result;
};

const defaultPreset: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? state.theme.palette.Gray100
      : state.isSelected
      ? state.theme.palette.Gray200
      : 'transparent',
    color: state.theme.textColor,
    padding: '16px',
    fontSize: '14px',
    fontFamily: state.theme.fontBase,
  }),
  control: (provided, props) => ({
    ...provided,
    width: getSize(props.selectProps.size, props.theme),
    fontFamily: props.theme.fontBase,
    fontSize: '15px',
    border: 'none',
    borderTop: getInputBorder(props, 'Top'),
    borderRight: getInputBorder(props, 'Right'),
    borderBottom: getInputBorder(props, 'Bottom'),
    borderLeft: getInputBorder(props, 'Left'),
    backgroundColor: props.theme.palette.StandardGray,
    color: props.theme.styled.input.textColor,
    padding: '4px 8px',
    borderRadius: props.theme.select.borderRadius,
    minHeight: props.theme.styled.input.minLength || 38,
    borderColor: `${props.theme.palette.Basic200} !important`,
    boxShadow: 'none',
  }),
  indicatorSeparator: (provided, props) => {
    // const { customDDSeparator } = props.theme.styled.input;
    // if (customDDSeparator) {
    //   return {
    //     ...provided,
    //     ...customDDSeparator,
    //   };
    // }

    return { display: 'none' };
  },
  menu: (provided, props) => ({
    ...provided,
    borderRadius: '15px',
    border: `1px solid ${props.theme.palette.StandardBlack}`,
    overflow: 'hidden',
    padding: '0px',
    borderColor: `${props.theme.palette.StandardWhite} !important`,
    backgroundColor: props.theme.palette.StandardGray,
  }),
};

const filterPreset: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? state.theme.palette.Gray100
      : state.isSelected
      ? state.theme.palette.Gray200
      : 'transparent',
    color: state.theme.textColor,
    padding: '16px',
    fontSize: '13px',
    fontFamily: state.theme.fontBase,
  }),
  control: (provided, props) => ({
    ...provided,
    width: getSize(props.selectProps.size, props.theme),
    fontFamily: props.theme.fontBase,
    fontSize: '15px',
    border: props.theme.styled.input.border,
    backgroundColor: props.theme.select.background,
    color: props.theme.styled.input.textColor,
    padding: '4px 8px',
    borderRadius: props.theme.select.borderRadius,
    borderColor: `${props.theme.palette.Basic200} !important`,
    boxShadow: 'none',
    minHeight: '32px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: () => ({
    padding: '0 12px',
  }),
  menu: (provided, props) => ({
    ...provided,
    borderRadius: '15px',
    border: `1px solid ${props.theme.palette.StandardBlack}`,
    overflow: 'hidden',
    padding: '0px',
    borderColor: `${props.theme.palette.StandardWhite} !important`,
    backgroundColor: props.theme.palette.StandardBlack,
  }),
};

const presets: Record<SelectType, StylesConfig> = {
  default: defaultPreset,
  filter: filterPreset,
};

export type SelectType = 'default' | 'filter';
export type SelectCustomStyles =
  | StylesConfig
  | Partial<Record<keyof StylesConfig, CSSProperties>>;
