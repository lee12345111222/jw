import { useState, useEffect } from 'react';

const duplicateNumber = (num) => (num > 9 ? num : `0${num}`);

export default function useCountdown(timeStamp) {
  const [endTime, setEndTime] = useState('-');

  useEffect(() => {
    if (!timeStamp) {
      return;
    }
    if (timeStamp < new Date().getTime() / 1000) {
      setEndTime('00:00:00');
      return;
    }
    const timer = setInterval(() => {
      const leftSeconds = Math.abs(
        timeStamp - ((new Date().getTime() / 1000) >> 0)
      );

      const leftMinutes = (leftSeconds / 60) >> 0;
      const leftHours = (leftMinutes / 60) >> 0;

      const days = (leftHours / 24) >> 0;
      const hours = duplicateNumber(leftHours % 24);
      const minutes = duplicateNumber(leftMinutes % 60);
      const seconds = duplicateNumber(leftSeconds % 60);
      setEndTime(
        () => `${days ? `${days} ` : ''}${hours}:${minutes}:${seconds}`
      );
      if (`${hours}:${minutes}:${seconds}` === '00:00:00') {
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeStamp]);

  return endTime;
}
