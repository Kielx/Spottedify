import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {
  Box,
  Text,
  useToast,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  WarningTwoIcon,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../stacks/RootStack';

type ResetPasswordScreenProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

function ResetPassword() {
  const navigation = useNavigation<ResetPasswordScreenProp>();
  const auth = getAuth();
  const toast = useToast();
  const [formInputs, setFormInputs] = useState({ email: '' });

  const handleChange = (name: string, value: string) => {
    setFormInputs({ ...formInputs, [name]: value });
  };

  const resetPassword = async (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.show({
          title: 'Wysłano email z linkiem do resetowania hasła!',
          description: `By zresetować hasło postępuj zgodnie z instrukcjami z wiadomości email`,
        });
        navigation.goBack();
      })
      .catch(() => {
        if (!toast.isActive('signin-error')) {
          toast.show({
            id: 'signin-error',
            placement: 'top',
            render: () => (
              <Box bg="red.500" px="4" py="2" rounded="md" mb={5}>
                <Text color="white" fontSize="lg" px="2">
                  <WarningTwoIcon color="white" size="sm" />
                  Wystąpił błąd podczas wysyłania wiadomości!
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
          Zapomniałeś hasła?
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Podaj swój adres e-mail, a wyślemy Ci wiadomość z przypomnieniem!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Adres E-mail</FormControl.Label>
            <Input type="email" onChangeText={(value) => handleChange('email', value)} />
          </FormControl>
          <Button
            onPress={() => {
              resetPassword(formInputs.email);
            }}
            mt="2">
            Zaloguj się
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default ResetPassword;
