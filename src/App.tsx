import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'styles/App.css';
import { NavigationItemType } from 'types/NavigationType';
import NavigationLayout from './layots/NavigationLayout';
import CalculatorPage from './pages/CalculatorPage';
import CatalogPage from './pages/CatalogPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const navItems: NavigationItemType[] = [
    { name: 'Каталог', path: '/' },
    { name: 'Калькулятор', path: '/calculator' },
    { name: 'Карта', path: '/map' },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavigationLayout items={navItems} />}>
          <Route path='/' element={<CatalogPage />} />
          <Route path='/calculator' element={<CalculatorPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
