import { ReactElement, useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endDate);
      const difference = end.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const timerComponents: ReactElement[] = [];

  Object.keys(timeLeft).forEach((key) => {
    const interval = key as keyof TimeLeft;
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval}>
        <div className='timer'>
          <p>{timeLeft[interval]}</p>
          <p>{interval}</p>
        </div>{' '}
      </div>,
    );
  });

  const now = new Date();
  const end = new Date(endDate);
  const difference = end.getTime() - now.getTime();

  if (difference < 0) {
    return (
      <div>
        <p className='text'>Time is up!</p>
      </div>
    );
  }

  if (timerComponents.length < 1) {
    return (
      <div className='wrapper center'>
        <span>-- / --</span>
      </div>
    );
  }

  return <div className='wrapper'>{timerComponents.length && timerComponents}</div>;
};

export { CountdownTimer };
