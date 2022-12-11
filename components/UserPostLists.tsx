import React, { useContext } from 'react';
import { ScrollView } from 'native-base';
import { collection, DocumentData, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import UserPost from './UserPost';
import { verticalScale, horizontalScale } from '../utils/Metrics';
import { AuthContext } from '../utils/AuthStateListener';

export default function PostsList() {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);
  const { currentUser } = useContext(AuthContext);

  React.useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, 'publicPosts'), where('authorId', '==', currentUser.uid), orderBy('date', 'desc'));
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

  const mapPosts = posts.map((post) => <UserPost post={post} key={post.id} />);

  return (
    <ScrollView px={1} w={horizontalScale(300)} h={verticalScale(350)}>
      {mapPosts}
    </ScrollView>
  );
}

