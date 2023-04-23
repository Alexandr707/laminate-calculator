import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import st from 'styles/SelectImage.module.css';
import { LaminateVariant } from 'types/LaminateVariant';

type SelectImageProps = {
  onSelect: (value: LaminateVariant | null) => unknown;
};

const SelectImage: FC<SelectImageProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [laminatVariants, setLaminatVariants] = useState<
    LaminateVariant[] | null
  >(null);

  useEffect(() => {
    fetch('https://moscow.fargospc.ru/test/json/')
      .then(response => response.json())
      .then(data => setLaminatVariants(data as LaminateVariant[]))
      .catch(err => console.error(err));
  }, []);

  if (!laminatVariants) return null;

  const changeHandler = (variant: LaminateVariant) => {
    if (variant.id === selected) {
      onSelect(null);
      setSelected(null);
    } else {
      setSelected(variant.id);
      onSelect(variant);
    }
  };

  return (
    <div className={st.selectImage}>
      {laminatVariants.map(variant => (
        <div
          key={variant.id}
          className={clsx(st.item, { [st.selected]: selected === variant.id })}
          onClick={() => {
            changeHandler(variant);
          }}
        >
          <LazyLoadImage alt={variant.title} src={variant.src} />
        </div>
      ))}
    </div>
  );
};

export default SelectImage;
