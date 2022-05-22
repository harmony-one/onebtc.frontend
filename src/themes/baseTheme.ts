export interface IStyledProps {
  theme?: ITheme;
}

export interface ITheme {
  palette: IPalette;
  container: IBaseContainer;
}

export interface IPalette {
  Basic1000: string;
  Basic900: string;
  Basic800: string;
  Basic700: string;
  Basic500: string;
  Basic400: string;
  Basic300: string;
  Basic200: string;
  Basic100: string;
  Purple800: string;
  Purple600: string;
  Purple500: string;

  Blue: string;
  Link: string;
  TextColor: string;
  BorderColor: string;
  SurfaceColor: string;
  Red: string;
  Red500: string;
  Gray: string;
  Gray100: string;
  Gray200: string;

  Orange500: string;

  Green500: string;

  StandardBlack: string;
  StandardWhite: string;
  StandardGray: string;
  Shadow: string;
  Background: string;

  Green: string;
  Black: string;
  BlackTxt: string;
}

export interface IBaseContainer {
  minWidth?: string;
  maxWidth?: string;
}

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

  Blue: '#1F5AE2',
  Link: '#1F5AE2',
  TextColor: '#E7ECF7',
  BorderColor: '#E7ECF7',
  SurfaceColor: '#1b1b1c',

  Red: '#F15A22',
  Red500: '#EB4D4B',

  Orange500: '#EE9F18',

  Green500: '#3DBE98',

  StandardBlack: '#000000',
  StandardWhite: '#E7ECF7',
  StandardGray: '#1B1B1C',

  Shadow: 'rgba(115, 115, 146, 0.16)',
  Background: 'linear-gradient(171.96deg, #4460DC 0%, #3247A2 89.05%)',

  Green: '#19B97C',
  Black: '#405965',
  // BlackTxt: '#495057',
  BlackTxt: '#212D5E',
};

export const baseTheme: any = {
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
  surfaceColor: '#1b1b1c',

  // Text colors
  textColor: palette.TextColor,
  titleColor: palette.TextColor,
  textInverseColor: palette.Basic700,

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'black',
  barBg: '#9a9a9a',
  borderColor: palette.BorderColor,

  // Form colors
  inputBg: 'white',
  inputBorder: '#D6D6D6',
  inputTextColor: 'black',
  inputBorderRadius: 4,
  tableLoaderBackground: '#000000',

  divider: {
    color: '#c2c2c2',
  },

  brandTitle: 'Bridge base theme',
  brandUrl: 'https://example.com',
  brandImage: 'https://placehold.it/350x150',

  // grommet styling

  global: {
    colors: {
      brand: palette.Basic700,
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

  select: {
    background: palette.StandardBlack,
    borderRadius: '15px',
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
      border: `1px solid ${palette.Blue}`,
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
      bgColor: '#1B1B1C',
      textColor: '#FFFFFF',
      border: `1px solid ${palette.Basic200}`,
      borderRadius: '15px',
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
      colorPrimary: palette.Blue,
      colorSecondary: 'white',
      buttonBgColor: '#1F5AE2',
      // buttonBgColor: '#03ade8',
      buttonHoverBgColor: '#03ade8',
      buttonColor: 'white',
    },
  },
};
