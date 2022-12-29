import * as Location from 'expo-location';

export default async function getCurrentCity() {
  let city;
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return 'Brak wymaganych uprawnień';
  }
  let loc = null;
  loc = await Location.getLastKnownPositionAsync({});

  if (loc) {
    const cit = await Location.reverseGeocodeAsync(loc.coords);
    city = cit[0].city;
  }

  const geoLocationPromise = new Promise<{ lat: number; lon: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        resolve({ lat, lon });
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });

  const geoLocation = await geoLocationPromise;
  console.log(geoLocation);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${geoLocation.lat}&lon=${geoLocation.lon}&format=json`
  );
  const data = await res.json();
  city = data.address.town;

  return city;
}



