// import { YMaps } from '@pbe/react-yandex-maps';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'styles/App.css';
import { NavigationItemType } from 'types/NavigationType';
import NavigationLayout from './layots/NavigationLayout';
import CalculatorPage from './pages/CalculatorPage';
import CatalogPage from './pages/CatalogPage';
import ErrorPage from './pages/ErrorPage';
import MapPage from './pages/MapPage';

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
          <Route path='/map' element={<MapPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </YMaps>
  );
}

export default App;
