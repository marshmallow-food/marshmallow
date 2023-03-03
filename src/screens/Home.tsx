import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from 'src/navigators/AppStack';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.colors.text};
`;

type HomePageProps = NativeStackScreenProps<AppStackParamList, 'home'>;

const HomePageComponent = ({navigation}: HomePageProps): JSX.Element => {
  const {t} = useTranslation();
  return (
    <Container>
      <Title>{t('home')}</Title>
    </Container>
  );
};

export const HomeScreen = memo(HomePageComponent);
