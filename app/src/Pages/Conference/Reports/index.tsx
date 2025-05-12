import Api from 'Api';
import routes from 'Api/routes';
import ErrorBoundary from 'Components/ErrorBoundary';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import useGetParams from 'Hooks/useGetParams';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import conferenceFilterAtom from 'Recoil/Atoms/ConferenceFilter';
import seasonAtom from 'Recoil/Atoms/Season';
import Report from './Report';

export default function Reports() {
  const [reports, setReports] = useState<object | null>(null);
  const filter = useGetParams();
  const season = useRecoilValue(seasonAtom);
  const conferenceContainerRef = useRef<HTMLDivElement | null>(null);
  const setFilterParams = useSetRecoilState(conferenceFilterAtom);

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    setFilterParams(filter);
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await Api.get(routes.api.report(), {
          season_id: season?.id,
          ...filter,
          count: 0,
        });
        setReports(response?.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchReports();
  }, [filter]);

  if (!reports) {
    return null;
  }

  return (
    <div ref={conferenceContainerRef}>
      {Object.keys(reports).map((reportSectionDate) => (
        <Section key={reportSectionDate} className="conference-report">
          <span className="conference-report__day">{reportSectionDate}</span>
          <ErrorBoundary>
            {reports[reportSectionDate].map((report) => (
              <Report key={report?.id} report={report} />
            ))}
          </ErrorBoundary>
        </Section>
      ))}
    </div>
  );
}
