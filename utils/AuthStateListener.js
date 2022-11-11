import React, { useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import PropTypes from 'prop-types';
import { auth } from '../firebaseConfig';

export const AuthContext = React.createContext();

function AuthStateListener({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  auth.languageCode = 'pl';
  const db = getDatabase();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user);
        const userProfileRef = ref(db, `users/${user.uid}`);
        onValue(userProfileRef, (snapshot) => {
          setUserProfile(snapshot.val());
          setLoading(false);
        });
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
