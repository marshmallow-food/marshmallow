import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {getProductInfoById, IProductInfo} from 'src/services/product/product';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from 'src/navigators/AppStack';
import Close from './icons/Close';
import styled from 'styled-components';
import GradientButton from 'src/components/dumb/GradientButton';
import normalize from 'react-native-normalize';
import {useSelector} from 'src/hooks/useSelector';
import {themeSelector} from 'src/modules/app/selectors';

type ProductInfoProps = NativeStackScreenProps<AppStackParamList, 'product'>;

const Wrapper = styled(View)`
  flex: 1;
  padding: 15px;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.white};
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`;

const ProductInfo = ({route, navigation}: ProductInfoProps) => {
  const productId = route.params.productId;
  const theme = useSelector(themeSelector);
  const [productInfo, setProductInfo] = useState<IProductInfo | undefined>(
    undefined,
  );

  const fetchProductInfoById = useCallback(async () => {
    const data = await getProductInfoById(productId);
    setProductInfo(data);
  }, []);

  const handlePress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    void fetchProductInfoById();
  }, []);

  if (productInfo) {
    return (
      <Container>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          nestedScrollEnabled
          scrollEnabled={true}>
          <ImageBackground
            source={{uri: productInfo.full_image_url}}
            style={styles.image}>
            <View style={styles.content}>
              <TouchableOpacity
                onPress={handlePress}
                style={styles.closeButton}>
                <Close />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Wrapper>
            <Text style={styles.name}>{productInfo.name}</Text>
            <Text
              style={
                styles.size
              }>{`${productInfo.size} ${productInfo.measure}`}</Text>
            <View style={styles.energyValue}>
              <Text style={styles.energyValueHeader}>В 100 гр.</Text>
              <View style={styles.energyValueContainer}>
                <View style={styles.energyValueItem}>
                  <Text style={styles.energyValueTitle}>
                    {productInfo.energy_value.count}
                  </Text>
                  <Text style={styles.energyValueUnit}>Ккал</Text>
                </View>
                <View style={styles.energyValueItem}>
                  <Text style={styles.energyValueTitle}>
                    {productInfo.energy_value.protein}
                  </Text>
                  <Text style={styles.energyValueUnit}>Белки</Text>
                </View>
                <View style={styles.energyValueItem}>
                  <Text style={styles.energyValueTitle}>
                    {productInfo.energy_value.fats}
                  </Text>
                  <Text style={styles.energyValueUnit}>Жиры</Text>
                </View>
                <View style={styles.energyValueItem}>
                  <Text style={styles.energyValueTitle}>
                    {productInfo.energy_value.carbs}
                  </Text>
                  <Text style={styles.energyValueUnit}>Углеводы</Text>
                </View>
              </View>
            </View>
          </Wrapper>
        </ScrollView>
        <GradientButton
          title={`${productInfo.price} +`}
          onPress={() => console.log('clicked')}
          colors={['#45FEE8', '#4945FE']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          disabledColors={['#45FEE8', '#4945FE']}
          buttonStyle={{
            width: '100%',
            height: 80,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingTop: 18,
            paddingBottom: 18,
            position: 'absolute',
            bottom: 0,
          }}
          titleStyle={{
            fontSize: normalize(20),
            textAlign: 'center',
            fontFamily: 'Comfortaa-Regular',
            lineHeight: normalize(22),
            color: theme.colors.white,
            textTransform: 'uppercase',
          }}
          disabledButtonStyle={{
            backgroundColor: theme.colors.buttonBlue,
            color: theme.colors.white,
          }}
        />
      </Container>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  image: {width: '100%', height: 372},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  name: {
    fontFamily: 'Comfortaa-Bold',
    fontStyle: 'normal',
    lineHeight: 28,
    fontSize: 25,
    color: 'black',
    marginBottom: 8,
  },
  size: {
    fontFamily: 'Comfortaa-Bold',
    fontStyle: 'normal',
    lineHeight: 28,
    fontSize: 20,
    color: '#A1A1A1',
    marginBottom: 8,
  },
  fixedButton: {
    height: 50,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  energyValue: {
    width: '100%',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomColor: '#F2F2F2',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  energyValueHeader: {
    fontFamily: 'Comfortaa-SemiBold',
    fontStyle: 'normal',
    lineHeight: 15,
    fontSize: 14,
    color: '#A1A1A1',
    marginBottom: 8,
  },
  energyValueTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontStyle: 'normal',
    lineHeight: 22,
    fontSize: 20,
    color: 'black',
  },
  energyValueContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 18,
  },
  energyValueItem: {
    flex: 1,
    paddingHorizontal: 2,
  },
  energyValueUnit: {
    fontFamily: 'Comfortaa-SemiBold',
    fontStyle: 'normal',
    lineHeight: 11,
    fontSize: 10,
    color: '#A1A1A1',
  },
});

export default memo(ProductInfo);
