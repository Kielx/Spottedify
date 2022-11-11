import React, { useState, useContext } from 'react';
import { Text, Icon, HStack, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import { RootStackParamList } from '../stacks/RootStack';
import { AuthContext } from '../utils/AuthStateListener';
import { auth } from '../firebaseConfig';

type bottomPanelProps = StackNavigationProp<RootStackParamList>;

function BottomPanel() {
  const { currentUser } = useContext(AuthContext);
  const [selected, setSelected] = useState(0);
  const navigation: bottomPanelProps = useNavigation();

  const loggedOutItems = (
    <>
      <Pressable
        opacity={selected === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => {
          setSelected(0);
          navigation.navigate('Home');
        }}>
        <Center>
          <Icon
            mb="1"
            as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />}
            color="white"
            size="sm"
          />
          <Text color="white" fontSize="12">
            Home
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={selected === 1 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => {
          setSelected(1);
          navigation.navigate('Signup');
        }}>
        <Center>
          <Icon mb="1" as={<MaterialIcons name="person-add" />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Załóż konto
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={selected === 2 ? 1 : 0.6}
        py="2"
        flex={1}
        onPress={() => {
          setSelected(2);
          navigation.navigate('Signin');
        }}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name="login" />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Zaloguj się
          </Text>
        </Center>
      </Pressable>
    </>
  );

  const loggedInItems = (
    <Pressable
      opacity={selected === 0 ? 1 : 0.5}
      py="3"
      flex={1}
      onPress={() => {
        setSelected(0);
        signOut(auth);
      }}>
      <Center>
        <Icon mb="1" as={<MaterialCommunityIcons name="logout" />} color="white" size="sm" />
        <Text color="white" fontSize="12">
          Wyloguj się
        </Text>
      </Center>
    </Pressable>
  );

  return (
    <HStack bg="primary.700" alignItems="center" safeAreaBottom shadow={6}>
      {!currentUser ? loggedOutItems : loggedInItems}
    </HStack>
  );
}

export default BottomPanel;
