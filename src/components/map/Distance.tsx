import { useYMaps } from '@pbe/react-yandex-maps';
import { FC, useEffect } from 'react';

type DistanceType = {
  userLocation?: number[];
  geolocation?: number[][];
  closest?: (point: number) => unknown;
};

const Distance: FC<DistanceType> = ({ geolocation, userLocation, closest }) => {
  const mapApi = useYMaps() as any;

  console.log(mapApi);

  useEffect(() => {
    if (!mapApi || !geolocation || !userLocation) return;

    const distance = geolocation
      .map(point => mapApi.coordSystem.geo.getDistance(point, userLocation))
      .map(dist => mapApi.formatter.distance(dist) as string)
      .map(dist => dist.split('&#').shift())
      .map(dist => Number(dist));

    const closestPoint = distance.reduce(
      (acc, p) => (acc > p ? p : acc),
      distance[0],
    );

    closest && closest(distance.indexOf(closestPoint));
  }, [geolocation, userLocation, mapApi, closest]);

  return <div>Distance</div>;
};

export default Distance;
