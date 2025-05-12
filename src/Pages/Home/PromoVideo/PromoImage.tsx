import React from 'react';
import MobileImage from '../../../../public/Images/promo.png';

export default function PromoImage() {
  return (
    <div className="promo__image-wrapper">
      <img alt="promo" src={MobileImage} className="promo__image" />
    </div>
  );
}
