import React from 'react';
import { Text, Heading, VStack, Box, View, Flex } from 'native-base';
import DarkModeToggle from '../components/DarkModeToggle';
import PostsList from '../components/PostsList';

function HomeScreen() {
  return (
    <VStack space={5} alignItems="center">
      <View
        justifyContent="center"
        height="40"
        width="100%"
        _light={{ bg: 'green.300', color: 'white' }}
        _dark={{ bg: 'gray.900', color: 'white' }}>
        <Flex direction="row" justifyContent="center">
          <Box mr="8">
            <Heading textAlign="center" size="xl">
              Spottedify
            </Heading>
            <Text fontSize="lg" textAlign="center">
              Twoje lokalne ogłoszenia
            </Text>
          </Box>
          <DarkModeToggle />
        </Flex>
      </View>
      <PostsList />
    </VStack>
  );
}

export default HomeScreen;
