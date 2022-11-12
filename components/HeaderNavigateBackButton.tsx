import React from 'react';
import { Pressable, HStack, Icon, Text } from 'native-base';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

interface RouteHighlightMap {
  [key: string]: number;
}

const routeHighlightMap: RouteHighlightMap = {
  Home: 0,
  Signup: 1,
  Signin: 2,
};

function HeaderNavigateBackButton() {
  const state = useNavigationState((st) => st);
  const navigation = useNavigation();
  const { setBottomPanelSelectedItem } = React.useContext(AppContext);

  const routesLength = state?.routes?.length;
  const previousRouteName = state?.routes[routesLength - 2]?.name;

  return (
    <Pressable
      bg="transparent"
      pl={0}
      _focus={{ bg: 'transparent' }}
      onPress={() => {
        navigation.goBack();
        setBottomPanelSelectedItem(routeHighlightMap[previousRouteName]);
      }}>
      <HStack ml={1} alignItems="center">
        <Icon as={<MaterialCommunityIcons name="chevron-left" />} color="blue.500" size="lg" />
        <Text color="blue.500" fontSize="14">
          {previousRouteName || 'Wróć'}
        </Text>
      </HStack>
    </Pressable>
  );
}

export default HeaderNavigateBackButton;
