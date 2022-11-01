import React from 'react';
import { VStack, Box, Text, FavouriteIcon, Flex } from 'native-base';
import db from '../firebaseConfig';
import { collection, getDocs, DocumentData, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AddNewPostButton from './AddNewPostButton';

export default function () {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, 'publicPosts'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const id: string = doc.id;
          setPosts((prev: DocumentData[]) => [...prev, { ...data, id }]);
        });
      });
    };

    getPosts();
  }, []);

  const mapPosts = posts.map((post) => {
    return (
      <Box
        _light={{ bg: 'green.300', color: 'white' }}
        _dark={{ bg: 'gray.900', color: 'white' }}
        p="4"
        rounded="md"
        shadow="3"
        key={post.id}>
        <Box>
          <Text pt="1" fontWeight="bold" fontSize="xl">
            {post.title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
          </Text>
          <Box py="1">{post.description}</Box>
          <Flex flexDirection="row">
            {post.likes}
            <FavouriteIcon size="5" mt="0.5" color="red.700" ml="2" />
          </Flex>
        </Box>
      </Box>
    );
  });

  return (
    <VStack borderRadius="md" width="1/4" space="4">
      {mapPosts}
      <AddNewPostButton />
    </VStack>
  );
}
