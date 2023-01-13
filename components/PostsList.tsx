/* eslint-disable no-nested-ternary */
import React, { ReactElement, useContext } from 'react';
import { Flex, ScrollView, Select, Text } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import { useMediaQuery } from 'react-responsive';
import Post from './Post';
import { verticalScale, horizontalScale } from '../utils/Metrics';
import getCurrentCity from '../utils/getCurrentCity';
import LoadingSkeleton from './LoadingSkeleton';
import { AppContext } from '../context/AppContext';
import LoadingSkeletonMobile from './LoadingSkeletonMobile';

export default function PostsList() {
  const { posts, postsLoading, setPostsLoading } = useContext(AppContext);
  const [mappedPosts, setMappedPosts] = React.useState<ReactElement[]>([]);
  const [sortingCriteria, setSortingCriteria] = React.useState('date added');
  const [location, setLocation] = React.useState('');
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });

  React.useEffect(() => {
    const getLocation = async () => {
      const loc = await getCurrentCity();
      setLocation(loc);
    };
    getLocation();
  }, []);

  React.useEffect(() => {
    setPostsLoading(true);
    let mapPosts: ReactElement[] = [];
    if (sortingCriteria === 'current location') {
      const getLocation = async () => {
        try {
          const filteredPosts = posts.filter(
            (post: { location: string }) => post.location === location
          );
          mapPosts = filteredPosts.map((post: DocumentData) => <Post post={post} key={post.id} />);
          setMappedPosts(mapPosts);
        } catch (error) {
          // Error retrieving data
        }
      };
      getLocation();
    } else if (sortingCriteria === 'likes') {
      const sortedPosts = posts.sort(
        (a: { likes: string | string[] }, b: { likes: string | string[] }) =>
          b.likes.length - a.likes.length
      );
      mapPosts = sortedPosts.map((post: DocumentData) => <Post post={post} key={post.id} />);
      setMappedPosts(mapPosts);
    } else if (sortingCriteria === 'date added') {
      const sortedPosts: DocumentData[] = posts.sort(
        (a: { date: { seconds: number } }, b: { date: { seconds: number } }) =>
          b.date.seconds - a.date.seconds
      );
      mapPosts = sortedPosts.map((post) => <Post post={post} key={post.id} />);
      setMappedPosts(mapPosts);
    }
    setPostsLoading(false);
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
      {postsLoading || mappedPosts.length === 0 ? (
        isBigScreen ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          <>
            <LoadingSkeletonMobile />
            <LoadingSkeletonMobile />
          </>
        )
      ) : null}
      {mappedPosts}
    </ScrollView>
  );
}
