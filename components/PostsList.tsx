import React, { ReactElement } from 'react';
import { Flex, ScrollView, Select, Text } from 'native-base';
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Post from './Post';
import { verticalScale, horizontalScale } from '../utils/Metrics';
import getCurrentCity from '../utils/getCurrentCity';
import LoadingSkeleton from './LoadingSkeleton';

export default function PostsList() {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);
  const [mappedPosts, setMappedPosts] = React.useState<ReactElement[]>([]);
  const [sortingCriteria, setSortingCriteria] = React.useState('date added');
  const [location, setLocation] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  let unsubscribe: Unsubscribe;

  const getPosts = async () => {
    unsubscribe = onSnapshot(
      query(collection(db, 'publicPosts'), orderBy('date', 'desc')),
      (querySnapshot) => {
        setPosts([]);
        const workPosts: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const { id } = doc;
          workPosts.push({ ...data, id });
        });
        setPosts(workPosts);
      }
    );
    const loc = await getCurrentCity();
    setLocation(loc);
  };

  React.useEffect(() => {
    setLoading(true);
    getPosts();
    const sortedPosts: DocumentData[] = posts.sort((a, b) => b.date.seconds - a.date.seconds);
    const mapPosts = sortedPosts.map((post) => <Post post={post} key={post.id} />);
    setMappedPosts(mapPosts);
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    setLoading(true);
    let mapPosts: ReactElement[] = [];
    if (sortingCriteria === 'current location') {
      const getLocation = async () => {
        try {
          const filteredPosts = posts.filter((post) => post.location === location);
          mapPosts = filteredPosts.map((post) => <Post post={post} key={post.id} />);
          setMappedPosts(mapPosts);
        } catch (error) {
          // Error retrieving data
        }
      };
      getLocation();
      setLoading(false);
    } else if (sortingCriteria === 'likes') {
      const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length);
      mapPosts = sortedPosts.map((post) => <Post post={post} key={post.id} />);
      setMappedPosts(mapPosts);
      setLoading(false);
    } else if (sortingCriteria === 'date added') {
      const sortedPosts: DocumentData[] = posts.sort((a, b) => b.date.seconds - a.date.seconds);
      mapPosts = sortedPosts.map((post) => <Post post={post} key={post.id} />);
      setMappedPosts(mapPosts);
      setLoading(false);
    }
  }, [sortingCriteria, posts]);

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
      {loading || mappedPosts.length === 0 ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : null}
      {mappedPosts}
    </ScrollView>
  );
}
