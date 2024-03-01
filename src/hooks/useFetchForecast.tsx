import { useEffect, useState } from 'react';

interface IData {
  day: string;
  tempmin: string;
  tempmax: string;
  conditions: string;
  icon: string;
  datetime: string;
}

const useFetchForecast = ({ city, startDate, endDate }: { city: string; startDate: string; endDate: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[dayOfWeek];
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const API_ENDPOINT = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${import.meta.env.VITE_API_KEY}&contentType=json`;

        const response = await fetch(API_ENDPOINT, {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        console.log(json, 'json');
        const data = json['days'].map((elem: any) => {
          return {
            day: toWeekday(elem.datetime),
            temperature: `${elem.tempmax} / ${elem.tempmin}`,
            conditions: elem.conditions,
            icon: elem.icon,
            datetime: elem.datetime,
            tempmin: elem.tempmin,
            tempmax: elem.tempmax,
          };
        });
        setData(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (city && startDate && endDate) {
      fetchData();
    }
  }, [city, startDate, endDate]);

  return { isLoading, data, error };
};

export { useFetchForecast };
