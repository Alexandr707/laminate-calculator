import { LaminateDirection } from '@/@types/LaminateDirection';
import { FC, PropsWithChildren, useMemo } from 'react';
import st from 'styles/LaminateRow.module.css';

type LaminateRowProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  lamH: number;
  variant: LaminateDirection;
};

const LaminateRow: FC<PropsWithChildren<LaminateRowProps>> = ({
  children,
  x,
  y,
  width,
  height,
  variant,
  lamH,
}) => {
  const style = useMemo(() => {
    if (variant === 'Укладка по длине 0°') {
      return {
        width: width + 'px',
        height: height + 'px',
        left: x + 'px',
        top: y + 'px',
        transform: `translateY(${-lamH}px)`,
        transformOrigin: 'left bottom',
      };
    } else if (variant === 'Укладка по ширине 90°') {
      return {
        width: width + 'px',
        height: height + 'px',
        left: x + 'px',
        bottom: y + 'px',
        transform: 'rotate(-90deg) ',
        transformOrigin: 'left bottom',
      };
    }
  }, [variant, x, y, height, width, lamH]);

  return (
    <div className={st.row} style={style}>
      {children}
    </div>
  );
};

export default LaminateRow;
