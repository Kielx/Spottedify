import { Center, HStack, VStack, Skeleton } from 'native-base';
import React from 'react';

function LoadingSkeletonMobile() {
  return (
    <Center w="100%">
      <VStack
        w="100%"
        borderWidth="1"
        space={4}
        my="4"
        rounded="lg"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton flex="2" h="130" roundedTop="lg" />
        <VStack flex="3" space="4" p="4">
          <HStack space="1">
            <Skeleton flex="8" />
            <Skeleton flex="1" startColor="red.500" />
          </HStack>
          <Skeleton.Text />
          <HStack space="5" alignItems="center">
            <HStack flex="2" space="20" justifyContent="space-between" />
            <Skeleton flex="1" rounded="lg" startColor="primary.700" />
          </HStack>
        </VStack>
      </VStack>
    </Center>
  );
}

export default LoadingSkeletonMobile;
