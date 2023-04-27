import { LaminateVariant } from '@/@types/LaminateVariant';
import { useResize } from '@/hooks/useResize';
import { Convertor } from '@/utils/Convertor';
import { fillRows } from '@/utils/fillRows';
import Container from 'components/Container';
import { FC, useEffect, useRef, useState } from 'react';
import st from 'styles/LaminateSchema.module.css';
import LaminateRow from './LaminateRow';
import SelectImage from './SelectImage';

interface LaminateSchemaProps extends ReturnType<typeof fillRows> {}

const LaminateSchema: FC<LaminateSchemaProps> = ({
  options,
  // rest,
  lamCount,
}) => {
  const windowSize = useResize(300);
  const { l_room, w_room, rows, direction, w_lam, nPack } = options;

  const [LaminateImage, setLaminateImage] = useState<LaminateVariant | null>(
    null,
  );

  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, [windowSize]);

  const px = Convertor.toPixels(1, l_room, rect?.width || 1);

  return (
    <div className={st.laminateSchema}>
      <Container>
        <div className={st.inner}>
          <h2 className={st.title}>Схема укладки ламината</h2>
          <h4 className={st.area}>
            Площадь комнаты: {(l_room * w_room) / 10000} м<sup>2</sup>
          </h4>
          <h4 className={st.area}>Количество ламината: {lamCount} шт</h4>
          <h4 className={st.area}>
            Количество пачек:{' '}
            <b style={{ fontWeight: 600, color: 'darkgreen' }}>
              {Math.ceil(lamCount / nPack)}
            </b>{' '}
            шт
          </h4>

          <div
            ref={ref}
            className={st.scema}
            style={{ height: w_room * px + 'px' }}
          >
            <span className={st.length}>Длинна: {l_room} см</span>
            <span className={st.width}>Ширина: {w_room} см</span>

            {!!rows.length &&
              rows.map(row => (
                <LaminateRow
                  key={'' + row.x + row.y}
                  x={row.x * px}
                  y={row.y * px}
                  lamH={w_lam * px}
                  height={row.width * px}
                  width={row.length * px}
                  variant={direction}
                >
                  {!!row.tiles &&
                    row.tiles.map((tile, i) => (
                      <div
                        key={'' + tile.l + tile.n + i}
                        className={st.tile}
                        style={{
                          width: tile.l * px + 'px',
                          height: tile.w * px + 'px',
                          backgroundImage: `url("${LaminateImage?.src || ''}")`,
                        }}
                      >
                        <span className={st.tileLabel}>{tile.n}</span>
                      </div>
                    ))}
                </LaminateRow>
              ))}

            <div className={st.container}></div>
          </div>
        </div>
        <SelectImage onSelect={setLaminateImage} />
      </Container>
    </div>
  );
};

export default LaminateSchema;
