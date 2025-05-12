import NumberedPagination from 'Components/NumberedPagination';
import { NominationsContext } from 'Context/Nominations';
import { useContext } from 'react';
import List from './List';

export default function Table() {
  const [nominations, setNominations, updatePagination] =
    useContext(NominationsContext);

  return (
    <div className="nominations-list">
      <List data={nominations.results} />
      <NumberedPagination
        meta={nominations.meta}
        updatePagination={updatePagination}
        className="nominations-list__pagination"
      />
    </div>
  );
}
