import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  useToast,
  WarningTwoIcon,
} from 'native-base';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { RootStackParamList } from '../stacks/RootStack';

type SigninScreenProp = StackNavigationProp<RootStackParamList, 'Signin'>;

function SigninScreen() {
  const navigation = useNavigation<SigninScreenProp>();
  const auth = getAuth();
  const toast = useToast();
  const toastId = 'signin-error';

  const [formInputs, setFormInputs] = useState({ email: '', password: '' });

  const handleChange = (name: string, value: string) => {
    setFormInputs({ ...formInputs, [name]: value });
  };

  const signin = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        toast.show({
          title: 'Zalogowano!',
          description: `Poprawnie zalogowano jako ${user?.email}`,
        });
      })
      .catch(() => {
        if (!toast.isActive('signin-error')) {
          toast.show({
            id: toastId,
            placement: 'top',
            render: () => (
              <Box bg="red.500" px="4" py="2" rounded="md" mb={5}>
                <Text color="white" fontSize="lg" px="2">
                  <WarningTwoIcon color="white" size="sm" />
                  Wystąpił błąd podczas logowania!
                </Text>
              </Box>
            ),
          });
        }
      });
  };

  return (
    <Center w="100%" h="full" _dark={{ bg: 'light.900' }}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Witaj!
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Zaloguj się by kontynuować!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Adres E-mail</FormControl.Label>
            <Input type="email" onChangeText={(value) => handleChange('email', value)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Hasło</FormControl.Label>
            <Input type="password" onChangeText={(value) => handleChange('password', value)} />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'primary.600',
              }}
              onPress={() => {
                navigation.navigate('ResetPassword');
              }}
              alignSelf="flex-end"
              mt="1">
              Zapomniałeś hasła?
            </Link>
          </FormControl>
          <Button onPress={() => signin(formInputs.email, formInputs.password)} mt="2">
            Zaloguj się
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
              onPress={() => {
                navigation.navigate('Signup');
              }}
              _text={{
                color: 'primary.600',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}>
              {' '}
              Dołącz do nas!
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}

export default SigninScreen;
