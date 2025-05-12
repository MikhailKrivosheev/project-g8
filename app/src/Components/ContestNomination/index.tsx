import React from 'react';
import { Link } from 'react-router-dom';
import { INomination } from 'Types';

interface IData {
  link?: any;
  data: INomination;
}

export default function ContestNomination({ data, link }: IData) {
  if (link)
    return (
      <Link to={link} className="contest__nomination">
        {data?.name}
      </Link>
    );

  return <div className="contest__nomination">{data?.name}</div>;
}
