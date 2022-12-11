import React, { useContext } from 'react';
import { Avatar, VStack, Heading, Text, Center } from 'native-base';
import { AuthContext } from '../utils/AuthStateListener';
import UserPostsList from '../components/UserPostLists';

function UserDetailsScreen() {
  const { userProfile, currentUser } = useContext(AuthContext);

  return (
    <VStack
      _dark={{
        bg: 'coolGray.700',
      }}
      flex={1}
      space={3}
      alignItems="center"
      justifyContent="center">
      <Avatar
        size="2xl"
        bg="amber.500"
        source={{
          uri: currentUser.photoURL,
        }}>
        {userProfile?.name[0] || currentUser.email[0]}
      </Avatar>
      <Heading>{userProfile?.name || currentUser.email}</Heading>
      <Text color="muted.400" fontSize="lg">
        W serwisie od{' '}
        {new Date(currentUser.metadata.creationTime).toLocaleDateString('pl-PL', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text color="muted.400" fontSize="lg">
        Ostatnie logowanie{' '}
        {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString('pl-PL', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text color="muted.400" fontSize="lg">
        Twoje posty
      </Text>
      <Center pt={10} flex={1} _dark={{bg: 'coolGray.700'}}>
        <UserPostsList />
      </Center>
    </VStack>
  );
}

export default UserDetailsScreen;
