import { useUserLocation } from '@/hooks/useUserLocation';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { FC, useEffect } from 'react';
import 'styles/MyMap.css';

type MyMapType = {
  geometry?: number[][];
  locationChange?: (location: number[]) => unknown;
  closest?: number;
};

const MyMap: FC<MyMapType> = ({ geometry, locationChange, closest }) => {
  const { location, error } = useUserLocation();

  useEffect(() => {
    if (!location || !locationChange) return;

    locationChange(location);
  }, [location, locationChange]);

  return (
    <>
      <Map
        width={'100%'}
        height={400}
        // state={{ center: location }}
        defaultState={{ center: [55.030204, 82.92043], zoom: 9 }}
      >
        {location && (
          <Placemark
            geometry={location}
            options={{ preset: 'islands#blueCircleDotIcon' }}
          />
        )}
        {geometry &&
          geometry.length > 0 &&
          geometry.map((point, i) => (
            <Placemark
              key={point.join(' ')}
              geometry={point}
              options={{ iconColor: i === closest ? 'red' : 'blue' }}
            />
          ))}
      </Map>

      {!!error && (
        <h3 style={{ marginTop: '1rem', color: 'red' }}>{error.message}</h3>
      )}
    </>
  );
};

export default MyMap;
