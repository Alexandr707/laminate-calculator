import { FC, PropsWithChildren } from 'react';
import st from 'styles/Container.module.css';

const Container: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className={st.container}>{children}</div>;
};

export default Container;
