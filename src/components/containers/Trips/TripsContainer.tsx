import { forwardRef } from 'react';
import { TripElement } from './TripElement';

import romeImg from '/rome.jpg';
import sydneyImg from '/sydney.jpeg';
import tokyoImg from '/tokyo.jpeg';
import parisImg from '/paris.jpg';
import kievImg from '/kiev.jpeg';
import berlinImg from '/berlin.jpeg';
import londonImg from '/london.jpg';
import losAngelesImg from '/los-angeles.webp';
import newYorkImg from '/new-york.jpeg';

type CityKeys = string;

const cities: { [key in CityKeys]?: string } = {
  rome: romeImg,
  kiev: kievImg,
  berlin: berlinImg,
  london: londonImg,
  losAngeles: losAngelesImg,
  newYork: newYorkImg,
  paris: parisImg,
  sydney: sydneyImg,
  tokyo: tokyoImg,
} as const;
function formatCityToCamelCase(city: string): string {
  return city.replace(/-(.)/g, (_, match) => match.toUpperCase());
}

const nameToImage = (name: string): string => {
  const formattedName = formatCityToCamelCase(name);
  if (isCityKey(formattedName)) {
    return cities[formattedName as CityKeys]!;
  } else {
    throw new Error(`No image found for city: ${name}`);
  }
};

function isCityKey(key: any): key is CityKeys {
  return key in cities;
}

interface ITrips {
  trips: { startDate: string; endDate: string; city: string; src?: string }[];
  searchQuery: string;
}

const TripsContainer = forwardRef<HTMLDivElement, ITrips>(({ trips, searchQuery }, ref) => (
  <>
    {trips
      .filter((trip) => trip.city.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((elem, idx) => (
        <TripElement ref={ref} {...elem} src={nameToImage(elem.city)} key={idx} />
      ))}
  </>
));

export { TripsContainer };
