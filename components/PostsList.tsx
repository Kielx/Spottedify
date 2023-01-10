import React from 'react';
import { Flex, ScrollView, Select, Text } from 'native-base';
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  orderBy,
  where,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Post from './Post';
import { verticalScale, horizontalScale } from '../utils/Metrics';
import getCurrentCity from '../utils/getCurrentCity';

export default function PostsList() {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);
  const [sortingCriteria, setSortingCriteria] = React.useState('date added');
  const unsubscribeArray: Unsubscribe[] = [];

  let unsubscribeQueryByDate: () => void;
  let unsubscribeQueryByLikes: () => void;
  let unsubscribeQueryByCurrentLocation: () => void;

  const queryByDate = async () => {
    unsubscribeQueryByDate = onSnapshot(
      query(collection(db, 'publicPosts'), orderBy('date', 'desc')),
      (querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const { id } = doc;
          setPosts((prev: DocumentData[]) => [...prev, { ...data, id }]);
        });
      }
    );
    unsubscribeArray.push(unsubscribeQueryByDate);
  };

  const queryByLikes = async () => {
    unsubscribeQueryByLikes = onSnapshot(
      query(collection(db, 'publicPosts'), orderBy('likes', 'desc')),
      (querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const { id } = doc;
          setPosts((prev: DocumentData[]) =>
            [...prev, { ...data, id }].sort((a, b) => b.likes.length - a.likes.length)
          );
        });
      }
    );
    unsubscribeArray.push(unsubscribeQueryByLikes);
  };
  // @todo - Update query to use current location
  const queryByCurrentLocation = async () => {
    const city = await getCurrentCity();
    unsubscribeQueryByCurrentLocation = onSnapshot(
      query(collection(db, 'publicPosts'), where('location', '==', city)),
      (querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const { id } = doc;
          setPosts((prev: DocumentData[]) => [...prev, { ...data, id }]);
        });
      }
    );
    unsubscribeArray.push(unsubscribeQueryByCurrentLocation);
  };

  React.useEffect(() => {
    if (sortingCriteria === 'date added') {
      queryByDate();
    }
    if (sortingCriteria === 'likes') {
      queryByLikes();
    }
    if (sortingCriteria === 'current location') {
      queryByCurrentLocation();
    }

    return () => {
      unsubscribeArray.forEach((unsubscribe) => unsubscribe());
    };
  }, [sortingCriteria]);

  const mapPosts = posts.map((post) => <Post post={post} key={post.id} />);

  return (
    <ScrollView px={1} maxW="768px" w={horizontalScale(300)} h={verticalScale(350)}>
      <Flex direction="row" alignItems="center" justifyContent="flex-end" mb={2}>
        <Text fontSize="sm" mr="2" color="gray.400">
          Sortuj według:
        </Text>
        <Select
          placeholder="Wybierz metodę sortowania postów"
          selectedValue={sortingCriteria}
          width={150}
          onValueChange={(itemValue: string) => setSortingCriteria(itemValue)}>
          <Select.Item label="Data dodania" value="date added" />
          <Select.Item label="Ilośc polubień" value="likes" />
          <Select.Item label="Bieżąca lokalizacja" value="current location" />
        </Select>
      </Flex>
      {mapPosts}
    </ScrollView>
  );
}

