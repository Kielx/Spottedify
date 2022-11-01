import React from 'react';
import { VStack } from 'native-base';
import db from '../firebaseConfig';
import { collection, DocumentData, onSnapshot, query, orderBy } from 'firebase/firestore';
import AddNewPostButton from './AddNewPostButton';
import Post from './Post';

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
    return <Post post={post} key={post.id} />;
  });

  return (
    <VStack borderRadius="md" width="1/4" space="4">
      {mapPosts}
      <AddNewPostButton />
    </VStack>
  );
}
