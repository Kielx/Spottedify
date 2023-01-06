import { Camera } from 'expo-camera';
import React, { useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { IconButton, Icon, useToast, Box, WarningIcon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function App() {
  const toast = useToast();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const { setAddPhotoURI, setAddPhotoModalVisible } = useContext(AppContext);
  const navigation = useNavigation();

  const snap = async () => {
    if (permission) {
      if (permission.granted) {
        const photo = await cameraRef.current?.takePictureAsync();
        setAddPhotoURI(photo?.uri);
        setAddPhotoModalVisible(true);
        navigation.goBack();
      } else if (permission.canAskAgain) {
        requestPermission();
      } else if (!permission.granted) {
        if (!toast.isActive('permission-error')) {
          toast.show({
            id: 'permission-error',
            placement: 'top',
            render: () => (
              <Box bg="danger.500" px="4" py="1" alignItems="center" rounded="md" mb={5}>
                <Text color="white" fontSize="lg" fontWeight="bold" px="2" alignItems="center">
                  <WarningIcon color="white" pr="2" />
                  Błąd dostępu do aparatu!
                </Text>
              </Box>
            ),
          });
        }
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={cameraRef}>
        <IconButton
          icon={
            <Icon
              as={<MaterialCommunityIcons name="camera-plus-outline" />}
              color="white"
              size="6xl"
            />
          }
          onPress={snap}
          title="Take Photo"
          style={{
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
          }}
        />
      </Camera>
    </View>
  );
}
