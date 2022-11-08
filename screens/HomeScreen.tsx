import React from 'react';
import { VStack } from 'native-base';

import AddNewPostButton from '../components/AddNewPostButton';
import PostsList from '../components/PostsList';

function HomeScreen() {
  return (
    <VStack
      style={{ position: 'relative' }}
      space={5}
      pt={8}
      alignItems="center"
      _dark={{ bg: 'light.900' }}>
      <PostsList />
      <AddNewPostButton />
    </VStack>
  );
}

export default HomeScreen;
