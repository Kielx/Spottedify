import React, { useContext } from 'react';
import { VStack, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import { RootStackParamList } from '../stacks/RootStack';
import { AuthContext } from '../utils/AuthStateListener';

import AddNewPostButton from '../components/AddNewPostButton';
import PostsList from '../components/PostsList';
import { auth } from '../firebaseConfig';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

function HomeScreen() {
  const { currentUser, userProfile } = useContext(AuthContext);
  console.log(currentUser, userProfile);
  const navigation = useNavigation<homeScreenProp>();

  return (
    <VStack
      style={{ position: 'relative' }}
      space={5}
      pt={8}
      alignItems="center"
      _dark={{ bg: 'light.900' }}>
      {!currentUser ? (
        <>
          <Button key="signup" onPress={() => navigation.navigate('Signup')} title="Sign Up">
            Signup
          </Button>
          <Button key="signin" onPress={() => navigation.navigate('Signin')} title="Signin">
            Signin
          </Button>
        </>
      ) : (
        <Button key="logout" onPress={() => signOut(auth)}>
          Logout
        </Button>
      )}

      <PostsList />
      <AddNewPostButton />
    </VStack>
  );
}

export default HomeScreen;
