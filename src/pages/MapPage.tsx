import Container from '@/components/Container';
import Distance from '@/components/map/Distance';
import MyMap from '@/components/map/MyMap';
import { YMaps } from '@pbe/react-yandex-maps';
import { FC, useState } from 'react';
import st from 'styles/MapPage.module.css';

const MapPage: FC = () => {
  const geometry = [
    [54.981712, 82.872648],
    [55.038187, 82.977655],
    [54.839099, 83.095932],
  ];

  const [userLocation, setUserLocation] = useState<number[] | undefined>();
  const [closestPoint, setClosestPoint] = useState<number | undefined>();

  return (
    <div className={st.MapPage}>
      <Container>
        <YMaps
          query={{
            ns: 'use-load-option',
            load: 'package.full',
          }}
        >
          <div>
            <MyMap
              geometry={geometry}
              locationChange={setUserLocation}
              closest={closestPoint}
            />
          </div>
          <Distance
            userLocation={userLocation}
            geolocation={geometry}
            closest={setClosestPoint}
          />
        </YMaps>
      </Container>
    </div>
  );
};

export default MapPage;
