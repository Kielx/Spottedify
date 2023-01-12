import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const [bottomPanelSelectedItem, setBottomPanelSelectedItem] = useState(0);
  const [addPhotoURI, setAddPhotoURI] = useState(null);
  const [addPhotoModalVisible, setAddPhotoModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    setPostsLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, 'publicPosts'), orderBy('date', 'desc')),
      (querySnapshot) => {
        setPosts([]);
        const workPosts = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const { id } = doc;
          workPosts.push({ ...data, id });
        });
        setPosts(workPosts);
        setPostsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      posts,
      postsLoading,
      setPostsLoading,
      bottomPanelSelectedItem,
      setBottomPanelSelectedItem,
      addPhotoURI,
      setAddPhotoURI,
      addPhotoModalVisible,
      setAddPhotoModalVisible,
    }),
    [
      posts,
      postsLoading,
      setPostsLoading,
      bottomPanelSelectedItem,
      setBottomPanelSelectedItem,
      addPhotoURI,
      setAddPhotoURI,
      addPhotoModalVisible,
      setAddPhotoModalVisible,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
