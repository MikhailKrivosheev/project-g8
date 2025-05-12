import Title from 'Components/UI/Title';
import cn from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import ErrorBoundary from 'Components/ErrorBoundary';
import Description from 'Components/UI/Description';
import TooltipWhite from './TooltipWhite';

interface ITooltip {
  children: React.ReactNode;
  title?: string;
  type?: 'white' | 'black';
}

export default function Tooltip({ children, title, type = 'black' }: ITooltip) {
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);
  const holderClassName = cn('tooltip-holder', {
    [`tooltip--${type}`]: type,
    'tooltip--open': isTooltipOpen,
    'tooltip--large': tooltipRef?.current?.clientWidth >= 500,
  });

  return (
    <ErrorBoundary content={<Description>Что-то пошло не так</Description>}>
      <div className={holderClassName}>
        {type === 'black' && <Title sizeName="s">{title}</Title>}
        <div className="tooltip__wrapper">
          <button
            type="button"
            className="tooltip"
            onClick={() => setTooltipOpen(!isTooltipOpen)}
          >
            {type === 'black' ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="var(--secondary-color)"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4551 9.84001C6.35009 9.94667 6.213 10 6.04381 10C5.87463 10 5.73754 9.94667 5.63253 9.84001C5.52752 9.73336 5.47502 9.60425 5.47502 9.45268C5.47502 9.30112 5.52752 9.172 5.63253 9.06535C5.73754 8.95869 5.87463 8.90536 6.04381 8.90536C6.213 8.90536 6.35009 8.95869 6.4551 9.06535C6.56011 9.172 6.61261 9.30112 6.61261 9.45268C6.61261 9.60425 6.56011 9.73336 6.4551 9.84001ZM5.56252 8.18964V7.81072C5.56252 7.54689 5.60919 7.31954 5.70254 7.12868C5.80171 6.93782 5.91839 6.78906 6.05257 6.68241C6.19258 6.57013 6.32967 6.46628 6.46385 6.37085C6.60386 6.26981 6.72054 6.15193 6.81388 6.0172C6.91305 5.88248 6.96264 5.72249 6.96264 5.53725C6.96264 5.30148 6.87513 5.11062 6.70012 4.96467C6.53094 4.8131 6.29759 4.73732 6.00006 4.73732C5.72587 4.73732 5.50127 4.81871 5.32625 4.98151C5.15124 5.1443 5.0404 5.35761 4.99373 5.62145H4.11865C4.18282 5.105 4.38409 4.70364 4.72245 4.41735C5.06082 4.12544 5.48668 3.97949 6.00006 3.97949C6.55427 3.97949 7.0064 4.11983 7.35643 4.40051C7.70646 4.68118 7.88147 5.0601 7.88147 5.53725C7.88147 5.78424 7.83188 6.00317 7.73271 6.19403C7.63353 6.37928 7.51394 6.53084 7.37393 6.64872C7.23392 6.761 7.09099 6.87046 6.94514 6.97712C6.80513 7.07816 6.68554 7.19885 6.58636 7.33919C6.48719 7.47953 6.4376 7.63671 6.4376 7.81072V8.18964H5.56252Z"
                  fill="#02785E"
                />
                <path
                  d="M11.6 6.7793C11.6 9.87209 9.09279 12.3793 6 12.3793C2.90721 12.3793 0.4 9.87209 0.4 6.7793C0.4 3.6865 2.90721 1.1793 6 1.1793C9.09279 1.1793 11.6 3.6865 11.6 6.7793Z"
                  stroke="#02785E"
                  strokeWidth="0.8"
                />
              </svg>
            )}
          </button>

          {type === 'black' ? (
            <div className="tooltip__content" ref={tooltipRef}>
              {children}
            </div>
          ) : (
            <TooltipWhite state={[isTooltipOpen, setTooltipOpen]}>
              {children}
            </TooltipWhite>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

// export default React.forwardRef(Tooltip);
