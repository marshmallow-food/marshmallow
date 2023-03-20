import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';
import {useSelector} from 'src/hooks/useSelector';
import {isAuthSelector} from 'src/modules/auth/selectors';
import RNBootSplash from 'react-native-bootsplash';
import {SplashScreen} from 'src/screens/SplashScreen';

const AppRoute = () => {
  const isAuth = useSelector(isAuthSelector);

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {/* Conditional stack navigator rendering based on login state */}
      {isAuth ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppRoute;
