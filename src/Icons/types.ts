import { SVGAttributes } from 'react';

// todo: fix eslint no-undef for HTMLOrSVGElement generic
// eslint-disable-next-line no-undef
type SVGType = SVGAttributes<HTMLOrSVGElement>;

export type TColors = 'black' | 'white' | 'green';

export interface IArrowIcon extends SVGType {
  color?: TColors;
}

export interface IIcon extends SVGType {
  color?: Exclude<TColors, 'white'>;
}
