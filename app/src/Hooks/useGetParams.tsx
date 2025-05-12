import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import utilities from '../Utilities';

export default function useGetParams() {
  const { search } = useLocation();
  const firstMount = useRef(true);

  const params = useMemo(() => {
    return utilities.params.toObject(search);
  }, [search]);

  const [state, setState] = useState<any>(params);

  useEffect(() => {
    if (!firstMount.current) {
      setState(params);
    }
  }, [params]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return state;
}
