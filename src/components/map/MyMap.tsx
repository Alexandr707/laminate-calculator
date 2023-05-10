import { PointType } from '@/@types/PointType';
import { useUserLocation } from '@/hooks/useUserLocation';
import { Map, Placemark, useYMaps } from '@pbe/react-yandex-maps';
import { FC, useEffect, useState } from 'react';
import 'styles/MyMap.css';
import ymaps from 'yandex-maps';

type MyMapType = {
  points?: PointType[];
  locationChange?: (location: number[]) => unknown;
  closest?: number;
  containerSize: { width: number; height: number };
  onLoad?: () => void;
};

const MyMap: FC<MyMapType> = ({
  points = [],
  locationChange,
  closest,
  containerSize,
  onLoad,
}) => {
  const [mapState, setMapState] = useState<ymaps.IMapState | undefined>();
  const { location, error } = useUserLocation();
  const mapApi = useYMaps();

  useEffect(() => {
    if (!location || !locationChange) return;

    locationChange(location);
  }, [location, locationChange]);

  useEffect(() => {
    if (!mapApi) return;

    const p = points.map(point => point.geometry);
    location?.length && p.push(location);

    const bounds = mapApi.util.bounds.fromPoints(p);

    const state = mapApi.util.bounds.getCenterAndZoom(bounds, [
      containerSize.width,
      containerSize.height,
    ]);

    setMapState(state as any);
  }, [mapApi, points, location, containerSize]);

  if (!mapApi) return null;

  return (
    <>
      <Map
        width={'100%'}
        height={400}
        state={mapState}
        defaultState={{ center: location || [55.030204, 82.92043], zoom: 8 }}
        onLoad={() => onLoad && onLoad()}
      >
        {location && (
          <Placemark
            geometry={location}
            options={{ preset: 'islands#blueCircleDotIcon' }}
          />
        )}
        {points &&
          points.length > 0 &&
          points.map((point, i) => (
            <Placemark
              key={point.geometry.join(' ')}
              geometry={point.geometry}
              options={{
                hasHint: true,
                openHintOnHover: true,
                iconColor: i === closest ? 'red' : 'blue',
                balloonContent: point.content || '',
                balloonAutoPan: true,
                hasBalloon: true,
                openBalloonOnClick: true,
                balloonCloseButton: true,
              }}
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
