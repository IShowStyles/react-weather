import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Trip, useTripStore } from '../../../store/useTripStore.ts';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside.tsx';
import { CommonSelect } from '../CommonSelect';
import { DatesSelect } from '../DatesSelect';
import { CommonButton } from '../CommonButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IFormData {
  city: string;
  endDate: string;
  startDate: string;
}

const CommonPopup = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<{ city: string; startDate: string; endDate: string }>({
    city: '',
    startDate: '',
    endDate: '',
  });

  const refPopup = useOnClickOutside<HTMLDialogElement>(close);
  const { trips, addTrip } = useTripStore();

  const schema = z.object({
    city: z.string().min(1, { message: 'City is required.' }),
    startDate: z.string().min(1, { message: 'Please choose correct start trip date' }),
    endDate: z.string().min(1, { message: 'Please choose correct end trip date' }),
  });

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data: IFormData) => {
    const startDateObj = new Date(form.startDate);
    const endDateObj = new Date(form.endDate);

    if (form.endDate && (!form.startDate || endDateObj <= startDateObj)) {
      setError('endDate', {
        type: 'custom',
        message: 'Please select a valid end date that is after the start date.',
      });
      return false;
    }

    console.log(trips);

    const isExistTrip = trips.filter(({ city, startDate, endDate }: Trip) => {
      return data.city === city && startDate === data.startDate && endDate === data.endDate;
    });
    console.log(isExistTrip);
    if (isExistTrip.length) {
      console.log(12121212);
      setError('endDate', { type: 'custom', message: 'A trip with the same dates and city already exists.' });
      return false;
    }
    addTrip({
      city: data.city.toLowerCase(),
      startDate: data.startDate,
      endDate: data.endDate,
    });
    closePopup();
  };

  const cityNames: string[] = [
    'London',
    'Paris',
    'New-York',
    'Tokyo',
    'Kiev',
    'Sydney',
    'Berlin',
    'Rome',
    'Los-Angeles',
  ];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
  };

  const closePopup = () => {
    reset();
    close();
    clearErrors();
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: selectedCity,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [close]);

  return (
    <>
      {isOpen && (
        <div className='overlay'>
          <dialog ref={refPopup} open={isOpen} className='dialog-wrapper'>
            <form
              ref={formRef}
              className='dialog'
              id={'modal-form'}
              onSubmit={handleSubmit(onSubmit)}
              method='dialog'
            >
              <div className='modal-header__wrapper'>
                <div className='modal-header'>
                  <h3>Create trip</h3>
                  <span className='close' onClick={close}>
                    X
                  </span>
                </div>
              </div>
              <div className='modal-body'>
                <CommonSelect
                  register={register}
                  label={'City'}
                  name={'city'}
                  options={cityNames}
                  onChange={handleSelectChange}
                  errorMsg={errors.city?.message!}
                />
                <DatesSelect
                  register={register}
                  label={'Start Date'}
                  name={'startDate'}
                  datesFn={generateDates}
                  onChange={handleSelectChange}
                  errorMsg={errors.startDate?.message!}
                />{' '}
                <DatesSelect
                  register={register}
                  label={'End Date'}
                  name={'endDate'}
                  datesFn={generateDates}
                  onChange={handleSelectChange}
                  errorMsg={errors.endDate?.message!}
                />
              </div>
              <div className='modal-footer__wrapper'>
                <div className='modal-footer'>
                  <CommonButton
                    text={'Cancel'}
                    onClick={() => {
                      setForm({
                        city: '',
                        startDate: '',
                        endDate: '',
                      });
                      closePopup();
                    }}
                    type={'reset'}
                    classes={'cancel'}
                  />
                  <CommonButton text={'Submit'} type={'submit'} classes={'submit'} />
                </div>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};

export { CommonPopup };
