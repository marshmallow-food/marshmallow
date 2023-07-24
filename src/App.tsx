import React, {memo, ReactNode} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppRoute from './navigators/Navigator';
import {store} from './store';
import {ThemeProvider} from 'styled-components';
import {useSelector} from './hooks/useSelector';
import {themeTypeSelector} from './modules/app/selectors';
import {useColorScheme} from 'react-native';
import {Themes} from './theme';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:
    'https://3de9fad4af1d41f4ba37d75a00077bc2@o4504612332306432.ingest.sentry.io/4504612333879296',
  normalizeDepth: 10,
});

const AppThemeProvider = ({children}: {children: ReactNode | ReactNode[]}) => {
  const userSelectedThemeType = useSelector(themeTypeSelector);
  const systemThemeType = useColorScheme();
  const themeType =
    userSelectedThemeType === 'system' && systemThemeType
      ? systemThemeType
      : userSelectedThemeType;
  const theme = Themes[themeType];

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={theme.barStyle} />
      {children}
    </ThemeProvider>
  );
};

const AppComponent = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <AppRoute />
      </AppThemeProvider>
    </Provider>
  );
};

export default memo(Sentry.wrap(AppComponent));
