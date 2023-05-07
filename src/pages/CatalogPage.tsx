import Cart from '@/components/Cart';
import Container from '@/components/Container';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import st from 'styles/CatalogPage.module.css';
import { LaminateVariant, ProductType } from 'types/LaminateVariant';

const CatalogPage: FC<PropsWithChildren<unknown>> = () => {
  const [items, setItems] = useState<ProductType[] | null>(null);

  useEffect(() => {
    fetch('https://moscow.fargospc.ru/test/json/')
      .then(response => response.json())
      .then(response => {
        const data = response as LaminateVariant;

        return Object.keys(data.elements).map(el => data.elements[el]);
      })
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Container>
        {!items && <p>Loading...</p>}
        <div className={st.catalog}>
          <div className={st.grid}>
            {items?.map(item => (
              <Cart key={item.id} {...item} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default CatalogPage;
