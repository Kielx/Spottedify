import React from 'react';
import { Center } from 'native-base';
import PostsList from '../components/PostsList';

function HomeScreen() {
  return (
    <Center pt={10} flex={1} _dark={{ bg: 'coolGray.700' }}>
      <PostsList />
    </Center>
  );
}

export default HomeScreen;
