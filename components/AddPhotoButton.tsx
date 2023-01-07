import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';

type Props = {
  setAddPhotoURI: React.Dispatch<React.SetStateAction<string>>;
};

function AddPhotoButton({ setAddPhotoURI }: Props) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 608 } }],
        { base64: true }
      );

      const imageUri = manipResult ? `data:image/jpg;base64,${manipResult.base64}` : '';
      setAddPhotoURI(imageUri);
    }
  };

  return (
    <Button
      leftIcon={<Icon as={<MaterialCommunityIcons name="image" />} size="sm" />}
      onPress={pickImage}
      key="Choose gallery image">
      Wybierz Zdjęcie z galerii
    </Button>
  );
}

export default AddPhotoButton;
