import Navigation from '@/components/Navigation';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationType } from 'types/NavigationType';

const NavigationLayout: FC<NavigationType> = ({ items }) => {
  return (
    <div>
      <Navigation items={items} />
      <Outlet />
    </div>
  );
};

export default NavigationLayout;
