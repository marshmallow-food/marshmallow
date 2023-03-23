import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styled from 'styled-components';
import Button from '../components/dumb/Button';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useSelector} from '../hooks/useSelector';
import {themeSelector} from '../modules/app/selectors';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from '../components/icons/ArrowLeft';
import {AppStackParamList} from 'src/navigators/AppStack';
import {getProductsBySubCategory, IProduct} from 'src/services/product/product';
import ProductCard from 'src/components/ProductCard';
import normalize from 'react-native-normalize';

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

const product = {
  id: 1,
  image_url:
    'https://storage.yandexcloud.net/marshmallow-images/subcategories/milk.png',
  measure: 'кг',
  name: 'Апельсин',
  price: '99',
  size: '1',
};

type ProductsPageProps = NativeStackScreenProps<AppStackParamList, 'products'>;

const ProductsPage = ({route, navigation}: ProductsPageProps): JSX.Element => {
  const title = route.params.subcategory;
  const subcategory_id = route.params.subcategory_id;
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [products, setProducts] = useState<IProduct[] | undefined>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  const fetchProductsBySubCategory = useCallback(async () => {
    const data = await getProductsBySubCategory(subcategory_id);
    setProducts(data);
  }, []);

  useEffect(() => {
    void fetchProductsBySubCategory();
  }, []);

  const handleProductPress = useCallback((productId: number) => {
    navigation.push('product', {productId: productId});
  }, []);

  const showKeyboard = () => {
    setKeyboardActive(true);
  };

  const hideKeyboard = () => {
    setKeyboardActive(false);
    Keyboard.dismiss();
  };

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
  const screenWidth = Dimensions.get('window').width - 55;
  const numColumns = 2;

  const tileSize = screenWidth / numColumns;

  return (
    <Container>
      <TouchableWithoutFeedback onPress={hideKeyboard} style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({ios: 'padding'})}
          keyboardVerticalOffset={keyboardActive ? 100 : 0}>
          <ScrollView
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}>
            <Wrapper>
              <FlatList
                data={formatData(products, numColumns)}
                numColumns={2}
                keyExtractor={(item) => item.id?.toString()}
                nestedScrollEnabled={false}
                scrollEnabled={false}
                style={{
                  flex: 1,
                  width: '100%',
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({item: product}) => {
                  if (product.empty === true) {
                    return <View style={[styles.itemInvisible]} />;
                  }
                  return (
                    <ProductCard
                      product={product}
                      onPress={() => handleProductPress(product.id)}
                      tileSize={tileSize}></ProductCard>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 17,
                    }}
                  />
                )}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                }}
                columnWrapperStyle={styles.columnWrapper}
              />
            </Wrapper>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    gap: 25,
    width: '100%',
    justifyContent: 'space-between',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
});

const ProductsPageOptions: NativeStackNavigationOptions = {
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
          backgroundColor: theme.colors.inputGray,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
          borderRadius: 30,
        }}
        icon={<ArrowLeft />}
      />
    );
  },
};

export {ProductsPageOptions};
export const ProductsScreen = memo(ProductsPage);
