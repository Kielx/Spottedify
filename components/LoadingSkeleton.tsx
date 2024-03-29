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
        rounded="lg"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4">
        <Skeleton flex="2" h="150" rounded="lg" />
        <VStack flex="3" space="4">
          <HStack space="2">
            <Skeleton flex="8" />
            <Skeleton flex="1" startColor="red.500" />
          </HStack>
          <Skeleton.Text />
          <HStack space="2" alignItems="center" justifyContent="flex-end">
            <Skeleton h="8" w="1/4" rounded="lg" startColor="primary.700" />
          </HStack>
        </VStack>
      </HStack>
    </Center>
  );
}

export default LoadingSkeleton;
