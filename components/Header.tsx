import React from 'react';
import { Heading, Box } from 'native-base';

function Header() {
  return (
    <Box px={4}>
      <Heading
        textAlign="center"
        size="lg"
        color="white"
        opacity={0.9}
        _dark={{
          opacity: 0.7,
        }}>
        Spottedify
      </Heading>
    </Box>
  );
}

export default Header;
