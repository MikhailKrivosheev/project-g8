import Title from 'Components/UI/Title';
import PlusIcon from 'Icons/PlusIcon';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NominationInfo from './NominationInfo';
import NominationWorks from './NominationWorks';
import { INomination } from './types';

export default function Nomination({
  name,
  id,
  description,
  submission_materials: submissionMaterials,
  works,
}: INomination) {
  const { hash } = useLocation();
  const nominationRef = useRef();

  console.log(works, 'WORKS');

  useEffect(() => {
    if (`#${id}` === hash && nominationRef.current) {
      nominationRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  return (
    <div className="nomination" ref={nominationRef}>
      <Title sizeName="m" className="nomination__title">
        {name}
        <PlusIcon />
      </Title>
      <NominationWorks works={works} />
      <NominationInfo
        description={description}
        submission_materials={submissionMaterials}
      />
    </div>
  );
}
