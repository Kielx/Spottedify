import React, { useRef, useContext } from 'react';

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
} from 'native-base';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { AuthContext } from '../utils/AuthStateListener';

function SigninScreen() {
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const emailInput = useRef<any>('');
  const passwordInput = useRef<any>('');

  const signin = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
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
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input type="email" ref={emailInput} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input ref={passwordInput} type="password" />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              href="/test"
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button
            onPress={() => {
              console.log(emailInput.current?.value);
              return signin(emailInput.current?.value, passwordInput.current?.value);
            }}
            mt="2"
            colorScheme="indigo">
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              Nowy użytkownik?
            </Text>
            <Link
              href="/test"
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}>
              Dołącz do nas!
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}

export default SigninScreen;
