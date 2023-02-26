import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styled from 'styled-components';
import InputAdapter from '../components/dumb/InputAdapter';
import Button from '../components/dumb/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigators/AuthStack';
import {Themes} from '../theme';
import {useSelector} from '../hooks/useSelector';
import {themeTypeSelector} from '../modules/app/selectors';
import {useForm, Controller} from 'react-hook-form';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from '../components/icons/ArrowLeft';
import {phoneMask} from '../lib/mask';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.white};
`;

const Wrapper = styled(View)`
  flex: 1;
  padding: 15px;
  gap: 20px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.white};
`;

type AuthPageProps = NativeStackScreenProps<
  AuthStackParamList,
  'authentication'
>;

const AuthScreen = ({navigation}: AuthPageProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = Themes[useSelector(themeTypeSelector)];
  const {
    control,
    handleSubmit,
    formState: {isValid, isSubmitting},
  } = useForm({
    defaultValues: {
      phone: '+7',
    },
  });

  const onSubmit = () => {
    navigation.navigate('otp');
  };

  return (
    //TODO: - Write hoc Component for TouchableWithoutFeedback
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Wrapper>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 12,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputAdapter
                value={value}
                label={t('phoneNumber')}
                mask={phoneMask}
                keyboardType={'phone-pad'}
                onBlur={onBlur}
                onChangeText={(unmasked) => onChange(unmasked)}
                placeholder="+7"
              />
            )}
            name="phone"
          />
          <Button
            title={t('getCode')}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            buttonStyle={{
              width: '100%',
              alignSelf: 'center',
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              paddingTop: 13,
              paddingBottom: 13,
            }}
            titleStyle={{
              fontSize: 20,
              textAlign: 'center',
              fontFamily: 'Lato-Semibold',
              lineHeight: 24,
              color: theme.colors.white,
            }}
            disabledButtonStyle={{
              backgroundColor: 'rgba(249, 156, 0, 0.5)',
            }}
          />
        </Wrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const AuthenticationScreenOptions: NativeStackNavigationOptions = {
  headerLeft: () => {
    const theme = Themes[useSelector(themeTypeSelector)];
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
      navigation.goBack();
    };
    return (
      <Button
        onPress={handleBackButtonPress}
        underlayColor={theme.colors.white}
        buttonStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={<ArrowLeft />}
      />
    );
  },
};

export {AuthenticationScreenOptions};
export const AuthenticationScreen = memo(AuthScreen);