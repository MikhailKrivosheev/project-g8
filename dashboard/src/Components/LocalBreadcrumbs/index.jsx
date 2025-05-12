import Typography from 'Components/UI/Typography';
import BackArrow from 'Icons/BackArrow';
import Pencil from 'Icons/Pencil';
import { Link } from 'react-router-dom';

export default function LocalBreadcrumbs({
  path,
  backLinkRoute,
  editLink,
  title,
}) {
  return (
    <div className="breadcrumbs">
      {backLinkRoute && (
        <Link to={backLinkRoute} className="breadcrumbs__back-link">
          <BackArrow />
        </Link>
      )}

      <div className="breadcrumbs__path-holder">
        {path?.length > 0 && (
          <Typography type="body" className="breadcrumbs__path">
            {path
              .filter(Boolean)
              .filter((item) => item !== title)
              .join(' • ')}
          </Typography>
        )}
        <Typography tag="h1" className="breadcrumbs__title">
          {title}
        </Typography>
        {editLink && (
          <Link to={editLink} className="breadcrumbs__edit-icon">
            <Pencil />
          </Link>
        )}
      </div>
    </div>
  );
}
