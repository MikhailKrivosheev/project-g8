import { DevTool } from '@hookform/devtools';
import classNames from 'classnames';
import ErrorBoundary from 'Components/ErrorBoundary';
import Section from 'Components/UI/Section';
import useGetParams from 'Hooks/useGetParams';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import conferenceFilterAtom from 'Recoil/Atoms/ConferenceFilter';
import Utilities from 'Utilities';
import setDefaultValues from './helper';
import Info from './Info';
import RoomsRadio from './RoomsRadio';
import Tags from './Tags';

export default function ConferenceFilter() {
  const filterParameters = useRecoilValue(conferenceFilterAtom);
  const filter = useGetParams();
  const [isClose, setIsClose] = useState(false);
  const accordionRef = useRef<React.Ref<HTMLDivElement>>();

  const accordionClassNames = classNames('conference-accordion', {
    'conference-accordion--hidden': isClose,
  });

  const hideButtonClassNames = classNames('conference-hide-button', {
    'conference-hide-button--open': !isClose,
  });

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(filter),
  });

  const ROUTES = useRoutes();
  const navigate = useNavigate();
  const firstMount = useRef(true);

  useEffect(() => {
    if (!firstMount.current) {
      navigate(
        `${ROUTES.conference()}${Utilities.params.toString(filterParameters)}`,
        {
          replace: true,
        }
      );
    }
  }, [filterParameters]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <Section className="conference">
      <FormProvider {...methods}>
        <Info isClose={isClose} />
        <div
          ref={accordionRef as React.Ref<HTMLDivElement>}
          className={accordionClassNames}
        >
          <form className="form conference-form">
            <ErrorBoundary>
              <Tags />
            </ErrorBoundary>
            <ErrorBoundary>
              <RoomsRadio />
            </ErrorBoundary>
            <DevTool control={methods.control} />
          </form>
        </div>
        <button
          className={hideButtonClassNames}
          type="button"
          onClick={() => setIsClose(!isClose)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m6 13 6-6 6 6"
              stroke="#201F1E"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </FormProvider>
    </Section>
  );
}
