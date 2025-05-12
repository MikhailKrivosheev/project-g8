import { ISponsor } from 'Types/index';

export interface IGroup {
  block_type: string;
  title: string;
  sponsors: ISponsor[];
  id: number;
  sponsors_published: ISponsor[];
}
