import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Navigations} from '../navigation';

const SplashScreenComponent = (): JSX.Element => {
  // TODO: сделать общий ресет при разных стаках
  const {reset} = useNavigation<Navigations['splash']>();

  const hideSplash = () => RNBootSplash.hide({fade: true});

  useEffect(() => {
    reset({
      index: 0,
      routes: [{name: 'settings'}],
    });
    setTimeout(hideSplash, 450);
  }, [reset]);
  return <></>;
};

export const SplashScreen = memo(SplashScreenComponent);
