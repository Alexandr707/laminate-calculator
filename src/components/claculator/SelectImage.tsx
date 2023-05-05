import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import st from 'styles/SelectImage.module.css';
import { LaminateVariant, ProductType } from 'types/LaminateVariant';

type SelectImageProps = {
  onSelect: (value: ProductType | null) => unknown;
};

const SelectImage: FC<SelectImageProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [laminatVariants, setLaminatVariants] = useState<ProductType[] | null>(
    null,
  );

  useEffect(() => {
    fetch('https://moscow.fargospc.ru/test/json/')
      .then(response => response.json())
      .then(response => {
        const data = response as LaminateVariant;

        return Object.keys(data.elements).map(el => data.elements[el]);
      })
      .then(data => setLaminatVariants(data))

      .catch(err => console.error(err));
  }, []);

  if (!laminatVariants) return null;

  const changeHandler = (variant: ProductType) => {
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
          <LazyLoadImage
            alt={variant.title}
            src={variant.photo[0]?.src || ''}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectImage;
