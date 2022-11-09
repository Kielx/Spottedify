import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Timestamp } from 'firebase/firestore';
import HomeScreen from './screens/HomeScreen';
import ToggleDarkMode from './components/DarkModeToggle';
import Header from './components/Header';
import PostDetailsScreen from './screens/PostDetailsScreen';
import AuthStateListener from './utils/AuthStateListener';
import Signup from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';

export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Signin: undefined;
  Details: {
    post: {
      title: string;
      description: string;
      date: Timestamp;
      location: string;
      likes: number;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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

function ToggleDarkModeComponent() {
  return <ToggleDarkMode />;
}

function HeaderComponent() {
  return <Header />;
}

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthStateListener>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#86efac' },
              headerRight: ToggleDarkModeComponent,
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: HeaderComponent,
              }}
            />
            <Stack.Screen name="Details" component={PostDetailsScreen} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Signin" component={SigninScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthStateListener>
    </NativeBaseProvider>
  );
}
