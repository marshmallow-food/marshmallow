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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigators/AuthStack';
import {useDispatch, useSelector} from '../hooks/useSelector';
import {themeSelector} from '../modules/app/selectors';
import {useForm, Controller} from 'react-hook-form';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from '../components/icons/ArrowLeft';
import {phoneMask} from '../lib/mask';
import {requestOTP} from 'src/modules/auth/actions';
import Header from 'src/components/dumb/Header';
import normalize from 'react-native-normalize';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
`;

const Wrapper = styled(View)`
  flex: 1;
  padding: 20px;
  gap: 20px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.white};
`;

type AuthPageProps = NativeStackScreenProps<
  AuthStackParamList,
  'authentication'
>;

const AuthScreen = ({navigation}: AuthPageProps): JSX.Element => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const {
    control,
    trigger,
    handleSubmit,
    formState: {isValid, isSubmitting, errors},
  } = useForm({
    defaultValues: {
      phone: '+7',
    },
  });

  const showKeyboard = async () => {
    setKeyboardActive(true);
  };

  const hideKeyboard = async () => {
    await trigger('phone');
    setKeyboardActive(false);
    Keyboard.dismiss();
  };

  const onSubmit = (data: {phone: string}) => {
    dispatch(requestOTP.request(data));
    navigation.navigate('otp');
  };

  return (
    //TODO: - Write hoc Component for TouchableWithoutFeedback
    <Container>
      <TouchableWithoutFeedback onPress={hideKeyboard} accessible={false}>
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
                  required: {value: true, message: t('required')},
                  minLength: {value: 12, message: t('phoneMinLength')},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputAdapter
                    error={errors.phone}
                    value={value}
                    onFocus={showKeyboard}
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

const AuthenticationScreenOptions: NativeStackNavigationOptions = {
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

export {AuthenticationScreenOptions};
export const AuthenticationScreen = memo(AuthScreen);
