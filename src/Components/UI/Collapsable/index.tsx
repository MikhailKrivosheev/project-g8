import React, {
  HTMLProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import ArrowIcon from 'Icons/ArrowIcon';
import cn from 'classnames';
import Utilities from 'Utilities';

export interface CollapsableProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactElement;
  open?: boolean;
}

export default function Collapsable(props: CollapsableProps) {
  const { children, open = false } = props;
  const [isOpen, setOpen] = useState<boolean>(open);
  const firstMount = useRef<boolean>(true);

  const buttonClasses = cn('collapsable__button', {
    'collapsable__button--active': isOpen,
  });

  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const getChildrenHeight = () => {
    return [...wrapperRef.current.children].reduce(
      (acc, node) => acc + node.clientHeight,
      0
    );
  };

  const showChildrenInstantly = () => {
    const height = getChildrenHeight();
    wrapperRef.current.style.height = `${height}px`;
  };

  const hideChildrenInstantly = () => {
    wrapperRef.current.style.height = '0px';
  };

  const showChildren = async () => {
    const height = getChildrenHeight();
    await Utilities.animation.go(500, (fraction) => {
      wrapperRef.current.style.height = `${height * fraction}px`;
    });
  };

  const hideChildren = async () => {
    const height = getChildrenHeight();
    await Utilities.animation.go(500, (fraction) => {
      wrapperRef.current.style.height = `${height * (1 - fraction)}px`;
    });
  };

  useLayoutEffect(() => {
    if (!isOpen) {
      hideChildrenInstantly();
    } else {
      showChildrenInstantly();
    }
  }, []);

  useEffect(() => {
    if (!firstMount.current) {
      if (isOpen) {
        showChildren();
      } else {
        hideChildren();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="collapsable">
      <div
        ref={wrapperRef as React.Ref<HTMLDivElement>}
        className="collapsable__wrapper"
      >
        {children}
      </div>
      <button className={buttonClasses} type="button" onClick={handleClick}>
        <ArrowIcon />
      </button>
    </div>
  );
}
