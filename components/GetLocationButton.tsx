import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import getCurrentCity from '../utils/getCurrentCity';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleChange: (name: string, value: string) => void;
}

function GetLocationButton({ handleChange }: Props) {
  const getLocation = async () => {
    try {
      const location = await getCurrentCity();
      handleChange('location', location || '');
    } catch (error) {
      handleChange('location', 'Nie udało się ustalić lokalizacji');
    }
  };

  return (
    <View>
      <IconButton
        _icon={{ as: MaterialCommunityIcons, name: 'crosshairs-gps' }}
        onPress={getLocation}
      />
    </View>
  );
}

export default GetLocationButton;
