import React, {memo, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Text} from 'react-native';

const SplashScreenComponent = (): JSX.Element => {
  const hideSplash = () => RNBootSplash.hide({fade: true});

  useEffect(() => {
    setTimeout(hideSplash, 450);
  }, []);
  return (
    <>
      <Text>Splash Screen</Text>
    </>
  );
};

export const SplashScreen = memo(SplashScreenComponent);
