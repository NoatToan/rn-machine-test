import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {Provider} from 'react-redux';
import {store} from './src/redux/stores';
import {I18nextProvider} from 'react-i18next';
import i18n from '@i18n/locales/en';
import {enableFreeze} from 'react-native-screens';
import {RootSiblingParent} from 'react-native-root-siblings';
import AppProvider, {AppConsumer} from 'AppContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// WARNING: Be careful when change the value of below code.
// It will lead us to some dependencies conflict, example webview package
enableFreeze(true);

// TODO: Handle theme for rneui
const theme = createTheme({
  lightColors: {
    primary: 'blue',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});

const App = () => {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <AppProvider>
                <AppConsumer>
                  {(globalProps: any) => {
                    global.props = {...globalProps};
                    return <RootNavigator {...globalProps} />;
                  }}
                </AppConsumer>
              </AppProvider>
            </I18nextProvider>
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export default App;
