import React, { useContext } from 'react';
import { ScrollView } from 'native-base';
import { collection, DocumentData, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../utils/AuthStateListener';
import { verticalScale, horizontalScale } from '../utils/Metrics';
import PostShort from './PostShort';

export default function UserPostsList() {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, 'publicPosts'), where('authorId', '==', currentUser.uid));
      onSnapshot(q, (querySnapshot) => {
        setPosts([]);
        const workPosts: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const { id } = doc;
          workPosts.push({ ...data, id });
        });
        setPosts(workPosts);
      });
    };
    if (currentUser.uid) {
      getPosts();
    }
  }, []);

  const mapPosts = posts.map((post) => <PostShort post={post} key={post.id} />);

  return (
    <ScrollView px={1} maxW="768px" w={horizontalScale(300)} h={verticalScale(350)}>
      {mapPosts}
    </ScrollView>
  );
}
