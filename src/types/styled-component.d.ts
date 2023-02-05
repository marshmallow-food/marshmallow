import {} from 'styled-components';
import {DefaultTheme as AppTheme} from 'src/theme';

declare module 'styled-components' {
  type Theme = typeof AppTheme;
  export interface DefaultTheme extends Theme {}
}
