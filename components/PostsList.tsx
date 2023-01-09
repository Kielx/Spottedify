import React from 'react';
import { ScrollView, Select } from 'native-base';
import { collection, DocumentData, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Post from './Post';
import { verticalScale, horizontalScale } from '../utils/Metrics';

export default function PostsList() {
  const [posts, setPosts] = React.useState<DocumentData[]>([]);
  const [sortingCriteria, setSortingCriteria] = React.useState('date added');

  React.useEffect(() => {
    const queryByDate = async () => {
      onSnapshot(query(collection(db, 'publicPosts'), orderBy('date', 'desc')), (querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          const data: DocumentData = doc.data();
          const { id } = doc;
          setPosts((prev: DocumentData[]) => [...prev, { ...data, id }]);
        });
      });
    };

    const queryByLikes = async () => {
      onSnapshot(
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
    };
    // @todo - Update query to use current location
    const queryByCurrentLocation = async () => {
      onSnapshot(
        query(collection(db, 'publicPosts'), where('location', '==', 'Jędrzejów')),
        (querySnapshot) => {
          setPosts([]);
          querySnapshot.forEach((doc) => {
            const data: DocumentData = doc.data();
            const { id } = doc;
            setPosts((prev: DocumentData[]) => [...prev, { ...data, id }]);
          });
        }
      );
    };

    if (sortingCriteria === 'date added') {
      queryByDate();
    }
    if (sortingCriteria === 'likes') {
      queryByLikes();
    }
    if (sortingCriteria === 'current location') {
      queryByCurrentLocation();
    }
  }, [sortingCriteria]);

  const mapPosts = posts.map((post) => <Post post={post} key={post.id} />);

  return (
    <ScrollView px={1} maxW="768px" w={horizontalScale(300)} h={verticalScale(350)}>
      <Select
        placeholder="Mode of payment"
        selectedValue={sortingCriteria}
        width={150}
        onValueChange={(itemValue: string) => setSortingCriteria(itemValue)}>
        <Select.Item label="Date added" value="date added" />
        <Select.Item label="Likes" value="likes" />
        <Select.Item label="Current Location" value="current location" />
      </Select>
      {mapPosts}
    </ScrollView>
  );
}

