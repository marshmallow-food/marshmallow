import React, {memo, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

const SplashScreenComponent = (): JSX.Element => {
  const hideSplash = () => RNBootSplash.hide({fade: true});

  useEffect(() => {
    setTimeout(hideSplash, 500);
  }, []);
  return <></>;
};

export const SplashScreen = memo(SplashScreenComponent);
