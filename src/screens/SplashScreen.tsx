import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {AuthenticationNavigations, Navigations} from '../navigation';

const SplashScreenComponent = (): JSX.Element => {
  // TODO: сделать общий ресет при разных стаках
  const {reset} = useNavigation<AuthenticationNavigations['splash']>();

  const hideSplash = () => RNBootSplash.hide({fade: true});

  useEffect(() => {
    reset({
      index: 0,
      routes: [{name: 'welcome'}],
    });
    setTimeout(hideSplash, 450);
  }, [reset]);
  return <></>;
};

export const SplashScreen = memo(SplashScreenComponent);
