import Calculator from '@/components/claculator/Calculator';
import Container from 'components/Container';
import Heading from 'components/Heading';
import 'styles/App.css';

function App() {
  return (
    <>
      <Container>
        <Heading>Калькулятор</Heading>
        <Calculator />
      </Container>
    </>
  );
}

export default App;
