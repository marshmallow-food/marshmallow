import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, View} from 'react-native';
import styled from 'styled-components';
import Button from 'src/components/dumb/Button';
import {useSelector} from 'src/hooks/useSelector';
import {themeTypeSelector} from 'src/modules/app/selectors';
import {Themes} from 'src/theme';
import {AuthStackParamList} from 'src/navigators/AuthStack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const Wrapper = styled(View)`
  flex: 1;
  padding: 20px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.colors.background};
`;

type WelcomePageProps = NativeStackScreenProps<AuthStackParamList, 'welcome'>;

const WelcomePageComponent = ({navigation}: WelcomePageProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = Themes[useSelector(themeTypeSelector)];

  return (
    <Container>
      <Wrapper>
        <Button
          title={t('signIn')}
          onPress={() => navigation.navigate('authentication')}
          buttonColor={theme.colors.dimGray}
          titleColor={theme.colors.greenGray}
          buttonStyle={{
            width: '100%',
            alignSelf: 'center',
            borderRadius: 20,
            padding: 15,
          }}
          textStyle={{fontSize: 20, textAlign: 'center'}}
        />
      </Wrapper>
    </Container>
  );
};

export const WelcomeScreen = memo(WelcomePageComponent);
