import { useCallback, useEffect, useState, useRef } from 'react';

interface IObserver {
  // eslint-disable-next-line no-undef
  callback: IntersectionObserverCallback;
  triggerOnce?: boolean;
  options?: object;
  onMount?: boolean;
}

export default function useObserver(props: IObserver) {
  const { callback, triggerOnce = false, options, onMount } = props;
  const observer = useRef<IntersectionObserver | null>(null);
  const [observable, setObservable] = useState<Element | Element[] | null>(
    null
  );

  const onIntersection = (
    entries: IntersectionObserverEntry[],
    watcher: IntersectionObserver
  ) => {
    if (triggerOnce) {
      const intersected = entries.filter(
        ({ isIntersecting }) => isIntersecting
      );
      intersected.forEach(({ target }) => {
        watcher.unobserve(target);
      });
      setObservable(null);
    }
    callback(entries, watcher);
  };

  const destroyObservable = useCallback(() => {
    if (observable) {
      if (Array.isArray(observable)) {
        observable.forEach((node) => {
          observer.current!.unobserve(node);
        });
      } else observer.current!.unobserve(observable);
    }
  }, [observable]);

  const resetObserver = useCallback((newObservable: Element | Element[]) => {
    destroyObservable();
    setObservable(newObservable);
  }, []);

  const initIntersectionMount = (onMountOptions: object) => {
    observer.current = new IntersectionObserver(onIntersection, {
      ...options,
      ...onMountOptions,
    });
  };

  useEffect(() => {
    if (observable && observer) {
      if (Array.isArray(observable)) {
        observable.forEach((item) => {
          observer.current!.observe(item);
        });
      } else observer.current!.observe(observable);
    }
  }, [observable]);

  useEffect(() => {
    if (!onMount) {
      observer.current = new IntersectionObserver(onIntersection, options);
    }
    return () => {
      destroyObservable();
      observer.current!.disconnect();
      observer.current = null;
    };
  }, []);

  return {
    setObservable,
    destroyObservable,
    resetObserver,
    initIntersectionMount,
  };
}
