import React, { useState } from 'react';
import { Modal, Button, Stack, IconButton, Icon, Text, Tooltip } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DocumentData, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type Props = {
  postr: DocumentData;
};

function RemovePostButton({ postr }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const RemovePost = async () => {
    const docRef = doc(db, 'publicPosts', postr.id);
    setModalVisible(false);
    await deleteDoc(docRef);
  };

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Usuń ogłoszenie</Modal.Header>
          <Modal.Body>
            <Stack space={1} w="75%" maxW="300px" mx="auto">
              <Text>Czy napewno chcesz usunąć post?</Text>
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
                colorScheme="danger"
                onPress={() => {
                  RemovePost();
                }}>
                Usuń
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Tooltip label="Usuń" bg="secondary.500" rounded="lg" placement="top">
        <IconButton
          rounded="lg"
          onPress={() => {
            setModalVisible(true);
          }}
          icon={
            <Icon
              as={<MaterialCommunityIcons name="delete-outline" />}
              color="primary.700"
              _dark={{ color: 'warmGray.400' }}
              size="md"
            />
          }
        />
      </Tooltip>
    </>
  );
}

export default RemovePostButton;
