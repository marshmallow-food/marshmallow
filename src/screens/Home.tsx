import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import styled from 'styled-components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from 'src/navigators/AppStack';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import SearchInput from './../components/dumb/SearchInput';
import Icon from 'react-native-vector-icons/EvilIcons';
import {requestCategories} from 'src/modules/category/actions';
import {useDispatch} from 'src/hooks/useSelector';

const Container = styled(SafeAreaView)`
  flex: 1;
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

const Header = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  margin-bottom: 20px;
`;

const Search = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  margin-bottom: 20px;
`;

type HomePageProps = NativeStackScreenProps<AppStackParamList, 'home'>;

const HomePageComponent = ({navigation}: HomePageProps): JSX.Element => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [keyboardActive, setKeyboardActive] = useState(false);

  const showKeyboard = async () => {
    setKeyboardActive(true);
  };

  const hideKeyboard = async () => {
    setKeyboardActive(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    dispatch(requestCategories.request());
  }, []);
  return (
    <Container>
      <TouchableWithoutFeedback onPress={hideKeyboard} accessible={false}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({ios: 'padding'})}
          keyboardVerticalOffset={keyboardActive ? 100 : 0}>
          <Wrapper>
            <Header>
              <Text style={styles.address}>Староалексеевская 14к1</Text>
              <LinearGradient
                colors={['#45FEE8', '#4945FE']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.userIcon}>
                <Icon name="user" size={40} style={styles.icon} />
              </LinearGradient>
            </Header>
            <Search>
              <SearchInput
                onChangeText={() => console.log('search')}
                placeholder={'Найти нужный продукт'}
                value={''}
              />
            </Search>
          </Wrapper>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  userIcon: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    fontSize: normalize(18),
    textAlign: 'center',
    fontFamily: 'Comfortaa-Regular',
    color: 'black',
  },
  icon: {
    color: 'white',
  },
});

export const HomeScreen = memo(HomePageComponent);
