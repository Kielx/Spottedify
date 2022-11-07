import React from 'react';
import { VStack } from 'native-base';

import PostsList from '../components/PostsList';

function HomeScreen() {
  return (
    <VStack space={5} pt={4} alignItems="center">
      <PostsList />
    </VStack>
  );
}

export default HomeScreen;
