import { OfsetType } from '@/@types/OfsetType';
import { ChangeEvent, FC } from 'react';
import st from 'styles/OfsetVariants.module.css';

type OfsetVariantsProps = {
  variants: OfsetType[];
  label: string;
  current: string;
  onChange?: (variant: string) => unknown;
};

const OfsetVariants: FC<OfsetVariantsProps> = ({
  label,
  variants,
  current,
  onChange,
}) => {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className={st.ofsetVariants}>
      <div>{label}</div>
      <select className={st.select} onChange={changeHandler} value={current}>
        {variants.map(vr => (
          <option key={vr.value} value={vr.value}>
            {vr.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OfsetVariants;
