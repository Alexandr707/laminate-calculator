import { ProductType } from '@/@types/LaminateVariant';
import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import st from 'styles/Cart.module.css';

const Cart: FC<ProductType> = ({ currency, id, photo, price, src, title }) => {
  return (
    <div className={st.Cart}>
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
