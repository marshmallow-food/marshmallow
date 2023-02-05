import {DefaultTheme as AppTheme} from 'src/theme';

declare module 'styled-components' {
  type Theme = typeof AppTheme;
  /* eslint-disable  @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends Theme {}
}
