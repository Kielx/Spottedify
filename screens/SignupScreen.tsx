import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setDoc, doc } from 'firebase/firestore';

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
  KeyboardAvoidingView,
} from 'native-base';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Platform } from 'react-native';
import { RootStackParamList } from '../stacks/RootStack';
import { AppContext } from '../context/AppContext';
import { db } from '../firebaseConfig';

type SignupScreen = StackNavigationProp<RootStackParamList, 'Signup'>;

const addNewUserProfile = async (uid: string, name: string) => {
  await setDoc(doc(db, 'users', uid), {
    name,
  });
};

function SigninScreen() {
  const { setBottomPanelSelectedItem } = useContext(AppContext);
  const navigation = useNavigation<SignupScreen>();
  const auth = getAuth();
  const toast = useToast();
  const toastId = 'signup-error';

  const [formInputs, setFormInputs] = useState({ email: '', password: '', name: '' });

  const handleChange = (name: string, value: string) => {
    setFormInputs({ ...formInputs, [name]: value });
  };

  const signup = async (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        addNewUserProfile(user?.uid, name);
        // Signed in
        toast.show({
          title: 'Poprawnie stworzono nowe konto!',
          description: `Możesz teraz korzystać z wszystkich funkcji aplikacji.`,
        });
        navigation.navigate('Home');
        setBottomPanelSelectedItem(0);
      })
      .catch(() => {
        if (!toast.isActive('signup-error')) {
          toast.show({
            id: toastId,
            placement: 'top',
            render: () => (
              <Box bg="red.500" px="4" py="2" rounded="lg" mb={5}>
                <Text color="white" fontSize="lg" px="2">
                  <WarningTwoIcon color="white" size="sm" />
                  Wystąpił błąd podczas tworzenia konta!
                </Text>
              </Box>
            ),
          });
        }
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} w="100%" h="100%">
      <Center w="100%" h="100%" _dark={{ bg: 'light.700' }}>
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
            Utwórz nowe konto by korzystać z wszystkich funkcji!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Adres E-mail</FormControl.Label>
              <Input
                _dark={{
                  borderColor: 'warmGray.400',
                }}
                type="email"
                onChangeText={(value) => handleChange('email', value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Nazwa użytkownika</FormControl.Label>
              <Input
                _dark={{
                  borderColor: 'warmGray.400',
                }}
                onChangeText={(value) => handleChange('name', value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Hasło</FormControl.Label>
              <Input
                _dark={{
                  borderColor: 'warmGray.400',
                }}
                type="password"
                onChangeText={(value) => handleChange('password', value)}
              />
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
                Masz już konto, ale zapomniałeś hasła?
              </Link>
            </FormControl>
            <Button
              onPress={() => signup(formInputs.email, formInputs.password, formInputs.name)}
              mt="2">
              Stwórz konto
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                Masz już konto?
              </Text>
              <Link
                onPress={() => {
                  navigation.navigate('Signin');
                  setBottomPanelSelectedItem(2);
                }}
                _text={{
                  color: 'primary.600',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}>
                {' '}
                Zaloguj się!
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
}

export default SigninScreen;
