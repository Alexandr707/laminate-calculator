import clsx from 'clsx';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import st from 'styles/Navigation.module.css';
import { NavigationType } from 'types/NavigationType';
import Container from './Container';

const Navigation: FC<NavigationType> = ({ items }) => {
  const location = useLocation();
  return (
    <div className={st.Navigation}>
      <Container>
        {items.map(item => (
          <Link
            key={item.path + item.name}
            to={item.path}
            className={clsx(st.navigationItem, {
              [st.active]: item.path === location.pathname,
            })}
          >
            {item.name}
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default Navigation;
