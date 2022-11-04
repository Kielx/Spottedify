import React from 'react';
import { Box, Text, FavouriteIcon, Flex } from 'native-base';
import { DocumentData } from 'firebase/firestore';

function Post({ post }: any) {
  return (
    <Box
      _light={{ bg: 'green.300', color: 'white' }}
      _dark={{ bg: 'gray.900', color: 'white' }}
      p="4"
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
    </Box>
  );
}

export default Post;
