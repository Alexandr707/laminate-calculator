import Container from '@/components/Container';
import Distance from '@/components/map/Distance';
import MyMap from '@/components/map/MyMap';
import { useResize } from '@/hooks/useResize';
import { YMaps } from '@pbe/react-yandex-maps';
import { FC, useEffect, useRef, useState } from 'react';
import st from 'styles/MapPage.module.css';

const points = [
  {
    content: 'ул. Станиславского, 17, Новосибирск, Новосибирская обл., 630054',
    geometry: [54.981712, 82.872648],
  },
  {
    content: 'Дзержинский р-н, Новосибирск, Новосибирская обл., 630089',
    geometry: [55.038187, 82.977655],
  },
  {
    content: 'ул. Ильича, 6, Новосибирск, Новосибирская обл., 630090',
    geometry: [54.839099, 83.095932],
  },
];

const MapPage: FC = () => {
  const [userLocation, setUserLocation] = useState<number[] | undefined>();
  const [closestPoint, setClosestPoint] = useState<number | undefined>();

  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const windowSize = useResize();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    setBounds({ width: rect.width, height: rect.height });
  }, [windowSize]);

  const updateMap = () => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    setBounds({ width: rect.width, height: rect.height });
  };

  return (
    <YMaps
      query={{
        load: 'coordSystem.geo,formatter,util.bounds',
      }}
    >
      <div className={st.MapPage}>
        <Container>
          <div ref={mapRef}>
            <MyMap
              points={points}
              locationChange={setUserLocation}
              closest={closestPoint}
              containerSize={bounds}
              onLoad={updateMap}
            />
          </div>
          <Distance
            userLocation={userLocation}
            points={points}
            closest={setClosestPoint}
          />
        </Container>
      </div>
    </YMaps>
  );
};

export default MapPage;
