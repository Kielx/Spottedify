import { Center, HStack, VStack, Skeleton } from 'native-base';
import React from 'react';

function LoadingSkeleton() {
  return (
    <Center w="100%">
      <HStack
        w="100%"
        borderWidth="1"
        space={8}
        my="4"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4">
        <Skeleton flex="2" h="150" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton />
          <Skeleton.Text />
          <HStack space="2" alignItems="center">
            <Skeleton h="8" flex="1" rounded="md" startColor="primary.300" />
          </HStack>
        </VStack>
      </HStack>
    </Center>
  );
}

export default LoadingSkeleton;
