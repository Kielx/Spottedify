import React from 'react';
import {
  Text,
  Heading,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  View,
  Flex,
} from 'native-base';
import DarkModeToggle from './components/DarkModeToggle';
import PostsList from './components/PostsList';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  return (
    <NativeBaseProvider>
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
        <PostsList></PostsList>
      </VStack>
    </NativeBaseProvider>
  );
}
