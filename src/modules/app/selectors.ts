import {RootState} from '../../store';
import {Themes} from '../../theme';

export const themeTypeSelector = (state: RootState) => state.app.theme;

export const themeSelector = (state: RootState) => Themes[state.app.theme];
