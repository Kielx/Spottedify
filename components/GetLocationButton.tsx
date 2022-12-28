import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useGetLocation from '../hooks/useGetLocation';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleChange: (name: string, value: string) => void;
}

function GetLocationButton({ handleChange }: Props) {
  const locationCb = useGetLocation();

  return (
    <View>
      <IconButton
        _icon={{ as: MaterialCommunityIcons, name: 'crosshairs-gps' }}
        onPress={() => {
          if (locationCb.city) {
            handleChange('location', locationCb.city);
          } else if (locationCb.text) {
            handleChange('location', locationCb.text);
          } else if (locationCb.errorMsg) {
            handleChange('location', locationCb.errorMsg);
          }
        }}
      />
    </View>
  );
}

export default GetLocationButton;
