import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Button } from 'native-base';

function CameraViewWeb() {
  async function getMedia() {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log(stream);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button>Take Photo</Button>
    </View>
  );
}

export default CameraViewWeb;
