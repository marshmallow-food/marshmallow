import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, View, ImageBackground, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Button from 'src/components/dumb/Button';
import {useSelector} from 'src/hooks/useSelector';
import {themeSelector, themeTypeSelector} from 'src/modules/app/selectors';
import {AuthStackParamList} from 'src/navigators/AuthStack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ImagesAssets} from '../../assets/img/ImageAssets';
import normalize from 'react-native-normalize';
import Logo from './../components/icons/Logo';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

type WelcomePageProps = NativeStackScreenProps<AuthStackParamList, 'welcome'>;

const WelcomePageComponent = ({navigation}: WelcomePageProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = useSelector(themeSelector);
  const themeType = useSelector(themeTypeSelector);
  return (
    <ImageBackground
      source={
        themeType === 'light'
          ? ImagesAssets.backgroundLight
          : ImagesAssets.backgroundDark
      }
      style={styles.image}>
      <Container>
        <View style={styles.logo}>
          <Logo />
        </View>
        <Button
          title={t('authorization')}
          underlayColor={theme.colors.white}
          onPress={() => navigation.navigate('authentication')}
          buttonStyle={{
            width: '100%',
            alignSelf: 'center',
            borderRadius: normalize(30),
            padding: 15,
            backgroundColor: theme.colors.white,
          }}
          titleStyle={{
            fontSize: normalize(13),
            textAlign: 'center',
            fontFamily: 'Comfortaa-Bold',
            color: theme.colors.textPrimary,
            lineHeight: normalize(24),
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        />
      </Container>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    padding: 20,
    resizeMode: 'cover',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const WelcomeScreen = memo(WelcomePageComponent);
