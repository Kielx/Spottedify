import React from 'react';
import { Modal, Button, Stack, IconButton, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DocumentData, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type Props = {
  postr: DocumentData;
  posts: DocumentData[];
  setPosts: React.Dispatch<React.SetStateAction<DocumentData[]>>;
};

function RemovePostButton({ postr, posts, setPosts }: Props) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const RemovePost = async () => {
    const docRef = doc(db, 'publicPosts', postr.id);
    await deleteDoc(docRef);
    const newPosts = posts.filter((post) => post.id !== postr.id);
    setPosts(newPosts);

    setModalVisible(false);
  };

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Usuń ogłoszenie</Modal.Header>
          <Modal.Body>
            <Stack space={1} w="75%" maxW="300px" mx="auto">
              Czy napewno chcesz usunąć post?
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
                  RemovePost();
                }}>
                Usuń
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
        right="0"
        icon={
          <Icon as={<MaterialCommunityIcons name="delete-outline" />} color="white" size="md" />
        }
      />
    </>
  );
}

export default RemovePostButton;