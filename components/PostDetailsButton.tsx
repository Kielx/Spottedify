import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DocumentData } from 'firebase/firestore';
import { Box, Text, useToast, WarningIcon, Tooltip, Icon, Button } from 'native-base';
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
    <Tooltip label="Szczegóły" bg="secondary.500" rounded="xl" placement="top">
      <Button
        rounded="full"
        backgroundColor="blue.500"
        icon={
          <Icon
            as={<MaterialCommunityIcons name="card-account-details" />}
            color="white"
            size="md"
          />
        }
        onPress={
          currentUser
            ? () => navigation.navigate('Details', { post })
            : () => {
                if (!toast.isActive('signin-error')) {
                  toast.show({
                    id: toastId,
                    placement: 'top',
                    render: () => (
                      <Box bg="warning.500" px="4" py="1" alignItems="center" rounded="xl" mb={5}>
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
        Szczegóły
      </Button>
    </Tooltip>
  );
}

export default PostDetailsButton;
