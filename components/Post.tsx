import React from 'react';
import { Box, Text, FavouriteIcon, Flex, Button } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

function Post({ post }: DocumentData) {
  const navigation = useNavigation<homeScreenProp>();

  return (
    <Box
      _light={{ bg: 'green.300', color: 'white' }}
      _dark={{ bg: 'light.700', color: 'white' }}
      p="4"
      my="4"
      rounded="md"
      shadow="3">
      <Box>
        <Text pt="1" fontWeight="bold" fontSize="xl">
          {post.title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {post.date.toDate().toLocaleDateString('pl-PL')} -{post.location}
        </Text>
        <Box py="1">{post.description}</Box>
        <Flex flexDirection="row">
          {post.likes}
          <FavouriteIcon size="5" mt="0.5" color="red.700" ml="2" />
        </Flex>
      </Box>
      <Button onPress={() => navigation.navigate('Details', { post })} mt="2">
        Więcej
      </Button>
    </Box>
  );
}

export default Post;
