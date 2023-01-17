/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { Flex, ScrollView, Select, Text } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import { AuthContext } from '../utils/AuthStateListener';
import { verticalScale, horizontalScale } from '../utils/Metrics';
import PostShort from './PostShort';
import UserPostListSkeleton from './UserPostListSkeleton';
import { AppContext } from '../context/AppContext';

export default function UserPostsList() {
  const { currentUser } = useContext(AuthContext);
  const { posts, postsLoading, setPostsLoading } = useContext(AppContext);
  const [filteredPosts, setFilteredPosts] = useState<DocumentData[]>([]);
  const [sortingCriteria, setSortingCriteria] = React.useState('userPosts');

  useEffect(() => {
    setPostsLoading(true);
    const preFilteredPosts = posts.filter(
      (post: { authorId: string }) => post.authorId === currentUser?.uid
    );
    if (sortingCriteria === 'likedPosts') {
      const likedPosts = preFilteredPosts.filter((post: DocumentData) =>
        post.likes.includes(currentUser?.uid)
      );
      setFilteredPosts(likedPosts);
    }
    if (sortingCriteria === 'userPosts') {
      setFilteredPosts(preFilteredPosts);
    }
    setPostsLoading(false);
  }, [sortingCriteria, posts]);

  const mapPosts = filteredPosts.map((post: DocumentData) => (
    <PostShort post={post} key={post.id} />
  ));

  return (
    <ScrollView flex="1" maxW="768px" w={horizontalScale(350)} h={verticalScale(350)}>
      <Flex direction="row" alignItems="center" justifyContent="flex-end" mb={2}>
        <Text fontSize="sm" mr="2" color="gray.400">
          Sortuj według:
        </Text>
        <Select
          placeholder="Pokaż posty:"
          selectedValue={sortingCriteria}
          width={150}
          onValueChange={(itemValue: string) => setSortingCriteria(itemValue)}>
          <Select.Item label="Twoje posty" value="userPosts" />
          <Select.Item label="Polubione posty" value="likedPosts" />
        </Select>
      </Flex>
      {postsLoading || filteredPosts.length === 0
        ? [...Array(5)].map((_, i) => <UserPostListSkeleton key={i} />)
        : mapPosts}
    </ScrollView>
  );
}
