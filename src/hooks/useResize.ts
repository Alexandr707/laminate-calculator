import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

export function useResize(delay?: number) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const callback = debounce(
      () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      },
      delay || 500,
      { trailing: true },
    );

    window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  return windowSize;
}
