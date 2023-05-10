import { useYMaps } from '@pbe/react-yandex-maps';
import { FC, useEffect, useState } from 'react';
import st from 'styles/Distance.module.css';
import { PointType } from 'types/PointType';

type DistanceType = {
  points?: PointType[];
  userLocation?: number[];
  closest?: (point: number) => unknown;
};

type PointWithDistanceType = {
  distance: number;
  content: string;
  geometry: number[];
};

const Distance: FC<DistanceType> = ({ points, userLocation, closest }) => {
  const mapApi = useYMaps() as any;
  const [sortedPointesList, setSortedPointesList] = useState<
    PointWithDistanceType[] | undefined
  >();

  useEffect(() => {
    if (!mapApi || !points || !userLocation) return;

    const distance = points
      .map(point => point.geometry)
      .map(point => mapApi.coordSystem.geo.getDistance(point, userLocation))
      .map(dist => mapApi.formatter.distance(dist) as string)
      .map(dist => dist.split('&#').shift())
      .map(dist => Number(dist));

    const pointWithDistance = points.map((point, i) => ({
      ...point,
      distance: distance[i],
    }));

    pointWithDistance.sort((p1, p2) => p1.distance - p2.distance);

    setSortedPointesList(pointWithDistance);

    const closestPoint = distance.reduce(
      (acc, p) => (acc > p ? p : acc),
      distance[0],
    );

    const closestPointIdx = distance.indexOf(closestPoint);

    closest && closest(closestPointIdx);
  }, [points, userLocation, mapApi, closest]);

  return (
    <div className={st.Distance}>
      {!!sortedPointesList &&
        sortedPointesList.map(point => (
          <div key={point.geometry.join(' ')} className={st.point}>
            <div className={st.addres}>
              Адрес: <b>{point.content}</b>
            </div>
            <div className={st.dist}>
              Растояние: <b>{point.distance} км</b>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Distance;
