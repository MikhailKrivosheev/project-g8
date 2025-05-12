import React, { ReactNode } from 'react';
import Ticker from 'react-ticker';
import cn from 'classnames';
import { usePageVisible } from 'Hooks/usePageVisibility';

type CutomTickerType = {
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

type TickerType = {
  direction?: 'toRight' | 'toLeft';
  mode?: 'chain' | 'await' | 'smooth';
  move?: boolean;
  offset?: number | 'run-in' | string;
  speed?: number;
  height?: number | string;
  // eslint-disable-next-line no-unused-vars
  onNext?: (index: any) => void;
  onFinish?: () => void;
};

export default function TickerComponent(props: CutomTickerType & TickerType) {
  const isPageVisible = usePageVisible();
  const { fullWidth, className, children, ...rest } = props;
  const tickerClassName = cn(className, {
    'ticker--full-width': fullWidth,
  });
  return (
    <div className={tickerClassName}>
      <Ticker {...rest} move={isPageVisible}>
        {() => <>{children}&nbsp;</>}
      </Ticker>
    </div>
  );
}
