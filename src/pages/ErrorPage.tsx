import Container from '@/components/Container';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import st from 'styles/ErrorPage.module.css';

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [navigate]);

  return (
    <div className={st.ErrorPage}>
      <Container>
        <h2 className={st.title}>404 | Странца не найдена</h2>
        <div className={st.link}>
          <Link to='/'>Вернуться на главнкю страницу</Link>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;
