import { View, Text } from 'native-base';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function PostDetailsScreen({ route }: Props) {
  const navigation = useNavigation();
  const { post } = route.params;
  navigation.setOptions({ headerTitle: post.title });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>{post.title}</Text>
      <Text>{post.description}</Text>
    </View>
  );
}

export default PostDetailsScreen;
