import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Box, Text, Flex, Image, VStack, HStack } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import { AuthContext } from '../utils/AuthStateListener';
import LikeUser from './LikeUser';
import RemovePostButton from './RemovePostButton';
import EditPostButton from './EditPostButton';
import PostDetailsButton from './PostDetailsButton';

type Props = {
  post: DocumentData;
};

function Post({ post }: Props) {
  const { currentUser } = useContext(AuthContext);
  const postAuthor = post.authorId === currentUser?.uid ? 'Ty' : post.authorName;
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Box
      flexDirection={isBigScreen ? 'row' : 'column'}
      key={post.id}
      _light={{ bg: 'light.100', color: 'white' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      my="4"
      p="0"
      rounded="xl"
      shadow="3">
      {post.photo ? (
        <Image
          h={isBigScreen ? '100%' : 40}
          width={isBigScreen ? '40%' : '100%'}
          source={{ uri: post.photo }}
          alt="post photo"
          _ios={{ roundedTop: 'md' }}
          _android={{ roundedTop: 'md' }}
          _web={{
            roundedLeft: 'md',
          }}
        />
      ) : null}
      <VStack flex="1">
        <Box p="2">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" fontSize="xl" _light={{ color: 'gray.600' }}>
              {post.title}
            </Text>
            <Flex flexDirection="row" alignItems="center">
              <Text fontSize="lg" fontWeight="bold">
                {post.likes.length}
              </Text>
              <LikeUser size="5" color="red.700" post={post} />
            </Flex>
          </HStack>
          <HStack>
            <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
              {postAuthor} - {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
            </Text>
          </HStack>
          <Text numberOfLines={3} py="1">
            {post.description}
          </Text>
        </Box>
        {post.authorId === currentUser?.uid ? (
          <HStack>
            <PostDetailsButton post={post} />
            <RemovePostButton postr={post} />
            <EditPostButton poste={post} />
          </HStack>
        ) : null}
      </VStack>
    </Box>
  );
}

export default Post;
