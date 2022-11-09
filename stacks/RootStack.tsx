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

function ToggleDarkModeComponent() {
  return <ToggleDarkMode />;
}

function HeaderComponent() {
  return <Header />;
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
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : (
        <Stack.Screen name="Details" component={PostDetailsScreen} />
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
