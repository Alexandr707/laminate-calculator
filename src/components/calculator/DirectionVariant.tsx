import { LaminateDirection } from '@/@types/LaminateDirection';
import { variants } from '@/data/selecteVariants';
import Radio from 'components/ui/Radio';
import { ChangeEvent, FC, PropsWithChildren } from 'react';
import st from 'styles/DirectionVariant.module.css';

type DirectionVariant = {
  current: LaminateDirection;
  onChange?: (variant: LaminateDirection) => unknown;
};

const DirectionVariant: FC<PropsWithChildren<DirectionVariant>> = ({
  current,
  onChange,
}) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value as LaminateDirection);
  };

  return (
    <div className={st.directionVariant}>
      <div>Направление укладки ламината:</div>
      <div className={st.select}>
        {variants.map(vr => (
          <Radio
            key={vr}
            id={vr}
            label={vr}
            name='direction'
            value={vr}
            checked={vr === current}
            onChange={changeHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default DirectionVariant;
