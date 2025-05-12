import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Utilities from 'Utilities';

export default function useTableFilter() {
  const { search } = useLocation();
  const firstMount = useRef(true);

  const params = useMemo(() => {
    return Utilities.params.toObject(search);
  }, [search]);

  const neededParams = useMemo(() => {
    const { season_name, contest_name, nomination_name, ...otherParams } =
      params;
    return otherParams;
  }, [params]);

  const [state, setState] = useState(neededParams);

  useEffect(() => {
    const oldParams = JSON.stringify(state);
    const newParams = JSON.stringify(neededParams);

    if (oldParams !== newParams) {
      setState(neededParams);
    }
  }, [neededParams]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return state;
}
