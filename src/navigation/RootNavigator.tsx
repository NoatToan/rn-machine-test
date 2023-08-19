import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, useTheme} from '@rneui/themed';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, useCallback, useMemo} from 'react';
import {Screen} from './navigation.enums';
import HeaderBackgroundDefault from '@layouts/default/HeaderBackgroundDefault';
import navigationService, {navigationRef} from '@services/navigationService';
import {t} from 'i18next';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';

const Stack = createNativeStackNavigator();

const CONFIG = {};

const RootNavigator: FC = () => {
  const {theme} = useTheme();

  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();

  const linking = {
    prefixes: ['reactnative://'],
    CONFIG,
  };

  const navigateToCreateContact = useCallback(() => {
    navigationService.navigate(
      Screen.ContactDetailScreen,
      {
        userId: null,
        userName: null,
        isCreate: true,
      },
      'ContactCreateScreen',
    );
  }, []);
  const pressContactAction = useCallback(() => {
    return (
      <TouchableOpacity onPress={navigateToCreateContact}>
        <FastImage
          style={CommonStyles.icon.icon35}
          source={IMAGES.icAddContact}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.white,
          text: theme.colors.black,
          border: theme.colors.black,
          notification: theme.colors.black,
        },
        dark: theme.mode === 'dark',
      }}>
      <Stack.Navigator
        initialRouteName={Screen.IntroScreen}
        screenOptions={{
          fullScreenGestureEnabled: true,
          headerBackVisible: true,
          headerBackground: HeaderBackgroundDefault,
          headerStyle: {
            backgroundColor: theme.colors.platform.default.primary,
          },
        }}>
        {/* Global */}
        <Stack.Screen
          name={Screen.IntroScreen}
          component={IntroScreen}
          options={{title: t('screen:intro')}}
        />
        <Stack.Screen
          name={Screen.HomeScreen}
          component={HomeScreen}
          options={{
            title: t('screen:contactManagement'),
            headerRight: pressContactAction,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
