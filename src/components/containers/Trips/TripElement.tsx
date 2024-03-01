import { forwardRef } from 'react';
import { useTripStore } from '../../../store/useTripStore.ts';

const TripElement = forwardRef<
  HTMLDivElement,
  {
    src: string;
    city: string;
    startDate: string;
    endDate: string;
  }
>(({ src, city, startDate, endDate }, ref) => {
  const { setViewTrip, setForecastTrip } = useTripStore();

  return (
    <div
      ref={ref}
      className='card'
      onClick={() => {
        setViewTrip({
          city: city,
          endDate: endDate,
        });
        setForecastTrip({
          city: city,
          startDate: startDate,
          endDate: endDate,
        });
      }}
    >
      <div className='card-image'>
        <img height={160} src={src} alt='' />
      </div>
      <div className='card-content'>
        <h2 className='card-title'>{city}</h2>
        <p className='card-dates'>
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
});

export { TripElement };
