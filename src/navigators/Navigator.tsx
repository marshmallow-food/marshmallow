import * as React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';

const AppRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      {/* Conditional stack navigator rendering based on login state */}
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppRoute;
