import * as Location from 'expo-location';

/**
 * Get current city
 * This code exports a function getCurrentCity that asynchronously retrieves the city of the user's current location. 
 * It does this by first requesting foreground location permissions from the user. If the permissions are granted, 
 * it attempts to get the user's last known location using the Location module from the expo-location library. Its faster thab getting current location,
 * and we dont need the extra accuracy.
 * If the last known location is available, the function uses the reverseGeocodeAsync method from the Location module 
 * to get the city from the coordinates of the location.
 * If the last known location is not available or if the location permissions were not granted, 
 * the function falls back to using the navigator.geolocation.getCurrentPosition method to get the user's current location. 
 * It does this by creating a new promise that resolves with an object containing the latitude and longitude of the user's location,
 * or rejects with an error if there is a problem getting the location. 
 * The function then awaits the resolution of this promise and uses the 
 * latitude and longitude to make a fetch request to the OpenStreetMap Nominatim API to get the city. 
 * The city is then returned by the function.
 *
 * Nominatim API returns a JSON object containing the address of the location.
 * The address object contains the city, town, village, and county of the location.
 *  
 * @returns {Promise<string>} - city
 * @example
 * const city = await getCurrentCity();
 * console.log(city);
 * // => 'Warsaw'
 * 
*/

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
  } else {
    /**
     * The navigator.geolocation.getCurrentPosition method is designed to be used with callbacks,
     * so it does not return a value or a promise. This means that it is not possible to use the await keyword with this method,
     * or to chain it with other async/await operations.
     * To be able to use await with navigator.geolocation.getCurrentPosition,
     * the method must be wrapped in a promise. The promise is created using the Promise constructor,
     * which takes two arguments: a function called the "executor function", and an optional "rejector function".
     * The executor function is called with two arguments: resolve and reject.
     * The resolve function is used to indicate that the promise has been fulfilled (i.e., it has succeeded),
     * and the reject function is used to indicate that the promise has been rejected (i.e., it has failed).
     * https://stackoverflow.com/questions/2707191/unable-to-cope-with-the-asynchronous-nature-of-navigator-geolocation
     */

    const geoLocationPromise = new Promise<{ lat: number; lon: number }>((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve({ lat, lon });
        },
        (error) => {
          reject(error);
        },
        options
      );
    });

    const geoLocation = await geoLocationPromise;
    /**
     * Fetch nominatim API
     * https://nominatim.org/release-docs/develop/api/Reverse/
     * https://nominatim.org/release-docs/develop/api/Output/
     */
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${geoLocation.lat}&lon=${geoLocation.lon}&format=json`
    );
    const data = await res.json();
    city = data.address.town || data.address.city || data.address.village || data.address.county;
  }
  return city;
}



