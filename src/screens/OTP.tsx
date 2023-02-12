import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styled from 'styled-components';
import InputAdapter from 'src/components/dumb/InputAdapter';
import Button from 'src/components/dumb/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'src/navigators/AuthStack';
import {Themes} from 'src/theme';
import {useSelector} from 'src/hooks/useSelector';
import {themeTypeSelector} from 'src/modules/app/selectors';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-easy-icon';

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const Wrapper = styled(View)`
  flex: 1;
  padding: 20px;
  gap: 20px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.background};
`;

type OTPPageProps = NativeStackScreenProps<AuthStackParamList, 'otp'>;

const OTPPageComponent = ({navigation}: OTPPageProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = Themes[useSelector(themeTypeSelector)];

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          buttonColor={theme.colors.dimGray}
          buttonStyle={{
            borderRadius: 20,
            width: 50,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          icon={
            <Icon
              type="antdesign"
              name="arrowleft"
              size={20}
              color={theme.colors.black}
            />
          }
        />
      ),
    });
  }, [navigation]);
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          buttonColor={theme.colors.dimGray}
          buttonStyle={{
            borderRadius: 20,
            width: 50,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          icon={
            <Icon
              type="material"
              name="arrow-back"
              size={20}
              color={theme.colors.black}
            />
          }
        />
      ),
    });
  }, [navigation]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      code: '',
    },
  });
  const onSubmit = () => {
    // console.log('submitted')
  };
  return (
    //TODO: - Write hoc Component for TouchableWithoutFeedback
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Wrapper>
          <Controller
            control={control}
            //TODO: - Write validators
            rules={{
              required: true,
              minLength: 4,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputAdapter
                value={value}
                label={t('otpCode')}
                mask={'[0000]'}
                keyboardType={'numeric'}
                onChangeText={(extracted) => onChange(extracted)}
                placeholder="0000"
              />
            )}
            name="code"
          />
          <Button
            title={t('continue')}
            onPress={() => navigation.navigate('otp')}
            buttonColor={theme.colors.dimGray}
            titleColor={theme.colors.greenGray}
            buttonStyle={{
              width: '80%',
              alignSelf: 'center',
              borderRadius: 20,
              padding: 15,
            }}
            textStyle={{fontSize: 20, textAlign: 'center'}}
          />
        </Wrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export const OTPScreen = memo(OTPPageComponent);
