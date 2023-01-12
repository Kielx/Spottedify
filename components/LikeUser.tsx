import React, { useContext } from 'react';
import { Box, Text, useToast, WarningIcon, Tooltip, IconButton } from 'native-base';
import { doc, arrayUnion, arrayRemove, updateDoc, DocumentData } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { AuthContext } from '../utils/AuthStateListener';

function LikeUser({ post }: DocumentData) {
  const toast = useToast();
  const { id, likes } = post;

  const toastId = 'signin-error';
  const { currentUser } = useContext(AuthContext);
  const docRef = doc(db, 'publicPosts', id);
  const userLiked = likes.includes(currentUser?.uid);

  let color = 'gray.400';
  if (currentUser && likes) {
    if (userLiked) {
      color = 'red.500';
    }
  }
  function toggleLike() {
    if (userLiked) {
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
    <Tooltip
      label={userLiked ? 'Usuń polubienie' : 'Dodaj polubienie'}
      bg={userLiked ? 'primary.500' : 'secondary.500'}
      rounded="md"
      placement="top">
      <IconButton
        _icon={{
          as: MaterialCommunityIcons,
          name: userLiked ? 'heart' : 'heart-outline',
          color,
          size: 6,
        }}
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
        }
      />
    </Tooltip>
  );
}

export default LikeUser;
