import { FC } from 'react';
import { Link } from 'react-router-dom';
import st from 'styles/Navigation.module.css';
import { NavigationType } from 'types/NavigationType';
import Container from './Container';

const Navigation: FC<NavigationType> = ({ items }) => {
  return (
    <div className={st.Navigation}>
      <Container>
        {items.map(item => (
          <Link
            key={item.path + item.name}
            to={item.path}
            className={st.navigationItem}
          >
            {item.name}
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default Navigation;
