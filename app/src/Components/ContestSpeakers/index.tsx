import LazyLoad from 'Components/LazyLoad';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { Link } from 'react-router-dom';
import { ISpeaker } from 'Types';

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

export default function ContestSpeakers(props: IContestSpeakers) {
  const { curators, judges } = props;
  const ROUTES = useRoutes();
  const { profile: profileRoute } = ROUTES;

  if (!curators.length && !judges.length) {
    return null;
  }

  return (
    <div className="contest__speakers">
      <SpeakerLink users={curators} profileRoute={profileRoute} />
      <SpeakerLink users={judges} profileRoute={profileRoute} />
      {judges.length > 1 && (
        <Link
          to={ROUTES.jury()}
          className="contest__speakers-link contest__speakers-link--count"
        >
          + {judges.length - 1}
        </Link>
      )}
    </div>
  );
}
