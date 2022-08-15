/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import {store} from './src/state/store';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/theme';
import StackNavigation from './src/Navigation/StackNavigation';
import AppContextProvider from './src/state/AppContext';
import {ToastProvider} from 'react-native-toast-notifications';

import Icon from 'react-native-vector-icons/Feather';
import Warn from 'react-native-vector-icons/Ionicons';
import Error from 'react-native-vector-icons/MaterialIcons';

import {MenuProvider} from 'react-native-popup-menu';

let persistor = persistStore(store);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppContextProvider>
              <ToastProvider
                placement="top"
                duration={5000}
                animationType="zoom-in"
                animationDuration={250}
                successColor="green"
                dangerColor="red"
                warningColor="orange"
                normalColor="gray"
                // icon={<Icon />}
                successIcon={<Icon name="check-circle" color="white" />}
                dangerIcon={<Error name="dangerous" color="white" />}
                warningIcon={<Warn name="warning-sharp" color="white" />}>
                <MenuProvider>
                  <StackNavigation />
                </MenuProvider>
              </ToastProvider>
            </AppContextProvider>
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
