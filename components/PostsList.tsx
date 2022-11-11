import React from 'react';
import { ScrollView } from 'native-base';
import { collection, DocumentData, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Post from './Post';
import { verticalScale, horizontalScale } from '../utils/Metrics';

export default function PostsList() {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, 'publicPosts'), orderBy('date', 'desc'));
      onSnapshot(q, (querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const { id } = doc;
          setPosts((prev: DocumentData[]) => [...prev, { ...data, id }]);
        });
      });
    };

    getPosts();
  }, []);

  const mapPosts = posts.map((post) => <Post post={post} key={post.id} />);

  return (
    <ScrollView px={1} w={horizontalScale(300)} h={verticalScale(350)}>
      {mapPosts}
    </ScrollView>
  );
}

