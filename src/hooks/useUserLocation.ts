import { useEffect, useState } from 'react';

export function useUserLocation() {
  const [location, setlocation] = useState<number[] | undefined>();
  const [error, setError] = useState<GeolocationPositionError | undefined>();

  useEffect(() => {
    let watchId: number | undefined;

    function watch({ coords }: GeolocationPosition) {
      setlocation([coords.latitude, coords.longitude]);
    }

    function success({ coords }: GeolocationPosition) {
      watchId = navigator.geolocation.watchPosition(watch, error);

      setlocation([coords.latitude, coords.longitude]);
      setError(undefined);
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setError(err);
      setlocation(undefined);
    }

    navigator.geolocation.getCurrentPosition(success, error);

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return {
    location,
    error,
  };
}
