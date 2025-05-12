import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { Link } from 'react-router-dom';
import { ISpeaker } from 'Types';
import LazyLoad from 'Components/LazyLoad';
import MTSLogo from '../../../../public/Images/mtsLogo.png';

interface IContestSpeakers {
  curators: ISpeaker[];
  judges: ISpeaker[];
}

interface ISpeakerLink {
  users: ISpeaker[];
  profileRoute: (id: string) => string;
}

function SpeakerLink({ users, profileRoute }: ISpeakerLink) {
  if (!users.length) {
    return null;
  }
  const [user] = users;

  return (
    <Link to={profileRoute(String(user.id))} className="contest__speakers-link">
      <LazyLoad src={user?.image_url} alt="" />
    </Link>
  );
}

function CustomSpeakerLink() {
  return (
    <a
      href="https://design.mts.ru/"
      className="contest__speakers-link contest__speakers-link--mts"
    >
      <img src={MTSLogo} alt="" />
    </a>
  );
}

export default function MTSContestSpeakers(props: IContestSpeakers) {
  const { curators, judges } = props;
  const ROUTES = useRoutes();
  const { profile: profileRoute } = ROUTES;

  if (!curators.length && !judges.length) {
    return null;
  }

  return (
    <div className="contest__speakers">
      {judges.length > 1 && (
        <Link
          to={ROUTES.jury()}
          className="contest__speakers-link contest__speakers-link--count"
        >
          + {judges.length - 1}
        </Link>
      )}
      <SpeakerLink users={judges} profileRoute={profileRoute} />
      <SpeakerLink users={curators} profileRoute={profileRoute} />
      <CustomSpeakerLink />
    </div>
  );
}
