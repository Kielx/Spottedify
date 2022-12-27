import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

function GetLocationButton() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      try {
        const cit = await Location.reverseGeocodeAsync(loc.coords);
        setCity(cit[0].city);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Button onPress={() => console.log(text, city)}>{`${city}` || 'GetLocationButton'}</Button>
    </View>
  );
}

export default GetLocationButton;
