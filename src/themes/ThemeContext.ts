import * as React from 'react';
import { baseTheme } from './baseTheme';

export type ThemeType = 'dark' | 'light';
export type ThemeContext = {
  theme: typeof baseTheme;
  themeType: ThemeType;
  toggle: () => void;
};

export const ThemeContext = React.createContext<ThemeContext>({
  theme: baseTheme,
  themeType: 'dark',
  toggle: () => {},
});
