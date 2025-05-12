import { useEffect, useState } from 'react';

export function usePageVisible() {
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVisibilityChange = () => {
      return setVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return visible;
}
