import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { type Trip, useTripStore } from '../../../store/useTripStore.ts';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside.tsx';
import { CommonSelect } from '../CommonSelect';
import { DatesSelect } from '../DatesSelect';
import { CommonButton } from '../CommonButton';

const CommonPopup = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<{ city: string; startDate: string; endDate: string }>({
    city: '',
    startDate: '',
    endDate: '',
  });

  const refPopup = useOnClickOutside<HTMLDialogElement>(close);
  const [validationMessage, setValidationMessage] = useState({
    city: '',
    startDate: '',
    endDate: '',
  });
  const { trips, addTrip } = useTripStore();

  const validateForm = () => {
    let isValid = true;
    const newValidationMessage = { city: '', startDate: '', endDate: '' };

    if (!form.city) {
      newValidationMessage.city = 'Please select a city.';
      isValid = false;
    }

    if (!form.startDate) {
      newValidationMessage.startDate = 'Please select a start date.';
      isValid = false;
    }
    const startDateObj = new Date(form.startDate);
    const endDateObj = new Date(form.endDate);

    if (form.endDate && (!form.startDate || endDateObj <= startDateObj)) {
      newValidationMessage.endDate = 'Please select a valid end date that is after the start date.';
      isValid = false;
    }

    // check if trip exist with same date
    const isExistTrip = trips.filter(({ city, startDate, endDate }: Trip) => {
      console.log(form, 'form');
      console.log({ city, startDate, endDate }, 'filter');
      return form.city === city && startDate === form.startDate && endDate === form.endDate;
    });
    // handle same trip
    if (isExistTrip.length) {
      setValidationMessage({
        ...validationMessage,
        city: 'Trip with date already exist!',
      });
      return false;
    }
    setValidationMessage(newValidationMessage);
    return isValid;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      alert('added city ' + form.city);
      console.log('Form is valid, submitting...');
      formRef?.current?.reset();
      setValidationMessage({ city: '', startDate: '', endDate: '' });
      console.log(form, 'form');
      addTrip({
        ...form,
        city: form.city.toLowerCase(),
      });
      close();
    } else {
      console.log('Form is invalid, please correct the errors.');
      alert('Smth went wrong!');
    }
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

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: selectedCity,
    }));
  };

  return (
    <>
      {isOpen && (
        <div className='overlay'>
          <dialog ref={refPopup} open={isOpen} className='dialog-wrapper'>
            <form ref={formRef} className='dialog' id={'modal-form'} onSubmit={handleSubmit} method='dialog'>
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
                  name={'city'}
                  options={cityNames}
                  onChange={handleSelectChange}
                  errorMsg={validationMessage.city}
                />
                <DatesSelect
                  name={'startDate'}
                  datesFn={generateDates}
                  onChange={handleSelectChange}
                  errorMsg={validationMessage.startDate}
                />{' '}
                <DatesSelect
                  name={'endDate'}
                  datesFn={generateDates}
                  onChange={handleSelectChange}
                  errorMsg={validationMessage.endDate}
                />
              </div>
              <div className='modal-footer__wrapper'>
                <div className='modal-footer'>
                  <CommonButton
                    text={'Cancel'}
                    onClick={() => {
                      setValidationMessage({
                        city: '',
                        endDate: '',
                        startDate: '',
                      });
                      setForm({
                        city: '',
                        startDate: '',
                        endDate: '',
                      });
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
