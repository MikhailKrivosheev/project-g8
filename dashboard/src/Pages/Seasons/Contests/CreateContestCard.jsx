import Typography from 'Components/UI/Typography';
import routes from 'Dictionaries/routes';
import { Link } from 'react-router-dom';

export default function CreateContestCard({ seasonId, seasonName }) {
  return (
    <Link
      to={`${routes.contestCreate(seasonId)}?season_name=${seasonName}`}
      className="season__contest-create"
    >
      <div className="season__contest-plus" />
      <Typography type="caption" color="gray">
        Создать категорию
      </Typography>
    </Link>
  );
}
