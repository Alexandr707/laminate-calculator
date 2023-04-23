import { FC, PropsWithChildren } from 'react';
import st from 'styles/Heading.module.css';

const Heading: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <h2 className={st.title}>{children}</h2>;
};

export default Heading;
