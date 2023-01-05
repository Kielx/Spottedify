import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Timestamp } from 'firebase/firestore';
import ToggleDarkMode from '../components/DarkModeToggle';
import Header from '../components/Header';
import HomeScreen from '../screens/HomeScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import Signup from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import { AuthContext } from '../utils/AuthStateListener';
import ResetPassword from '../screens/ResetPassword';
import HeaderNavigateBackButton from '../components/HeaderNavigateBackButton';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import CameraScreen from '../screens/CameraScreen';

export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Signin: undefined;
  ResetPassword: undefined;
  UserDetails: undefined;
  Details: {
    post: {
      title: string;
      description: string;
      date: Timestamp;
      location: string;
      likes: number;
    };
  };
  CameraScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Functions to prevent eslint error of declaring component inside parent component
function ToggleDarkModeComponent() {
  return <ToggleDarkMode />;
}

function HeaderComponent() {
  return <Header />;
}

function NavigateBackButtonComponent() {
  return <HeaderNavigateBackButton />;
}

function RootStack() {
  const { currentUser } = useContext(AuthContext);

  return (
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
      {!currentUser ? (
        <>
          <Stack.Screen
            name="Signin"
            component={SigninScreen}
            options={{
              headerLeft: NavigateBackButtonComponent,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerLeft: NavigateBackButtonComponent,
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerLeft: NavigateBackButtonComponent,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Details"
            component={PostDetailsScreen}
            options={{
              headerLeft: NavigateBackButtonComponent,
            }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{
              headerLeft: NavigateBackButtonComponent,
            }}
          />
          <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{
              headerLeft: NavigateBackButtonComponent,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
