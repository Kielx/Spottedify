/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'native-base';
import { DocumentData } from 'firebase/firestore';
import { AuthContext } from '../utils/AuthStateListener';
import { verticalScale, horizontalScale } from '../utils/Metrics';
import PostShort from './PostShort';
import UserPostListSkeleton from './UserPostListSkeleton';
import { AppContext } from '../context/AppContext';

export default function UserPostsList() {
  const { currentUser } = useContext(AuthContext);
  const { posts, postsLoading } = useContext(AppContext);
  const [filteredPosts, setFilteredPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    const preFilteredPosts = posts.filter(
      (post: { authorId: string }) => post.authorId === currentUser?.uid
    );
    setFilteredPosts(preFilteredPosts);
  }, [posts]);

  const mapPosts = filteredPosts.map((post: DocumentData) => (
    <PostShort post={post} key={post.id} />
  ));

  return (
    <ScrollView px={1} maxW="768px" w={horizontalScale(300)} h={verticalScale(350)}>
      {}
      {postsLoading ? [...Array(5)].map((_, i) => <UserPostListSkeleton key={i} />) : mapPosts}
    </ScrollView>
  );
}
