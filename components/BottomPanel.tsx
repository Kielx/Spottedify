import React, { useContext } from 'react';
import { Text, Icon, HStack, Center, Pressable, useToast } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import { RootStackParamList } from '../stacks/RootStack';
import { AuthContext } from '../utils/AuthStateListener';
import { AppContext } from '../context/AppContext';
import { auth } from '../firebaseConfig';
import AddNewPostButton from './AddNewPostButton';

type bottomPanelProps = StackNavigationProp<RootStackParamList>;

function BottomPanel() {
  const toast = useToast();
  const { currentUser } = useContext(AuthContext);
  const { bottomPanelSelectedItem, setBottomPanelSelectedItem } = useContext(AppContext);
  const navigation: bottomPanelProps = useNavigation();

  const loggedOutItems = (
    <>
      <Pressable
        opacity={bottomPanelSelectedItem === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => {
          setBottomPanelSelectedItem(0);
          navigation.navigate('Home');
        }}>
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={bottomPanelSelectedItem === 0 ? 'home' : 'home-outline'}
              />
            }
            color="white"
            size="sm"
          />
          <Text color="white" fontSize="12">
            Home
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={bottomPanelSelectedItem === 1 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => {
          setBottomPanelSelectedItem(1);
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
        opacity={bottomPanelSelectedItem === 2 ? 1 : 0.6}
        py="2"
        flex={1}
        onPress={() => {
          setBottomPanelSelectedItem(2);
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
    <>
      <AddNewPostButton />
      <Pressable
        opacity={bottomPanelSelectedItem === 2 ? 1 : 0.6}
        py="2"
        flex={1}
        onPress={() => {
          setBottomPanelSelectedItem(2);
          navigation.navigate('UserDetails');
        }}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name="account-box" />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Twój Profil
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={0.5}
        py="3"
        flex={1}
        onPress={() => {
          setBottomPanelSelectedItem(0);
          signOut(auth);
          toast.show({
            title: 'Poprawnie wylogowano',
            placement: 'top',
            duration: 3000,
          });
        }}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name="logout" />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Wyloguj się
          </Text>
        </Center>
      </Pressable>
    </>
  );

  return (
    <HStack bg="primary.700" alignItems="center" safeAreaBottom shadow={6}>
      {!currentUser ? loggedOutItems : loggedInItems}
    </HStack>
  );
}

export default BottomPanel;
