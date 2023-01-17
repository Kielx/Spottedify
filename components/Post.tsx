import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Box, Text, Image, VStack, HStack } from 'native-base';
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
      _light={{ bg: 'white', color: 'white' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      my="4"
      p="0"
      rounded="xl"
      shadow="6">
      {post.photo ? (
        <Image
          h={isBigScreen ? '100%' : 40}
          width={isBigScreen ? '40%' : '100%'}
          source={{ uri: post.photo }}
          alt="post photo"
          _ios={{ roundedTop: 'xl' }}
          _android={{ roundedTop: 'xl' }}
          _web={{
            roundedLeft: 'xl',
          }}
        />
      ) : null}
      <VStack flex="1" p="4">
        <HStack space="sm" justifyContent="space-between" alignItems="flex-start">
          <Text
            letterSpacing="md"
            fontWeight="semibold"
            fontSize="xl"
            _light={{ color: 'primary.800' }}
            _dark={{
              opacity: 0.8,
            }}>
            {post.title}
          </Text>
          <HStack space="xs" flexDirection="row" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              {post.likes.length}
            </Text>
            <LikeUser color="red.700" post={post} />
          </HStack>
        </HStack>
        <Text fontSize="xs" fontWeight="normal" color="gray.500" _dark={{ color: 'gray.400' }}>
          {postAuthor} - {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
        </Text>
        <Text
          numberOfLines={4}
          pt="3"
          _light={{ color: 'coolGray.500' }}
          fontWeight="medium"
          _dark={{
            opacity: 0.8,
          }}>
          {post.description}
        </Text>

        <HStack space="2" w="full" justifyContent="flex-end" roundedBottom="xl" pt="8">
          {post.authorId === currentUser?.uid ? (
            <HStack flex="1" justifyContent="space-between">
              <RemovePostButton postr={post} />
              <EditPostButton poste={post} />
            </HStack>
          ) : null}

          <PostDetailsButton userDetails={false} post={post} />
        </HStack>
      </VStack>
    </Box>
  );
}

export default Post;
