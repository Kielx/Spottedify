import { HStack, Skeleton, Center } from 'native-base';
import React from 'react';

function UserPostListSkeleton() {
  return (
    <Center w="100%">
      <HStack
        space="2"
        w="100%"
        borderWidth="1"
        my="1"
        rounded="lg"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton flex="1" rounded="lg" h="full" startColor="coolGray.100" />
        <Skeleton.Text flex="10" p="2" />
      </HStack>
    </Center>
  );
}

export default UserPostListSkeleton;
