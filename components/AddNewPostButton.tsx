import React from 'react';
import { Pressable, Center, Modal, Button, Stack, Input, TextArea, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addDoc, Timestamp, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type Props = {
  selected: number;
};

function AddNewPostButton({ selected }: Props) {
  const [modalVisible, setModalVisible] = React.useState(false);
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
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  addNewPost();
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Pressable
        opacity={selected === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name="logout" />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Dodaj ogłoszenie
          </Text>
        </Center>
      </Pressable>
    </>
  );
}

export default AddNewPostButton;
