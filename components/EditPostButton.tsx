import React, { useState} from 'react';
import { Modal, Button, Stack, Input, TextArea } from 'native-base';
import { Timestamp, DocumentData, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function EditPostButton({ poste }: DocumentData) {

    const [modalVisible, setModalVisible] =useState(false);
    const [editPost, setEditPost] = useState({
        title: '',
        description: '',
        location: '',
    });

    const handleChange = (name: string, value: string) => {
        setEditPost((prev) => ({ ...prev, [name]: value }));
    };

    const EditPost = async () => {

        const docRef = doc(db, "publicPosts", poste.id);

        const data = {
            title: editPost.title !== '' ? editPost.title : poste.title,
            description: editPost.description !== '' ? editPost.description : poste.description,
            location: editPost.location !== '' ? editPost.location : poste.location,
            date: Timestamp.fromDate(new Date()),
        }

        await updateDoc(docRef, data);

        setEditPost({
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
                            <Button>
                                Dodaj zdjęcie
                            </Button>
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
            <Button
                mt="2"
                onPress={() => {
                    setModalVisible(true);
                }}>
                Edytuj
            </Button>
        </>
    );
}

export default EditPostButton;