import { useEffect } from 'react';

function useLockBodyScroll(shouldLock: boolean) {
  useEffect(() => {
    if (shouldLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [shouldLock]);
}

export default useLockBodyScroll;
