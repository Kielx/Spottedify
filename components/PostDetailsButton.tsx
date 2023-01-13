import { DocumentData } from 'firebase/firestore';
import { Box, useToast, WarningIcon, Tooltip, Button, Text, HStack } from 'native-base';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../stacks/RootStack';
import { AuthContext } from '../utils/AuthStateListener';

type Props = {
  post: DocumentData;
};

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

function PostDetailsButton({ post }: Props) {
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();
  const toastId = 'signin-error';
  const navigation = useNavigation<homeScreenProp>();

  return (
    <Tooltip label="Szczegóły" bg="secondary.500" rounded="lg" placement="top">
      <Button
        backgroundColor="primary.700"
        rounded="lg"
        onPress={
          currentUser
            ? () => navigation.navigate('Details', { post })
            : () => {
                if (!toast.isActive('signin-error')) {
                  toast.show({
                    id: toastId,
                    placement: 'top',
                    render: () => (
                      <Box bg="warning.500" px="4" py="1" alignItems="center" rounded="lg" mb={5}>
                        <Text color="white" fontSize="md" px="2" alignItems="center">
                          <WarningIcon color="white" pr="2" />
                          Musisz być zalogowany by wyświetlić szczegóły!
                        </Text>
                      </Box>
                    ),
                  });
                }
              }
        }>
        <HStack space="xs" alignItems="center">
          <Text
            fontWeight="medium"
            fontSize="md"
            color="white"
            _dark={{
              opacity: 0.8,
            }}>
            Szczegóły
          </Text>
        </HStack>
      </Button>
    </Tooltip>
  );
}

export default PostDetailsButton;
