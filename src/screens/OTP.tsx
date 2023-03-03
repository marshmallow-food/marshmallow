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
import {useDispatch, useSelector} from '../hooks/useSelector';
import {themeSelector} from '../modules/app/selectors';
import {phoneSelector} from '../modules/auth/selectors';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {otpMask} from '../lib/mask';
import ArrowLeft from '../components/icons/ArrowLeft';
import {verifyOTP} from 'src/modules/auth/actions';
import normalize from 'react-native-normalize';
import Header from 'src/components/dumb/Header';

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
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const phone = useSelector(phoneSelector);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const {
    control,
    handleSubmit,
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

  const onSubmit = (data: {code: string}) => {
    if (phone) {
      const verifyData = {
        ...data,
        phone: phone,
      };
      dispatch(verifyOTP.request(verifyData));
    }
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={hideKeyboard} style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({ios: 'padding'})}
          keyboardVerticalOffset={keyboardActive ? 100 : 0}>
          <Wrapper>
            <View style={{width: '100%'}}>
              <Header
                title={t('authorization')}
                titleStyle={{textAlign: 'left', marginBottom: 10}}
              />
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
            </View>
            <Button
              title={t('getCode')}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
              underlayColor={theme.colors.primaryFont}
              buttonStyle={{
                width: '100%',
                alignSelf: 'center',
                backgroundColor: theme.colors.primaryFont,
                borderRadius: normalize(40),
                paddingTop: 18,
                paddingBottom: 18,
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowRadius: 8,
                elevation: 13,
              }}
              titleStyle={{
                fontSize: normalize(13),
                textAlign: 'center',
                fontFamily: 'Comfortaa-Regular',
                lineHeight: normalize(14),
                color: theme.colors.white,
                textTransform: 'uppercase',
              }}
              disabledButtonStyle={{
                backgroundColor: theme.colors.buttonBlue,
                color: theme.colors.white,
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowOffset: {
                  width: 8,
                  height: 8,
                },
                shadowRadius: 2,
                elevation: 2,
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
    const theme = useSelector(themeSelector);
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
