import { Camera } from 'expo-camera';
import React, { useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Platform } from 'react-native';
import { AppContext } from '../context/AppContext';
import CameraViewWeb from '../components/CameraViewWeb';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const { setAddPhotoURI, setAddPhotoModalVisible } = useContext(AppContext);
  const navigation = useNavigation();
  // @todo Add permission request
  if (!permission) {
    requestPermission();
  }
  if (!permission?.granted) {
    console.log('Permission not granted');
  }

  const checkIfWebOrMobile: () => boolean | undefined = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return false;
    }
    if (Platform.OS === 'web') {
      return true;
    }
    return undefined;
  };

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      setAddPhotoURI(photo?.uri);
      setAddPhotoModalVisible(true);
      navigation.goBack();
    }
  };

  const cameraViewMobile = (
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
  );

  return (
    <View style={{ flex: 1 }}>{checkIfWebOrMobile() ? <CameraViewWeb /> : cameraViewMobile}</View>
  );
}
