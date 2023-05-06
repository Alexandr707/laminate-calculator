import Container from 'components/Container';
import Heading from 'components/Heading';
import Calculator from 'components/calculator/Calculator';
import { FC } from 'react';

const CalculatorPage: FC = () => {
  return (
    <Container>
      <Heading>Калькулятор</Heading>
      <Calculator />
    </Container>
  );
};

export default CalculatorPage;
