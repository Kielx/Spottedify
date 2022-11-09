import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Button } from 'native-base';
import { AuthContext } from '../utils/AuthStateListener';

function Signup() {
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const signup = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <View>
      <Text>Signup</Text>
      <Text>{currentUser?.email || 'DUPA'}</Text>
      <Button title="Sign Up" label="SignUp" onPress={() => signup('abc@abc.pl', '123456')}>
        Register
      </Button>
      <Button
        title="Sign In"
        label="SignIn"
        onPress={() => signInWithEmailAndPassword(auth, 'abc@abc.pl', '123456')}>
        Sign in
      </Button>
      <Button title="Sign Out" label="SignOut" onPress={() => signOut(auth)}>
        Sign out
      </Button>
    </View>
  );
}

export default Signup;
