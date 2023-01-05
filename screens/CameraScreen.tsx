import { Camera } from 'expo-camera';
import React, { useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const { setAddPhotoURI, setAddPhotoModalVisible } = useContext(AppContext);
  const navigation = useNavigation();
  //@todo Add permission request
  if (!permission) {
    requestPermission();
  }
  if (!permission?.granted) {
    console.log('Permission not granted');
  }

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      setAddPhotoURI(photo?.uri);
      setAddPhotoModalVisible(true);
      navigation.goBack();
    }
  };
  //@todo Wrap this in try catch or something to prevent crashes on web view
  //@todo Fix styling of button and view
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <Button onPress={snap} title="Take Photo" />
        </View>
      </Camera>
    </View>
  );
}
