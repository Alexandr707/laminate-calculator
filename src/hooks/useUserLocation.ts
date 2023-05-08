import { useEffect, useState } from 'react';

export function useUserLocation() {
  const [location, setlocation] = useState<number[] | undefined>();
  const [error, setError] = useState<GeolocationPositionError | undefined>();

  useEffect(() => {
    let watchId = 0;

    function success({ coords }: GeolocationPosition) {
      setlocation([coords.latitude, coords.longitude]);

      if (!location)
        watchId = navigator.geolocation.watchPosition(success, error);
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setError(err);
    }

    navigator.geolocation.getCurrentPosition(success, error);

    return () => {
      if (!watchId) return;

      navigator.geolocation.clearWatch(watchId);
    };
  }, [location]);

  return {
    location,
    error,
  };
}
