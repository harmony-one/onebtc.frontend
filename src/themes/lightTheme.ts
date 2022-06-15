import { css } from 'styled-components';
import { IPalette } from './types';

const palette: IPalette = {
  Basic1000: '#323846',
  Basic900: '#4E4E64',
  Basic800: '#30303d',
  Basic700: '#737392',
  Basic500: '#9698A7',
  Basic400: '#AFB1C0',
  Basic300: '#D2D6E1',
  Basic200: '#E7ECF7',
  Basic100: '#F5F7FC',
  Purple800: '#37317D',
  Purple600: '#3F398F',
  Purple500: '#4740A1',

  Gray: '#C4C4C4',
  Gray100: '#777777',
  Gray200: '#575757',

  Blue: '#0066B3',

  StandardGray: '#1B1B1C',

  Link: '#1F5AE2',
  TextColor: '#E7ECF7',
  BorderColor: '#E7ECF7',
  SurfaceColor: '#1b1b1c',

  Red: '#F15A22',
  Red500: '#EB4D4B',

  Orange500: '#EE9F18',

  Green500: '#3DBE98',

  StandardBlack: '#000000',
  StandardWhite: '#ffffff',

  Shadow: 'rgba(115, 115, 146, 0.16)',
  Background: 'linear-gradient(171.96deg, #4460DC 0%, #3247A2 89.05%)',

  Green: '#19B97C',
  Black: '#405965',
  // BlackTxt: '#495057',
  BlackTxt: '#212D5E',
};

