import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import {
  Modal,
  Button,
  Stack,
  Input,
  TextArea,
  Icon,
  IconButton,
  Center,
  Image,
} from 'native-base';
import { Timestamp, DocumentData, doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../stacks/RootStack';
import { db } from '../firebaseConfig';
import AddPhotoButton from './AddPhotoButton';

type AddNewPostButtonProps = StackNavigationProp<RootStackParamList>;

function EditPostButton({ poste }: DocumentData) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation: AddNewPostButtonProps = useNavigation();
  const [photoUri, setPhotoUri] = useState(poste.photo || '');
  const [editPost, setEditPost] = useState({
    title: '',
    description: '',
    location: '',
  });

  const handleChange = (name: string, value: string) => {
    setEditPost((prev) => ({ ...prev, [name]: value }));
  };

  const EditPost = async () => {
    const docRef = doc(db, 'publicPosts', poste.id);

    const data = {
      title: editPost.title !== '' ? editPost.title : poste.title,
      description: editPost.description !== '' ? editPost.description : poste.description,
      location: editPost.location !== '' ? editPost.location : poste.location,
      date: Timestamp.fromDate(new Date()),
      photo: photoUri,
    };

    await updateDoc(docRef, data);
  };

  const checkIfWebOrMobile: () => boolean | undefined = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return false;
    }
    if (Platform.OS === 'web') {
      return true;
    }
    return undefined;
  };

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edytuj ogłoszenie</Modal.Header>
          <Modal.Body>
            <Stack space={1} w="75%" maxW="300px" mx="auto">
              <Input
                variant="outline"
                defaultValue={poste.title}
                onChangeText={(value) => handleChange('title', value)}
              />
              <Input
                variant="outline"
                defaultValue={poste.location}
                onChangeText={(value) => handleChange('location', value)}
              />
              <TextArea
                variant="outline"
                defaultValue={poste.description}
                onChangeText={(value) => handleChange('description', value)}
              />
              {!checkIfWebOrMobile() ? (
                <Button
                  leftIcon={
                    <Icon as={<MaterialCommunityIcons name="camera" />} size="sm" color="white" />
                  }
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('CameraScreen');
                  }}>
                  Dodaj zdjęcie z aparatu
                </Button>
              ) : null}
              <AddPhotoButton setAddPhotoURI={setPhotoUri} />
              {photoUri ? (
                <Center>
                  <Image size="2xl" source={{ uri: photoUri }} alt="User chosen image" />
                </Center>
              ) : null}
            </Stack>
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
                  EditPost();
                }}>
                Zapisz
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <IconButton
        onPress={() => {
          setModalVisible(true);
        }}
        position="absolute"
        top="0"
        right="7"
        icon={<Icon as={<MaterialCommunityIcons name="pencil" />} color="white" size="md" />}
      />
    </>
  );
}

export default EditPostButton;
