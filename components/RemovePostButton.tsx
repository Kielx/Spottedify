import React from 'react';
import { Modal, Button, Stack} from 'native-base';
import {  DocumentData, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function RemovePostButton({ postr }: DocumentData) {
    const [modalVisible, setModalVisible] = React.useState(false);

    const RemovePost = async () => {

        const docRef = doc(db, "publicPosts", postr.id);
        deleteDoc(docRef)
        .then(()=>{
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        })

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
            <Button
                mt="2"
                onPress={() => {
                    setModalVisible(true);
                }}>
                Usuń
            </Button>
        </>
    );
}

export default RemovePostButton;