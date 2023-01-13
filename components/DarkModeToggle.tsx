import React from "react";
import { useColorMode, HStack, Switch, MoonIcon, SunIcon } from 'native-base';

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center" px={2}>
      <MoonIcon
        size="5"
        mt="0.5"
        color="white"
        opacity={0.9}
        _dark={{
          opacity: 0.7,
        }}
      />
      <Switch
        isChecked={colorMode === 'light'}
        colorScheme="coolGray"
        opacity={0.9}
        _dark={{
          opacity: 0.7,
        }}
        onToggle={toggleColorMode}
        aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
      />
      <SunIcon
        color="white"
        opacity={0.9}
        _dark={{
          opacity: 0.7,
        }}
        size="5"
        mt="0.5"
      />
    </HStack>
  );
}

export default ToggleDarkMode;
