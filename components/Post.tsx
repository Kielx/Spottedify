import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Box,
  Text,
  FavouriteIcon,
  Flex,
  Button,
  useToast,
  WarningIcon,
  Image,
  VStack,
} from 'native-base';
import { DocumentData } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../stacks/RootStack';
import { AuthContext } from '../utils/AuthStateListener';
import RemovePostButton from './RemovePostButton';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  post: DocumentData;
  posts: DocumentData[];
  setPosts: React.Dispatch<React.SetStateAction<DocumentData[]>>;
};

function Post({ post, posts, setPosts }: Props) {
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();
  const toastId = 'signin-error';
  const navigation = useNavigation<homeScreenProp>();
  const postAuthor = post.authorId === currentUser?.uid ? 'Ty' : post.authorName;
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Box
      flexDirection={isBigScreen ? 'row' : 'column'}
      key={post.id}
      _light={{ bg: 'green.300', color: 'white' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      my="4"
      p="0"
      rounded="md"
      shadow="3">
      {post.photo && (
        <Image
          h={isBigScreen ? '100%' : 40}
          width={isBigScreen ? '40%' : '100%'}
          source={{ uri: post.photo }}
          alt="post photo"
          roundedTop="md"
        />
      )}
      <VStack flex="1">
        <Box p="4">
          <Text pt="1" fontWeight="bold" fontSize="xl">
            {post.title}
          </Text>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            {postAuthor}
          </Text>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
          </Text>

          <Text numberOfLines={3} py="1">
            {post.description}
          </Text>
          <Flex flexDirection="row">
            {post.likes}
            <FavouriteIcon size="5" mt="0.5" color="red.700" ml="2" />
          </Flex>
        </Box>
        <Button
          roundedTop={0}
          onPress={
            currentUser
              ? () => navigation.navigate('Details', { post })
              : () => {
                  if (!toast.isActive('signin-error')) {
                    toast.show({
                      id: toastId,
                      placement: 'top',
                      render: () => (
                        <Box bg="warning.500" px="4" py="1" alignItems="center" rounded="md" mb={5}>
                          <Text color="white" fontSize="md" px="2" alignItems="center">
                            <WarningIcon color="white" pr="2" />
                            Musisz być zalogowany by wyświetlić szczegóły!
                          </Text>
                        </Box>
                      ),
                    });
                  }
                }
          }>
          Szczegóły
        </Button>
      </VStack>
      {post.authorId === currentUser?.uid && (
        <RemovePostButton postr={post} posts={posts} setPosts={setPosts} />
      )}
    </Box>
  );
}

export default Post;
