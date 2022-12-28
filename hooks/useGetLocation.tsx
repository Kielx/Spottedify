import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

export default function GetLocationButton() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Brak dostępu do lokalizacji');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      try {
        const cit = await Location.reverseGeocodeAsync(loc.coords);
        setCity(cit[0].city);
      } catch (e) {
        setErrorMsg('Nie udało się ustalić lokalizacji');
      }
    })();
  }, []);

  let text = 'Ustalanie lokalizacji, spróbuj ponownie...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return { city, text, errorMsg };
}
