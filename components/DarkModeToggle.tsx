import React from "react";
import { useColorMode, HStack, Switch, MoonIcon, SunIcon } from 'native-base';

// Color Switch Component
const ToggleDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <MoonIcon size="5" mt="0.5" color="white" />
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
      />
      <SunIcon size="5" mt="0.5" color="white" />
    </HStack>
  );
};

export default ToggleDarkMode;
