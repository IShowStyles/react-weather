import { useEffect, useState } from 'react';

const useTodayForecast = (city: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const API_ENDPOINT = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&amp;include=days&amp&key=${import.meta.env.VITE_API_KEY}&amp&contentType=json`;

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
        console.log(json);
        const temp = json['days'][0].temp;
        setData(`${temp}`);
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

    if (city) {
      fetchData();
    }
  }, [city]);

  return { isLoading, data, error };
};

export { useTodayForecast };
