import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import styled from 'styled-components';
import InputAdapter from '../components/dumb/InputAdapter';
import Button from '../components/dumb/Button';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'src/navigators/AuthStack';
import {Themes} from '../theme';
import {useSelector} from '../hooks/useSelector';
import {themeTypeSelector} from '../modules/app/selectors';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {otpMask} from '../lib/mask';
import ArrowLeft from '../components/icons/ArrowLeft';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
`;

const Wrapper = styled(View)`
  flex: 1;
  padding: 20px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.white};
`;

type OTPPageProps = NativeStackScreenProps<AuthStackParamList, 'otp'>;

const OTPPageComponent = ({navigation}: OTPPageProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = Themes[useSelector(themeTypeSelector)];
  const [keyboardActive, setKeyboardActive] = useState(false);

  const {
    control,
    formState: {isValid, isSubmitting},
  } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const showKeyboard = () => {
    setKeyboardActive(true);
  };

  const hideKeyboard = () => {
    setKeyboardActive(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log('submitted');
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={hideKeyboard} style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({ios: 'padding'})}
          keyboardVerticalOffset={keyboardActive ? 100 : 0}>
          <Wrapper>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 4,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputAdapter
                  value={value}
                  onBlur={onBlur}
                  onFocus={showKeyboard}
                  label={t('codeFromSMS')}
                  mask={otpMask}
                  keyboardType={'numeric'}
                  onChangeText={(unmasked) => onChange(unmasked)}
                  placeholder="0000"
                />
              )}
              name="code"
            />
            <Button
              title={t('getCode')}
              onPress={() => navigation.navigate('otp')}
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const OTPScreenOptions: NativeStackNavigationOptions = {
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

export {OTPScreenOptions};
export const OTPScreen = memo(OTPPageComponent);
