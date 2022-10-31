import React from 'react';
import { VStack, Box, Text, Divider, FavouriteIcon, Flex } from 'native-base';
import db from '../firebaseConfig';

import { collection, getDocs, DocumentData } from 'firebase/firestore';

export default function () {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    const getAnnouncements = async () => {
      const querySnapshot = await getDocs(collection(db, 'publicPosts'));
      querySnapshot.forEach((doc) => {
        setPosts((prev) => [...prev, doc.data()]);
      });
    };
    getAnnouncements();
  }, []);

  const mapPosts = posts.map((post) => {
    return (
      <Box
        _light={{ bg: 'green.300', color: 'white' }}
        _dark={{ bg: 'gray.900', color: 'white' }}
        p="4"
        rounded="md"
        shadow="3">
        <Box>
          <Text pt="1" fontWeight="bold" fontSize="xl" lineHeight="tight">
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
    </VStack>
  );
}
