import {FC} from 'react';
import contactListScreen from './screens/ContactListScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screen} from '@navigation/navigation.enums';
import contactDetailScreen from './screens/ContactDetailScreen';
import contactCreateScreen from './screens/ContactCreateScreen';
import {Platform} from 'react-native';
import {Dimensions} from 'react-native';
import {t} from 'i18next';

const Stack = createNativeStackNavigator();

const HomeScreen: FC = () => {
  return (
    <Stack.Navigator initialRouteName={Screen.ContactListScreen}>
      <Stack.Screen
        name={Screen.ContactListScreen}
        component={contactListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screen.ContactDetailScreen}
        component={contactDetailScreen}
        options={({route: {params}}: {route: any}) => {
          return {
            headerBackTitleVisible: false,
            title: params?.userName ?? '',
            headerTitleStyle: {
              textAlign: 'center',
              flex: Platform.OS === 'android' ? 1 : 0,
              width: Dimensions.get('window').width / 2,
            },
          };
        }}
      />
      <Stack.Screen
        name={Screen.ContactCreateScreen}
        component={contactDetailScreen}
        options={{
          title: t('screen:newContacts'),
          headerBackTitle: t('screen:contacts'),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
