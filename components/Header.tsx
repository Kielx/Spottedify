import React from 'react';
import { Text, Heading } from 'native-base';

function Header() {
  return (
    <>
      <Heading textAlign="center" size="xl">
        Spottedify
      </Heading>
      <Text fontSize="lg" textAlign="center">
        Twoje lokalne ogłoszenia
      </Text>
    </>
  );
}

export default Header;
