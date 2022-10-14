import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  View,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import DarkModeToggle from "./components/DarkModeToggle";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  return (
    <NativeBaseProvider>
   
        <VStack space={5} alignItems="center">
          <View justifyContent="center" height="40" width="100%" bg="green.300" _light={{ bg: 'green.300', color: 'white'}} _dark={{ bg: 'amber.900', color: 'white' }}>
          <Heading  textAlign="center" size="xl" >Spottedify</Heading>
          <Text fontSize="lg" textAlign="center">
            Twoje lokalne ogłoszenia
          </Text>
          </View>
          
          
          
          <DarkModeToggle />
        </VStack>
     
    </NativeBaseProvider>
  );
}


