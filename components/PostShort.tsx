import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Box,
  Text,
  Flex,
  useToast,
  WarningIcon,
  Image,
  VStack,
  Icon,
  IconButton,
  Tooltip,
} from 'native-base';
import { DocumentData } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../stacks/RootStack';
import { AuthContext } from '../utils/AuthStateListener';
import LikeUser from './LikeUser';
import RemovePostButton from './RemovePostButton';
import EditPostButton from './EditPostButton';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  post: DocumentData;
};

function PostShort({ post }: Props) {
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();
  const toastId = 'signin-error';
  const navigation = useNavigation<homeScreenProp>();
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Box
      flexDirection={isBigScreen ? 'row' : 'column'}
      key={post.id}
      _light={{ bg: 'green.300', color: 'white' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      my="1"
      p="0"
      rounded="md"
      shadow="3">
      {post.photo ? (
        <Image
          size="sm"
          source={{ uri: post.photo }}
          alt="post photo"
          _ios={{ roundedTop: 'md' }}
          _android={{ roundedTop: 'md' }}
          _web={{
            roundedLeft: 'md',
          }}
        />
      ) : null}
      <VStack flex="1">
        <Box p="1">
          <Flex flexDirection="row" alignItems="center">
            <Text pt="1" fontWeight="bold" fontSize="sm">
              {post.title}
            </Text>
            <LikeUser size="4" color="red.700" mr="4" post={post} />
            <Text pt="1" pl="2" fontWeight="bold" fontSize="sm">
              {post.likes.length}
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
          </Text>
        </Box>
      </VStack>

      <>
        <Tooltip label="Szczegóły" bg="secondary.500" rounded="md" placement="top">
          <IconButton
            position="absolute"
            top="0"
            right="20"
            roundedTop={0}
            _web={{
              roundedLeft: 0,
            }}
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
                          <Box
                            bg="warning.500"
                            px="4"
                            py="1"
                            alignItems="center"
                            rounded="md"
                            mb={5}>
                            <Text color="white" fontSize="md" px="2" alignItems="center">
                              <WarningIcon color="white" pr="2" />
                              Musisz być zalogowany by wyświetlić szczegóły!
                            </Text>
                          </Box>
                        ),
                      });
                    }
                  }
            }
          />
        </Tooltip>

        <RemovePostButton postr={post} />
        <EditPostButton poste={post} />
      </>
    </Box>
  );
}

export default PostShort;
