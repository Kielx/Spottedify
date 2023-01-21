import { Text, Heading, VStack, Image, ScrollView, Box} from 'native-base';
import React, { useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../stacks/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function PostDetailsScreen({ route }: Props) {
  const navigation = useNavigation();
  const { post } = route.params;
  useEffect(() => {
    navigation.setOptions({ headerTitle: post.title });
  }, []);

  return (
    <Box flex="1" _light={{ color: 'white' }} _dark={{ bg: 'light.700', color: 'white' }}>
      <VStack
        space={5}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: 'auto',
        }}
        width="100%"
        maxWidth={768}
        _light={{ color: 'white' }}
        _dark={{ bg: 'light.700', color: 'white' }}>
        <Image
          alt="Post photo"
          source={{ uri: post.photo }}
          h="48"
          width="100%"
          resizeMode="cover"
        />
        <Heading>{post.title}</Heading>
        <ScrollView>
          <Text px={5} py={2}>
            {post.description}
          </Text>
        </ScrollView>
      </VStack>
    </Box>
  );
}

export default PostDetailsScreen;
