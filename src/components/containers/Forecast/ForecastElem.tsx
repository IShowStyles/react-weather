import { FC } from 'react';

const ForecastElem: FC<{
  day: string;
  datetime: string;
  tempmin: string;
  tempmax: string;
  conditions: string;
  icon: string;
}> = ({ day, icon, conditions, tempmin, tempmax, datetime }) => {
  return (
    <div className='weather-card'>
      <div className='weather-card__inner'>
        <p className='weather-card__inner--day'>{day}</p>
        <p className='weather-card__inner--date'>{datetime}</p>
        <p className='weather-card__inner--conditions'>{conditions}</p>
        <p className='weather-card__inner'>
          <img src={`/weather/${icon}.png`} alt={`weather icon: ${icon}`} />
        </p>
        <p className='weather-card__inner--temperature'>
          {tempmax} <sup className='celsius'>&#8451;</sup> / {tempmin} <sup className='celsius'>&#8451;</sup>
        </p>
      </div>
    </div>
  );
};

export { ForecastElem };
