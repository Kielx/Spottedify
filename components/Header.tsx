import React from 'react';
import { Text, Heading, Box } from 'native-base';

function Header() {
  return (
    <Box px={4} my={4}>
      <Heading textAlign="center" size="lg">
        Spottedify
      </Heading>
      <Text fontSize="sm" textAlign="center">
        Twoje lokalne ogłoszenia
      </Text>
    </Box>
  );
}

export default Header;
