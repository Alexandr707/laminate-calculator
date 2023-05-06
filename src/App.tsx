import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'styles/App.css';
import CalculatorPage from './pages/CalculatorPage';
import CatalogPage from './pages/CatalogPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CatalogPage />} />
        <Route path='/calculator' element={<CalculatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
