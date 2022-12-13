import React, { useContext } from 'react';
import { Box, Text, FavouriteIcon, Flex, Button, useToast, WarningIcon } from 'native-base';
import {  DocumentData, doc, arrayUnion,arrayRemove , updateDoc,getDoc } from 'firebase/firestore';
import { collection, query, where } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../stacks/RootStack';
import { AuthContext } from '../utils/AuthStateListener';
import { db } from '../firebaseConfig';
import {  TouchableOpacity } from "react-native";
import { FieldValue } from "firebase/firestore";
type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

function Post({ post }: DocumentData) {
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();
  const toastId = 'signin-error';
  const navigation = useNavigation<homeScreenProp>();
  const postAuthor = post.authorId === currentUser?.uid ? 'Ty' : post.authorName;
   const addLike=async()=>{
                          const docRef = doc(db, "publicPosts", post.id);
                          console.log("xd")
                         const docSnap = await getDoc(docRef);
                         if(docSnap.data().likesIdUser.includes(currentUser?.uid)!=true){
                        updateDoc(docRef , {
                        likesIdUser: arrayUnion(currentUser?.uid),
                         likes: docSnap.data().likesIdUser.length
                        });

                       }
                       else{
                       updateDoc(docRef , {
                         likesIdUser: arrayRemove(currentUser?.uid),
                          likes: docSnap.data().likesIdUser.length
                        });


                        }
                        }

  return (
    <Box
      key={post.id}
      _light={{ bg: 'green.300', color: 'white' }}
      _dark={{ bg: 'light.600', color: 'white' }}
      p="4"
      my="4"
      rounded="md"
      shadow="3">
      <Box>
        <Text pt="1" fontWeight="bold" fontSize="xl">
          {post.title}
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
          {postAuthor}
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
          {post.date.toDate().toLocaleDateString('pl-PL')} - {post.location}
        </Text>

        <Box py="1">{post.description}</Box>
        <Flex flexDirection="row">
          {post.likes}
                <TouchableOpacity onPress={
                          currentUser
                            ? () => addLike()
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
          <FavouriteIcon size="5" mt="0.5" color="red.700" ml="2" />
           </TouchableOpacity>
        </Flex>
      </Box>
      <Button
        onPress={
          currentUser
            ? () => navigation.navigate('Details', { post })
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
        mt="2">
        Więcej
      </Button>
    </Box>
  );
}

export default Post;
