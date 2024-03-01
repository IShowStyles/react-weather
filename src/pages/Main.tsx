import { CommonButton, CommonInput, CommonPopup, ForecastContainer, TripsContainer } from '../components';
import { useEffect, useRef, useState } from 'react';
import { useTripStore } from '../store/useTripStore.ts';
import { MainRight } from '../parts';

const getWidthDom = (domEl: HTMLElement): number => {
  const slideWidth = domEl.getBoundingClientRect();
  const fullWidth =
    slideWidth.width +
    parseInt(getComputedStyle(domEl).getPropertyValue('margin-left'), 10) +
    parseInt(getComputedStyle(domEl).getPropertyValue('margin-right'), 10) +
    parseInt(getComputedStyle(domEl).getPropertyValue('padding-left'), 10) +
    parseInt(getComputedStyle(domEl).getPropertyValue('padding-right'), 10);

  return fullWidth;
};

const MainPage = () => {
  const [width, setWidth] = useState<number>(0);
  const [activePopup, setActivePopup] = useState<boolean>(false);
  const { trips, setSearchQuery, searchQuery } = useTripStore();
  useEffect(() => {
    console.log(trips);
  }, [trips]);

  const tripsContainerRef = useRef<HTMLDivElement>(null);

  function closeModal() {
    setActivePopup(false);
  }

  const tripsElems = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tripsElems.current === null) return;
    const setW = () => setWidth(getWidthDom(tripsElems.current!));
    setW();
    window.addEventListener('resize', setW);
    return () => {
      window.removeEventListener('resize', setW);
    };
  }, []);

  const handleScrollTrips = (direction: 'left' | 'right') => {
    if (tripsContainerRef.current !== null) {
      const scrollPX = direction === 'left' ? -width - 15 : width - 15;
      console.log(scrollPX);
      tripsContainerRef.current.scrollBy({
        behavior: 'smooth',
        left: scrollPX,
      });
    }
  };

  return (
    <>
      <main className='main'>
        <section className='forecast'>
          <div className='container'>
            <div className='weather-wrapper'>
              <div className='weather-left'>
                <h1 className='title main__weather-title'>
                  Weather
                  <span>Forecast</span>
                </h1>
                <CommonInput
                  type={'text'}
                  value={searchQuery}
                  label={'Search Your Trip'}
                  setValue={(value: string) => {
                    setSearchQuery(value);
                  }}
                />
                <div className='main-inner'>
                  <div className='items-carousel'>
                    <div
                      ref={tripsContainerRef}
                      className='items-wrapper'
                      style={{
                        gridAutoColumns: `calc(34% - (var(--gap) / ${trips.length + 1}))`,
                      }}
                    >
                      <TripsContainer ref={tripsElems} searchQuery={searchQuery} trips={trips} />
                      <div className='card-add'>
                        <div
                          onClick={() => {
                            setActivePopup(true);
                          }}
                        >
                          <span>+</span>
                          <p>add trip</p>
                        </div>
                      </div>
                    </div>
                    {trips.length >= 1 ? (
                      <div className='sliders-btns'>
                        <CommonButton
                          onClick={() => {
                            handleScrollTrips('left');
                          }}
                          classes={'btn prev'}
                          type='button'
                          text={'Prev'}
                        />
                        <CommonButton
                          onClick={() => {
                            handleScrollTrips('right');
                          }}
                          classes={'btn next'}
                          type='button'
                          text={'Next'}
                        />
                      </div>
                    ) : null}
                  </div>{' '}
                  <ForecastContainer />
                </div>
              </div>
              <MainRight />
            </div>
          </div>
        </section>
      </main>
      <CommonPopup isOpen={activePopup} close={closeModal} />
    </>
  );
};
export { MainPage };
