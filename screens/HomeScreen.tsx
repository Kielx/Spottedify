import React, { useContext } from 'react';
import { VStack, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

import { AuthContext } from '../utils/AuthStateListener';

import AddNewPostButton from '../components/AddNewPostButton';
import PostsList from '../components/PostsList';

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
      <Button onPress={() => navigation.navigate('Signup')} title="Sign Up" />
      <PostsList />
      <AddNewPostButton />
    </VStack>
  );
}

export default HomeScreen;
