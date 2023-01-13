import React, { useContext } from 'react';
import { Pressable, HStack, Icon, Text } from 'native-base';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../utils/AuthStateListener';

interface RouteHighlightMap {
  [key: string]: number;
}

function HeaderNavigateBackButton() {
  const { currentUser } = useContext(AuthContext);
  const state = useNavigationState((st) => st);
  const navigation = useNavigation();
  const { setBottomPanelSelectedItem } = React.useContext(AppContext);

  const routeHighlightMap: RouteHighlightMap = !currentUser
    ? {
        Home: 0,
        Signup: 1,
        Signin: 2,
      }
    : {
        Home: 0,
        UserDetails: 1,
      };

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
        <Icon as={<MaterialCommunityIcons name="chevron-left" />} color="white" size="lg" />
        <Text color="white" fontSize="14">
          {previousRouteName || 'Wróć'}
        </Text>
      </HStack>
    </Pressable>
  );
}

export default HeaderNavigateBackButton;
