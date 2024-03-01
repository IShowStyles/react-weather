import { create } from 'zustand';

export type Trip = {
  startDate: string;
  endDate: string;
  city: string;
  src?: string;
};

type ViewTrip = Pick<Trip, 'endDate' | 'city'>; // Simplified type definition using Pick utility type
type TripForecast = Pick<Trip, 'endDate' | 'startDate' | 'city'>; // Simplified type definition using Pick utility type

interface TripState {
  trips: Trip[];
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  tripForecast: TripForecast;
  viewTrip: ViewTrip;
  addTrip: (newTrip: Trip) => void;
  setForecastTrip: (forecastTrip: TripForecast) => void;
  setViewTrip: (viewTrip: ViewTrip) => void;
}

const storageKey = 'tripsData';

const loadTripsFromLocalStorage = (): Trip[] => {
  try {
    const tripsJson = localStorage.getItem(storageKey);
    if (tripsJson) {
      return JSON.parse(tripsJson);
    }
  } catch (error) {
    console.error('Could not parse trips from localStorage', error);
  }
  return [];
};

const saveTripsToLocalStorage = (trips: Trip[]): void => {
  try {
    const serializedTrips = JSON.stringify(trips);
    localStorage.setItem(storageKey, serializedTrips);
  } catch (error) {
    console.error('Could not save trips to localStorage', error);
  }
};

const loadViewTrip = (): ViewTrip => {
  const trips = loadTripsFromLocalStorage();
  if (trips.length > 0) {
    const { city, endDate } = trips[0];
    return { city, endDate };
  }
  return { city: '', endDate: '' };
};

const loadForecastTrip = (): TripForecast => {
  const trips = loadTripsFromLocalStorage();
  if (trips.length > 0) {
    const { city, startDate, endDate } = trips[0];
    return { city, startDate, endDate };
  }
  return { city: '', startDate: '', endDate: '' };
};

const useTripStore = create<TripState>((set) => ({
  trips: loadTripsFromLocalStorage(),
  viewTrip: loadViewTrip(),
  tripForecast: loadForecastTrip(),
  searchQuery: '',
  setViewTrip: (viewTrip: ViewTrip) =>
    set((state) => ({
      ...state,
      viewTrip: viewTrip,
    })),
  setForecastTrip: (forecastTrip: TripForecast) =>
    set((state) => ({
      ...state,
      tripForecast: forecastTrip,
    })),
  setSearchQuery: (searchQuery: string) =>
    set((state) => ({
      ...state,
      searchQuery: searchQuery,
    })),
  addTrip: (newTrip: Trip) =>
    set((state) => {
      const updatedTrips = [...state.trips, newTrip].sort(
        (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
      saveTripsToLocalStorage(updatedTrips);
      return { ...state, trips: updatedTrips };
    }),
}));

export { useTripStore };
