import Typography from 'Components/UI/Typography';
import routes from 'Dictionaries/routes';
import { Link } from 'react-router-dom';

export default function Nomination({ name, isPublished, id, season, contest }) {
  return (
    <Link
      to={`${routes.nominationPage(season.id, contest.id, id)}?season_name=${
        season.name
      }&contest_name=${contest.name}&nomination_name=${name}`}
      className="nomination-list__item"
    >
      <div className="nomination-list__item-name">
        <Typography type="body">{name}</Typography>
      </div>
      {isPublished && (
        <div className="nomination-list__item-status">
          <Typography type="caption" color="white">
            опубликовано
          </Typography>
        </div>
      )}
    </Link>
  );
}
