import React, { useContext } from 'react';
import { Box, Text, FavouriteIcon, useToast, WarningIcon, Tooltip } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { doc, arrayUnion, arrayRemove, updateDoc, DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../utils/AuthStateListener';

function LikeUser({ post }: DocumentData) {
  const toast = useToast();
  const { id, likes } = post;

  const toastId = 'signin-error';
  const { currentUser } = useContext(AuthContext);
  const docRef = doc(db, 'publicPosts', id);
  let color = 'gray.400';
  if (currentUser && likes) {
    if (likes.includes(currentUser?.uid)) {
      color = 'red.500';
    }
  }
  function toggleLike() {
    if (likes.includes(currentUser?.uid)) {
      updateDoc(docRef, {
        likes: arrayRemove(currentUser?.uid),
      });
    } else {
      updateDoc(docRef, {
        likes: arrayUnion(currentUser?.uid),
      });
    }
  }
  return (
    <TouchableOpacity
      onPress={
        currentUser
          ? () => toggleLike()
          : () => {
              if (!toast.isActive('signin-error')) {
                toast.show({
                  id: toastId,
                  placement: 'top',
                  render: () => (
                    <Box bg="warning.500" px="4" py="1" alignItems="center" rounded="md" mb={5}>
                      <Text color="white" fontSize="md" px="2" alignItems="center">
                        <WarningIcon color="white" pr="2" />
                        Musisz być zalogowany by wykonać tą czynność!
                      </Text>
                    </Box>
                  ),
                });
              }
            }
      }>
      <Tooltip
        label={color === 'red.500' ? 'Usuń polubienie' : 'Dodaj polubienie'}
        bg={color === 'red.500' ? 'primary.500' : 'secondary.500'}
        rounded="md"
        placement="top">
        <FavouriteIcon size="5" mt="0.5" ml="2" color={color} />
      </Tooltip>
    </TouchableOpacity>
  );
}

export default LikeUser;
