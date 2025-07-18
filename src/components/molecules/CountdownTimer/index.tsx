import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  text: string,
  duration?: number;
  onComplete?: () => void;
}

const CountdownTimer = ({
  text,
  duration = 300,
  onComplete
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={'mt-[15px] mb-[12px]'}>
      {text} <span className={'text-[#228822]'}>{formatTime(timeLeft)}</span> ⌛
    </div>
  );
};

export type { CountdownTimerProps };
export default CountdownTimer ;
