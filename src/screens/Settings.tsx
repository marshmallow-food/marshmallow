import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Text, View} from 'react-native';
import {useDispatch} from '../hooks/useSelector';
import {setAppTheme} from '../modules/app/actions';
import {Themes, ThemeType} from '../theme';
import styled from 'styled-components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from 'src/navigators/AppStack';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.colors.text};
`;

type SettingsPageProps = NativeStackScreenProps<AppStackParamList, 'settings'>;

const SettingsPageComponent = ({
  navigation,
}: SettingsPageProps): JSX.Element => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  console.log(navigation);

  return (
    <Container>
      <Title>{t('settings')}</Title>
      {Object.keys(Themes).map((themeType) => {
        return (
          <Button
            key={themeType}
            title={themeType}
            onPress={() => {
              dispatch(setAppTheme(themeType as ThemeType));
            }}
          />
        );
      })}
    </Container>
  );
};

export const SettingsScreen = memo(SettingsPageComponent);
