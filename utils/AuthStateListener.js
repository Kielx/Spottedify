import React, { useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, query } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { auth, db } from '../firebaseConfig';

export const AuthContext = React.createContext();

function AuthStateListener({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  auth.languageCode = 'pl';

  const getUserProfile = async (userId) => {
    const q = query(doc(db, `users/${userId}`));
    onSnapshot(q, (document) => {
      setUserProfile(document.data());
    });
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user);
        getUserProfile(user.uid);
      } else {
        // User is signed out
        // ...
        // console.log("signedOut");
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, [auth, db]);

  const value = useMemo(
    () => ({
      currentUser,
      userProfile,
      loading,
    }),
    [currentUser, loading, userProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthStateListener.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthStateListener;
