import React from 'react';
import { VStack } from 'native-base';
import { collection, DocumentData, onSnapshot, query, orderBy } from 'firebase/firestore';
import db from '../firebaseConfig';
import AddNewPostButton from './AddNewPostButton';
import Post from './Post';

export default function PostsList() {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, 'publicPosts'), orderBy('date', 'desc'));
      onSnapshot(q, (querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const {id} = doc;
          setPosts((prev: DocumentData[]) => [...prev, { ...data, id }]);
        });
      });
    };

    getPosts();
  }, []);

  const mapPosts = posts.map((post) => <Post post={post} key={post.id} />);

  return (
    <VStack borderRadius="md" width="full" space="4" px="6" pb="20">
      {mapPosts}
      <AddNewPostButton />
    </VStack>
  );
}

