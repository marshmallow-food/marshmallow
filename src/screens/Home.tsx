import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
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
import Header from 'src/components/dumb/Header';
import SubCategoryCard from 'src/components/dumb/SubCategoryCard';
import {categorySelector} from 'src/modules/category/selectors';
import {useSelector} from 'react-redux';

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

const TopBar = styled(View)`
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
  const dispatch = useDispatch();
  const [keyboardActive, setKeyboardActive] = useState(false);

  const showKeyboard = async () => {
    setKeyboardActive(true);
  };

  const hideKeyboard = async () => {
    setKeyboardActive(false);
    Keyboard.dismiss();
  };

  const categories = useSelector(categorySelector);

  const formatData = (data: any, numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };

  const screenWidth = Dimensions.get('window').width - 56;
  const numColumns = 3;
  const tileSize = screenWidth / numColumns;

  const HomeHeader = () => {
    return (
      <>
        <TopBar>
          <Text style={styles.address}>Староалексеевская 14к1</Text>
          <LinearGradient
            colors={['#45FEE8', '#4945FE']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.userIcon}>
            <Icon name="user" size={40} style={styles.icon} />
          </LinearGradient>
        </TopBar>
        <Search>
          <SearchInput
            onChangeText={() => console.log('search')}
            placeholder={'Найти нужный продукт'}
            value={''}
          />
        </Search>
      </>
    );
  };

  useEffect(() => {
    dispatch(requestCategories.request());
  }, []);
  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={keyboardActive ? 100 : 0}>
        <TouchableWithoutFeedback onPress={hideKeyboard} accessible={false}>
          <ScrollView
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}>
            <Wrapper>
              <FlatList
                data={categories}
                style={{width: '100%'}}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={HomeHeader}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                renderItem={({item}) => {
                  return (
                    <View style={styles.categoryWrapper}>
                      <Header
                        title={item.name}
                        titleStyle={{fontSize: 20, marginBottom: 20}}
                      />
                      <FlatList
                        data={formatData(item.subcategories, numColumns)}
                        renderItem={({item}) => {
                          if (item.empty === true) {
                            return <View style={[styles.itemInvisible]} />;
                          }
                          return (
                            <SubCategoryCard
                              title={item.name}
                              img={{uri: item.image_url}}
                              tileSize={tileSize}
                              onPress={() =>
                                navigation.push('products', {
                                  subcategory: item.name,
                                  subcategory_id: item.id,
                                })
                              }
                            />
                          );
                        }}
                        style={{width: '100%'}}
                        numColumns={3}
                        keyExtractor={(item) => item.id?.toString()}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                          <View
                            style={{
                              height: 17,
                            }}
                          />
                        )}
                        columnWrapperStyle={styles.columnWrapper}
                      />
                    </View>
                  );
                }}
              />
            </Wrapper>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  columnWrapper: {
    gap: 13,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  categoryWrapper: {
    marginBottom: 26,
  },
});

export const HomeScreen = memo(HomePageComponent);
