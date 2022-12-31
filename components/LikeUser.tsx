
import React, { useContext } from 'react';
import { Box, Text, FavouriteIcon, useToast, WarningIcon } from 'native-base';
import { TouchableOpacity } from "react-native";
import { doc, arrayUnion, arrayRemove, updateDoc } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../utils/AuthStateListener';

function LikeUser({ post}) {
  const toast = useToast();
  const {id,likesIdUser}=post

  const toastId = 'signin-error';
  const { currentUser } = useContext(AuthContext);
  const docRef = doc(db, 'publicPosts',id);
  let color="gray.400";
if (likesIdUser.includes(currentUser?.uid)&&currentUser!==null) color="red.700";
  function toggleLike() {
    if (likesIdUser.includes(currentUser?.uid)) {
      updateDoc(docRef, {
        likesIdUser: arrayRemove(currentUser?.uid),
      });
    } else {
      updateDoc(docRef, {
        likesIdUser: arrayUnion(currentUser?.uid),
      });
    }
  }
        updateDoc(docRef, {
            likes: likesIdUser.length
    });
  return (
    <TouchableOpacity onPress={
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
    <FavouriteIcon size="5" mt="0.5" ml="2" color={color} />
      </TouchableOpacity>
  );
}

export default LikeUser;