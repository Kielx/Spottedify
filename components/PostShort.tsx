import React, { useContext } from 'react';
import { Text, Image, Box, HStack } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import LikeUser from './LikeUser';
import RemovePostButton from './RemovePostButton';
import EditPostButton from './EditPostButton';
import PostDetailsButton from './PostDetailsButton';
import { AuthContext } from '../utils/AuthStateListener';

type Props = {
  post: DocumentData;
};

function PostShort({ post }: Props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      p="2"
      key={post.id}
      _light={{ bg: 'white', color: 'black' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      my="1.5"
      rounded="xl"
      shadow="3">
      {post.photo ? (
        <Image size="sm" source={{ uri: post.photo }} alt="post photo" rounded="lg" />
      ) : null}
      <Box flexDirection="column" flex="1" pl="2">
        <Box flexDirection="row" justifyContent="space-between">
          <Text
            fontWeight="bold"
            flex="6"
            fontSize="md"
            _dark={{
              opacity: '0.8',
            }}>
            {post.title}
          </Text>
          <Box flexDirection="row" justifyContent="flex-end" alignItems="center" flex="1">
            <LikeUser size="4" color="red.700" post={post} />
            <Text pl="2" fontWeight="bold" fontSize="sm">
              {post.likes.length}
            </Text>
          </Box>
        </Box>
        <HStack
          space="2"
          pt="2"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          {post.authorId === currentUser?.uid ? <RemovePostButton postr={post} /> : <Box />}
          <HStack space="2" flexDirection="row" justifyContent="flex-end">
            {post.authorId === currentUser?.uid ? <EditPostButton poste={post} /> : null}
            <PostDetailsButton userDetails post={post} />
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default PostShort;
