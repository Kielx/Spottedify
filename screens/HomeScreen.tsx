import React from 'react';
import { VStack } from 'native-base';

import PostsList from '../components/PostsList';

function HomeScreen() {
  return (
    <VStack space={5} pt={8} alignItems="center" _dark={{ bg: 'light.900' }}>
      <PostsList />
    </VStack>
  );
}

export default HomeScreen;
