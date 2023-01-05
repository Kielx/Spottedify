import React, { useContext } from 'react';
import {
  Pressable,
  Center,
  Modal,
  Button,
  Stack,
  Input,
  TextArea,
  Icon,
  Text,
  Image,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addDoc, Timestamp, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../stacks/RootStack';
import { db } from '../firebaseConfig';
import { AuthContext } from '../utils/AuthStateListener';
import { AppContext } from '../context/AppContext';

type AddNewPostButtonProps = StackNavigationProp<RootStackParamList>;

function AddNewPostButton() {
  const {
    addPhotoURI,
    addPhotoModalVisible: modalVisible,
    setAddPhotoModalVisible: setModalVisible,
  } = useContext(AppContext);
  const { currentUser, userProfile } = useContext(AuthContext);
  const navigation: AddNewPostButtonProps = useNavigation();
  const [newPost, setNewPost] = React.useState({
    title: '',
    description: '',
    location: '',
  });

  const handleChange = (name: string, value: string) => {
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addNewPost = async () => {
    await addDoc(collection(db, 'publicPosts'), {
      title: newPost.title,
      description: newPost.description,
      location: newPost.location,
      date: Timestamp.fromDate(new Date()),
      likes: 0,
      authorId: currentUser?.uid,
      authorName: userProfile?.name,
    });
    setNewPost({
      title: '',
      description: '',
      location: '',
    });
    setModalVisible(false);
  };

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Dodaj ogłoszenie</Modal.Header>
          <Modal.Body>
            <Stack space={1} w="75%" maxW="300px" mx="auto">
              <Input
                variant="outline"
                placeholder="Tytuł nowego ogłoszenia"
                onChangeText={(value) => handleChange('title', value)}
              />
              <Input
                variant="outline"
                placeholder="Lokalizacja"
                onChangeText={(value) => handleChange('location', value)}
              />
              <TextArea
                variant="outline"
                placeholder="Opis ogłoszenia"
                onChangeText={(value) => handleChange('description', value)}
              />
            </Stack>
            <Button
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('CameraScreen');
              }}>
              Dodaj zdjęcie
            </Button>

            {/**
             * @todo Add image preview with better styling
             */}
            <Image source={{ uri: addPhotoURI }} alt="image" size="xl" />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Anuluj
              </Button>
              <Button
                onPress={() => {
                  addNewPost();
                }}>
                Zapisz
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Pressable
        opacity={modalVisible === true ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name="plus-box" />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Dodaj
          </Text>
        </Center>
      </Pressable>
    </>
  );
}

export default AddNewPostButton;
