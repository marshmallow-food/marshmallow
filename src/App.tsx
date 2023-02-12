import {NavigationContainer} from '@react-navigation/native';
import React, {memo, ReactNode} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {AuthStack} from './navigators/AuthStack';
import {store} from './store';
import {ThemeProvider} from 'styled-components';
import {useSelector} from './hooks/useSelector';
import {themeTypeSelector} from './modules/app/selectors';
import {useColorScheme} from 'react-native';
import {Themes} from './theme';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://ad98ed3a950d42ba91e1dde3c8e4ea18@o4504612332306432.ingest.sentry.io/4504612333879296',
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
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </AppThemeProvider>
    </Provider>
  );
};

export default memo(Sentry.wrap(AppComponent));
