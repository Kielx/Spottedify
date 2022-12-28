import React from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import useGetLocation from '../hooks/useGetLocation';

function GetLocationButton() {
  const locationCb = useGetLocation();

  return (
    <View>
      <Button onPress={() => console.log(locationCb)}>Click me</Button>
    </View>
  );
}

export default GetLocationButton;
