import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import '@expo/match-media';
import AuthStateListener from './utils/AuthStateListener';
import RootStack from './stacks/RootStack';
import BottomPanel from './components/BottomPanel';
import AppContextProvider from './context/AppContext';

// Define the config
const config = {
  useSystemColorMode: true,
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  type ICustomTheme = MyThemeType;
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthStateListener>
        <AppContextProvider>
          <NavigationContainer>
            <RootStack />
            <BottomPanel />
          </NavigationContainer>
        </AppContextProvider>
      </AuthStateListener>
    </NativeBaseProvider>
  );
}
