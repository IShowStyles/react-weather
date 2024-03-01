import { ForecastElem } from './ForecastElem.tsx';
import { useTripStore } from '../../../store/useTripStore.ts';
import { useFetchForecast } from '../../../hooks/useFetchForecast.tsx';

const ForecastContainer = () => {
  const { tripForecast } = useTripStore();
  console.log(tripForecast, 'tripForecast');

  const { isLoading, data, error } = useFetchForecast(tripForecast);

  if (isLoading) return null;

  if (error) {
    alert('error loading forecast :' + error);
    console.log(error);
    return null;
  }

  return (
    <div
      className='forecast-container'
      style={{
        gridAutoColumns: `calc(28% - (var(--gap) / ${3}))`,
      }}
    >
      {data.map((elem, idx) => (
        <ForecastElem key={idx} {...elem} />
      ))}
    </div>
  );
};

export { ForecastContainer };
