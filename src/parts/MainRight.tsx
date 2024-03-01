import imagePng from '/img.png';
import { CountdownTimer } from '../components';
import { useTodayForecast } from '../hooks/useTodayForecast.tsx';
import { useState } from 'react';
import { useTripStore } from '../store/useTripStore.ts';

const MainRight = () => {
  const [day] = useState(() => {
    const currentDate = new Date();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayIndex = currentDate.getDay();
    return weekdays[weekdayIndex];
  });

  const { viewTrip } = useTripStore();

  console.log(viewTrip.city);

  const { isLoading, data: temperature, error } = useTodayForecast(viewTrip.city);

  console.log(error);
  console.log(isLoading);
  console.log(temperature);

  return (
    <div className={'main__weather-right'}>
      <div className={isLoading ? 'main-weather__right--header loading' : 'main-weather__right--header'}>
        <div className='main-weather__right--img'>
          <img width={38} height={38} src={imagePng} alt='animal png' />{' '}
        </div>
      </div>
      {!isLoading && (
        <>
          <div className='main-weather__right--main'>
            <p className='main-weather__right--days'>{day}</p>
            {temperature && (
              <p className='main-weather__right--temparature'>
                {temperature} <sup className='celsius'>&#8451;</sup>
              </p>
            )}
            <p className='main-weather__right--city'>{viewTrip.city}</p>
            <CountdownTimer endDate={viewTrip.endDate} />
          </div>
        </>
      )}
    </div>
  );
};

export { MainRight };
