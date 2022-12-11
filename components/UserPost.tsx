import React, { useContext } from 'react';
import { Box, Text, FavouriteIcon, Flex } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import EditPostButton from './EditPostButton';
import RemovePostButton from './RemovePostButton';

function UserPost({ post }: DocumentData) {
  return (
    <Box
      key={post.id}
      _light={{ bg: 'green.300', color: 'white' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      p="4"
      my="4"
      rounded="md"
      shadow="3">
      <Box>
        <Text pt="1" fontWeight="bold" fontSize="xl">
          {post.title}
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
          {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
        </Text>

        <Box py="1">{post.description}</Box>
        <Flex flexDirection="row">
          {post.likes}
          <FavouriteIcon size="5" mt="0.5" color="red.700" ml="2" />
        </Flex>
      </Box>
      <EditPostButton poste={post} keye={post.id} />
      <RemovePostButton postr={post} keyr={post.id} />
    </Box>
  );
}

export default UserPost;
