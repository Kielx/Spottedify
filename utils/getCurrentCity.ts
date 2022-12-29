import * as Location from 'expo-location';

export default async function getCurrentCity() {
  let city;
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return 'Brak wymaganych uprawnień';
  }

  const loc = await Location.getLastKnownPositionAsync({});
  if (loc) {
    const cit = await Location.reverseGeocodeAsync(loc.coords);
    city = cit[0].city;
  } else {
    city = 'Błąd pobierania lokalizacji';
  }

  return city;
}
