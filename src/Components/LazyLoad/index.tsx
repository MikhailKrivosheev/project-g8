import React from 'react';
import {
  LazyLoadImage,
  // LazyLoadImageProps,
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// interface ILazyLoad extends React.FunctionComponent<LazyLoadImageProps> {
//   className?: string;
//   wrapperClassName?: string;
//   src?: string;
//   alt?: string;
// }

export default function LazyLoad({ className, ...rest }: any) {
  return (
    <LazyLoadImage
      effect="blur"
      className={className}
      wrapperClassName={className}
      delayTime={5000}
      {...rest}
    />
  );
}
