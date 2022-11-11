import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import AuthStateListener from './utils/AuthStateListener';
import RootStack from './stacks/RootStack';
import BottomPanel from './components/BottomPanel';
import AppContextProvider from './context/AppContext';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  type ICustomTheme = MyThemeType;
}

export default function App() {
  return (
    <NativeBaseProvider>
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
