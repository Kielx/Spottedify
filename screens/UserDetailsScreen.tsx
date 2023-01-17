import React, { useContext } from 'react';
import { Avatar, VStack, Heading, Text } from 'native-base';
import { AuthContext } from '../utils/AuthStateListener';
import UserPostsList from '../components/UserPostsList';

function UserDetailsScreen() {
  const { userProfile, currentUser } = useContext(AuthContext);

  return (
    <VStack
      _dark={{
        bg: 'warmGray.700',
      }}
      flex={1}
      space={3}
      alignItems="center"
      justifyContent="center"
      py={4}>
      <Avatar
        size="2xl"
        bg="amber.500"
        source={{
          uri: currentUser.photoURL,
        }}>
        {userProfile?.name[0] || currentUser.email[0]}
      </Avatar>
      <Heading>{userProfile?.name || currentUser.email}</Heading>
      <VStack space={0} alignItems="center">
        <Text color="muted.400" fontSize="md">
          W serwisie od{' '}
          {new Date(currentUser.metadata.creationTime).toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text color="muted.400" fontSize="md">
          Ostatnie logowanie{' '}
          {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </VStack>
      <Text
        fontWeight="bold"
        _dark={{
          color: 'secondary.700',
        }}
        color="primary.700"
        fontSize="xl">
        Twoje posty
      </Text>
      <UserPostsList />
    </VStack>
  );
}

export default UserDetailsScreen;
