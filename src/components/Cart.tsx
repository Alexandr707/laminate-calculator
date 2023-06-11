import { ProductType } from '@/@types/LaminateVariant';
import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import st from 'styles/Cart.module.css';
import * as db from '@/db/actions';

const Cart: FC<ProductType> = props => {
  const { currency, price, src, title } = props;

  return (
    <div className={st.Cart} onClick={() => db.addElement('images', props)}>
      <div className={st.imageContainer}>
        <LazyLoadImage src={src} alt={title} />
      </div>
      <div className={st.inner}>
        <div className={st.title}>{title}</div>
        <div className={st.price}>
          {price} {currency}
        </div>
      </div>
    </div>
  );
};

export default Cart;
