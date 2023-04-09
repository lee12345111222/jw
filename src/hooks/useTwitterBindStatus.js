import { useState, useEffect } from 'react';

const useTwitterBindStatus = () => {
  const [status, setstatus] = useState(null);

  useEffect(() => {
    localStorage.removeItem('twitterBindStatus');
    const timer = setInterval(() => {
      const twitterBindStatus = localStorage.getItem('twitterBindStatus');
      if (twitterBindStatus === 'true') {
        clearInterval(timer);
        setstatus(twitterBindStatus);
        localStorage.removeItem('twitterBindStatus');
      }
      // }, 50);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return status;
};

export default useTwitterBindStatus;