export const lightTheme: any = {
  layout: {
    bgImage: 'url("/harmony_logo_background.svg") no-repeat bottom right',
  },

  sidebarMenu: {
    icon: {
      color: 'black',
    },
    color: 'black',
    backgroundColorActive: 'rgba(221,221,221,0.4)',
  },

  largeTab: {
    background: '#FFFFFF',
    disabledBackground: '#c2c2c2',
    boxShadow: '0px 10px 21px rgba(0, 173, 232, 0.13)',
  },

  surface: {
    color: '#fff',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.04)',
    border: '1px solid #dedede',
  },
  dashboardCard: {
    background: '#F8F8F8',
    bodyBackground: '#FFFFFF',
  },

  modal: {
    background: '#FFFFFF',
  },

  pager: {
    border: '1px solid',
    color: palette.Gray100,
    colorActive: palette.Gray100,
    backgroundColorActive: 'white',
    borderColor: palette.Gray200,
  },

  // storybook theming
  colorPrimary: 'black',
  colorSecondary: 'lightblue',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: 'Nunito',
  fontCode: 'monospace',

  // Text colors
  textColor: palette.BlackTxt,
  titleColor: palette.Basic800,
  textInverseColor: palette.Basic700,

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'black',
  barBg: '#9a9a9a',

  // Form colors
  inputBg: 'white',
  inputBorder: '#D6D6D6',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Bridge base theme',
  brandUrl: 'https://example.com',
  brandImage: 'https://placehold.it/350x150',

  // grommet styling

  divider: {
    color: '#c2c2c2',
  },

  global: {
    size: {
      // medium: '250px',
    },
    control: {
      disabled: {
        opacity: 0.5,
      },
      border: {
        radius: '2px',
      },
    },
    border: {
      radius: '2px',
    },
    colors: {
      brand: palette.Basic700,

      White1000: '#ffffff',
      Basic1000: '#000000',
      Basic800: '#30303d',
      Basic600: '#939393',
      Basic400: '#D7D7D7',
      Basic300: '#E6E6E6',
      Basic200: '#F5F5F5',
      Basic100: '#FFFFFF',
      Yellow600: '#FFCB02',
      Yellow400: '#FFE06E',
      Yellow200: '#FFF5CC',
      Green500: 'rgba(0,201,167,0.1)',
      Green600: '#00A825',
      Red500: 'rgba(201,0,0,0.1)',
      Red600: '#FF0000',
      Grey700: '#b5b5b5',
      Grey600: '#afb1c0',
      Grey500: '#9698a7',
      Grey400: '#d2d6e1',
      Blue500: '#4740a1',

      border: '#323232',
      focus: 0,
      active: '#FFCB02',
      icon: 'black',
      formBackground: '#f8f8f8',
      text: {
        dark: 'black',
        light: '#323232',
      },
      control: {
        dark: '#f5f5f5',
        light: '#f5f5f5',
      },
      'toggle-knob': 'black',

      buttonBgColor: '#4740a1',
    },
    font: {
      family: 'Helvetica, sans-serif',
      size: '14px',
      height: '20px',
    },
    drop: {
      shadowSize: 0,
    },
    input: {
      border: {
        radius: '2px',
      },
      disabled: {
        opacity: 0.5,
      },
      weight: 400,
    },
    selected: {
      background: 'Yellow400',
      color: 'Basic1000',
    },
    focus: {
      border: {
        color: 'transparent',
      },
    },
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '6px',
      xsmall: '12px',
      small: '16px',
      xmedium: '20px',
      medium: '24px',
      large: '32px',
      xlarge: '40px',
      responsiveBreakpoint: 'small',
    },
  },
  textInput: {
    extend: css`
      ${() => 'font-size: 16px; padding: 8px;'}
    `,
  },
  heading: {
    font: {
      family: 'system-ui, sans-serif',
    },
    weight: 300,

    level: {
      1: {
        font: {
          weight: 300,
        },
        medium: {
          size: '45px',
          height: '54px',
        },
        small: {
          size: '13px',
          height: '18px',
          weight: 'normal',
        },
      },
    },
    extend: css`
      ${(props: any) => props.size === 'small' && 'letter-spacing: 4px;'};
    `,
  },
  text: {
    font: {
      family: 'system-ui, sans-serif',
    },
    small: {
      size: '14px',
      height: '18px',
    },
    medium: {
      size: '16px',
      height: '19px',
    },
    large: {
      size: '30px',
      height: '20px',
    },
  },

  button: {
    color: 'dark',
    border: {
      radius: '22px',
    },
    padding: {
      horizontal: '24px',
      vertical: '18px',
    },
    disabled: {
      opacity: 1.0,
    },
    // extend: css`
    //   ${(props: any) => 'letter-spacing: 4px; text-align: center;'};
    // `,
  },

  spinner: {
    size: {
      xsmall: '4px',
    },
  },

  checkBox: {
    color: {
      light: 'toggle-knob',
    },
    toggle: {
      color: {
        dark: 'toggle-knob',
        light: 'toggle-knob',
      },
    },
    // icons: {
    //   checked: CheckMarkIcon,
    // },
  },

  table: {
    header: {
      pad: { vertical: 'xxsmall' },
      border: undefined,
    },
    body: {
      pad: { vertical: 'medium' },
      verticalAlign: 'top',
    },
    extend: css`
      ${() =>
        'border-collapse: separate; width: 100%; table-layout: fixed; word-break: break-all;}'}
    `,
  },

  selectPresetDefault: {
    option: {
      backgroundColorFocused: palette.Basic100,
      backgroundColorSelected: palette.Basic200,
    },
    control: {
      backgroundColor: palette.StandardWhite,
    },
    menu: {
      borderColor: palette.Gray200,
      backgroundColor: palette.StandardWhite,
    },
  },

  selectPresetFilter: {
    option: {
      backgroundColorFocused: palette.Basic100,
      backgroundColorSelected: palette.Basic200,
    },
    control: {
      borderColor: palette.Gray200,
      backgroundColor: palette.StandardWhite,
    },
    menu: {
      borderColor: palette.Gray200,
      backgroundColor: palette.StandardWhite,
    },
  },

  select: {
    border: {
      radius: '2px',
    },
    borderRadius: '15px',
    color: 'black',
    background: palette.Basic100,
    icons: {
      color: palette.Basic700,
    },
    options: {
      text: {
        margin: '0 5px',
        letterSpacing: '0',
      },
    },
    control: {
      extend: () => `
        border: none;
        outline: none;
        box-shadow: none;
        background-color: red;
        &:active {
          border: none;
          outline: none;
          box-shadow: none;
        }
      `,
    },
    container: {
      extend: (props: any) => `
        font-family: ${props.theme.fontBase};
        outline: none;
        box-shadow: none;
        
        * {
          font-size: 16px;
        }
      `,
    },
  },

  palette,

  sizes: {
    linear: {
      small: '100px',
      medium: '144px',
      large: '200px',
      xlarge: '240px',
      xxlarge: '300px',
      full: '100%',
      auto: 'auto',
    },
    text: {
      xxsmall: '12px',
      xsmall: '13px',
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '22px',
    },
    title: {
      xxsmall: '16px',
      xsmall: '18px',
      small: '21px',
      medium: '24px',
      large: '28px',
      xlarge: '36px',
    },
    defaults: {
      linear: 'auto',
    },
  },

  fonts: {
    title: 'Nunito',
  },

  container: {
    minWidth: '300px',
    maxWidth: '1200px',
  },

  styled: {
    button: {
      padding: '16px',
      border: `1px solid ${palette.Purple500}`,
      fontSize: '16px',
    },

    tabs: {
      activeBorderBottomColor: palette.Purple500,
      activeBorderBottomWidth: 2,
      tab: {
        color: 'black',
        colorActive: palette.Purple500,
        backgroundColor: 'transparent',
        backgroundColorActive: 'transparent',
        border: 'none',
        letterSpacing: '0',
        fontSize: '15px',
        padding: '20px 0',
        margin: '0 32px 0 0',
      },
    },

    input: {
      bgColor: 'white',
      textColor: '#212D5E',
      border: `1px solid ${palette.Basic200}`,
      borderRadius: '4px',
      disabledColor: palette.Basic300,
      minHeight: '45px',
      customDDSeparator: {
        margin: 0,
        backgroundColor: palette.Basic200,
      },
      ddIndicatorProps: {
        pad: '8px',
        size: '10px',
      },
    },

    colors: {
      colorPrimary: palette.Purple500,
      colorSecondary: 'white',
      buttonBgColor: '#1c2a5e',
      // buttonBgColor: '#03ade8',
      buttonHoverBgColor: '#03ade8',
      buttonColor: 'white',
    },
  },
};
