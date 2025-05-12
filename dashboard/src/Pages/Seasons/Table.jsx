/* eslint-disable react/jsx-props-no-spreading */
import NumberedPagination from 'Components/NumberedPagination';
import { SeasonsContext } from 'Context/Seasons';
import { useContext } from 'react';
import List from './List';

export default function Table() {
  const [seasons, setSeasons, updatePagination] = useContext(SeasonsContext);

  if (!seasons) return null;

  return (
    <div>
      <List data={seasons.results} />
      <NumberedPagination
        meta={seasons.meta}
        updatePagination={updatePagination}
      />
    </div>
  );
}
