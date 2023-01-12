import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Box, Text, Flex, Image } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import LikeUser from './LikeUser';
import RemovePostButton from './RemovePostButton';
import EditPostButton from './EditPostButton';

type Props = {
  post: DocumentData;
};

function PostShort({ post }: Props) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Box
      flexDirection={isBigScreen ? 'row' : 'column'}
      key={post.id}
      _light={{ bg: 'green.300', color: 'white' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      my="1"
      p="0"
      rounded="xl"
      shadow="3">
      {post.photo ? (
        <Image
          size="sm"
          source={{ uri: post.photo }}
          alt="post photo"
          _ios={{ roundedTop: 'md' }}
          _android={{ roundedTop: 'md' }}
          _web={{
            roundedLeft: 'md',
          }}
        />
      ) : null}

      <Flex flexDirection="row" alignItems="center">
        <Text pt="1" fontWeight="bold" fontSize="sm">
          {post.title}
        </Text>
        <LikeUser size="4" color="red.700" mr="4" post={post} />
        <Text pt="1" pl="2" fontWeight="bold" fontSize="sm">
          {post.likes.length}
        </Text>
      </Flex>
      <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
        {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
      </Text>

      <>
        <RemovePostButton postr={post} />
        <EditPostButton poste={post} />
      </>
    </Box>
  );
}

export default PostShort;
