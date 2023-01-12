import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  HStack,
  Tooltip,
} from 'native-base';
import { Timestamp, DocumentData, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AddPhotoButton from './AddPhotoButton';
import GetLocationButton from './GetLocationButton';

function EditPostButton({ poste }: DocumentData) {
  const [modalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(poste.photo || '');
  const [editPost, setEditPost] = useState({
    title: poste.title,
    description: poste.description,
    location: poste.location,
  });

  const handleChange = (name: string, value: string) => {
    setEditPost((prev) => ({ ...prev, [name]: value }));
  };

  const EditPost = async () => {
    const docRef = doc(db, 'publicPosts', poste.id);

    const data = {
      title: editPost.title,
      description: editPost.description,
      location: editPost.location,
      date: Timestamp.fromDate(new Date()),
      photo: photoUri,
    };

    await updateDoc(docRef, data);
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
                value={editPost.title}
                onChangeText={(value) => handleChange('title', value)}
              />
              <HStack>
                <Input
                  flex={1}
                  variant="outline"
                  placeholder="Lokalizacja"
                  onChangeText={(value) => handleChange('location', value)}
                  value={editPost.location}
                />
                <GetLocationButton handleChange={handleChange} />
              </HStack>
              <TextArea
                variant="outline"
                value={editPost.description}
                onChangeText={(value) => handleChange('description', value)}
              />
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
      <Tooltip label="Edytuj" bg="secondary.500" rounded="xl" placement="top">
        <IconButton
          onPress={() => {
            setModalVisible(true);
          }}
          icon={<Icon as={<MaterialCommunityIcons name="pencil" />} color="white" size="md" />}
        />
      </Tooltip>
    </>
  );
}

export default EditPostButton;
