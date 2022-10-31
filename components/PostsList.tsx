import React from 'react';
import { VStack, Box, Divider, FavouriteIcon } from 'native-base';
import db from '../firebaseConfig';

import { collection, getDocs, DocumentData } from 'firebase/firestore';

export default function () {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    const getAnnouncements = async () => {
      const querySnapshot = await getDocs(collection(db, 'publicPosts'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().title}`);
        setPosts((prev) => [...prev, doc.data()]);
      });
    };
    getAnnouncements();
  }, []);

  const mapPosts = posts.map((post) => {
    return (
      <Box key={post.id} p="4" w="90%" mx="auto">
        <VStack space={2}>
          <Box
            _light={{ bg: 'green.300', color: 'white' }}
            _dark={{ bg: 'gray.900', color: 'white' }}
            p="4"
            rounded="md">
            <Box>
              <Box mt="1" fontWeight="bold" lineHeight="tight">
                {post.title}
              </Box>
              <Box>{post.description}</Box>
              <Box>
              <FavouriteIcon size="5" mt="0.5" />
              {post.likes}
              </Box>
            </Box>
          </Box>
        </VStack>
      </Box>
    );
  });

  return (
    <Box borderRadius="md">
      {mapPosts}
      <VStack
        space="4"
        divider={<Divider />}
        width="100%"
        _light={{ bg: 'gray.50', color: 'white' }}
        _dark={{ bg: 'gray.700', color: 'white' }}>
        <Box px="4" pt="4">
          NativeBase
        </Box>
        <Box px="4">
          NativeBase is a free and open source framework that enable developers to build
          high-quality mobile apps using React Native iOS and Android apps with a fusion of ES6.
        </Box>
        <Box px="4" pb="4">
          GeekyAnts
        </Box>
      </VStack>
    </Box>
  );
}
