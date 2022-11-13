import { Text, Heading, VStack } from 'native-base';
import React, { useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../stacks/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function PostDetailsScreen({ route }: Props) {
  const navigation = useNavigation();
  const { post } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: post.title });
  }, []);

  return (
    <VStack
      space={5}
      p={4}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      _light={{ color: 'white' }}
      _dark={{ bg: 'light.700', color: 'white' }}>
      <Heading>{post.title}</Heading>
      <Text>{post.description}</Text>
    </VStack>
  );
}

export default PostDetailsScreen;
