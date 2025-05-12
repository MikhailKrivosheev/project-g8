import cn from 'classnames';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import 'swiper/swiper.min.css';

SwiperCore.use([Pagination]);

interface ISlider {
  elements: object[];
  slide: React.ElementType;
  slideProps?: object;
  className?: string;
  fullWidthSlide?: boolean;
  pagination?: boolean;
  initialSlide?: number;
  overflow?: 'visible';
  slides?: number;
  spaceBetween?: number;
}

export default function Slider({
  elements,
  slide: SlideComponent,
  slideProps = {},
  className,
  initialSlide = 0,
  slides,
  fullWidthSlide,
  pagination,
  overflow,
  spaceBetween = 30,
}: ISlider) {
  const sliderClassNames = cn('slider', className, {
    'slider--full-width-slide': fullWidthSlide,
    'slider--pagination': pagination,
    [`slider--overflow--${overflow}`]: overflow,
  });
  return (
    <Swiper
      pagination={
        pagination ? { clickable: true, bulletElement: 'button' } : pagination
      }
      className={sliderClassNames}
      initialSlide={initialSlide}
      slidesPerView={slides || 'auto'}
      spaceBetween={spaceBetween}
    >
      {elements.map((element, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <SlideComponent
              isActive={isActive}
              index={index}
              slide
              data={element}
              {...slideProps}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
